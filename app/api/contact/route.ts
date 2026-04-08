import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RateBucket = {
  count: number;
  resetAt: number;
};

const globalCache = globalThis as typeof globalThis & {
  __contactEmailRateLimit?: Map<string, RateBucket>;
};

const rateBuckets = globalCache.__contactEmailRateLimit ?? new Map<string, RateBucket>();
globalCache.__contactEmailRateLimit = rateBuckets;

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const clientIp = forwardedFor.split(",")[0]?.trim();
    if (clientIp) {
      return clientIp;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function isAllowedOrigin(request: NextRequest) {
  const hostHeader = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const originHeader = request.headers.get("origin");

  if (!hostHeader || !originHeader) {
    return false;
  }

  const currentHost = hostHeader.split(",")[0]?.trim().toLowerCase();
  if (!currentHost) {
    return false;
  }

  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return false;
  }

  if (origin.host.toLowerCase() === currentHost) {
    return true;
  }

  const allowedOrigins = (process.env.CONTACT_FORM_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return allowedOrigins.includes(origin.origin.toLowerCase());
}

function isRateLimited(ip: string, now = Date.now()) {
  for (const [bucketKey, bucketValue] of rateBuckets.entries()) {
    if (bucketValue.resetAt <= now) {
      rateBuckets.delete(bucketKey);
    }
  }

  const bucket = rateBuckets.get(ip);
  if (!bucket) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  bucket.count += 1;
  return false;
}

function isValidEmail(value: string) {
  if (value.length < 3 || value.length > 254) {
    return false;
  }

  return EMAIL_REGEX.test(value);
}

async function persistLead(email: string) {
  const webhookUrl = process.env.CONTACT_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.info("[contact-form] New email lead:", email);
    return true;
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 3000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "landing-contact-form",
        receivedAt: new Date().toISOString(),
      }),
      signal: abortController.signal,
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "unsupported_media_type" }, { status: 415 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "too_many_requests" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(WINDOW_MS / 1000)) },
      }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const { email, website } = (payload ?? {}) as { email?: unknown; website?: unknown };
  const honeypot = typeof website === "string" ? website.trim() : "";
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!isValidEmail(normalizedEmail)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const saved = await persistLead(normalizedEmail);
  if (!saved) {
    return NextResponse.json({ ok: false, error: "temporary_unavailable" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
