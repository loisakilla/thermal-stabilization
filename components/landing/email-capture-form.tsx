"use client";

import { type FormEvent, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";

const EMAIL_FIELD = "email";
const HONEYPOT_FIELD = "website";

export function EmailCaptureForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const inputId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get(EMAIL_FIELD) ?? "").trim().toLowerCase();
    const website = String(formData.get(HONEYPOT_FIELD) ?? "").trim();

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, website }),
      });

      if (response.ok) {
        setStatus("success");
        setFeedback("Email получен. Свяжемся с вами после проверки заявки.");
        form.reset();
        return;
      }

      if (response.status === 429) {
        setStatus("error");
        setFeedback("Слишком много попыток. Повторите отправку позже.");
        return;
      }

      if (response.status === 400) {
        setStatus("error");
        setFeedback("Проверьте формат email и попробуйте снова.");
        return;
      }

      setStatus("error");
      setFeedback("Не удалось отправить форму. Повторите позже.");
    } catch {
      setStatus("error");
      setFeedback("Ошибка сети. Попробуйте снова через несколько минут.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative space-y-4", className)}
      data-animate-item
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="space-y-2">
          <label htmlFor={inputId} className="text-sm font-medium">
            Email для обратной связи
          </label>
          <input
            id={inputId}
            name={EMAIL_FIELD}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="name@example.com"
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-base outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 sm:mt-0">
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </div>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${inputId}-website`}>Ваш сайт</label>
        <input
          id={`${inputId}-website`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Мы используем email только для обратной связи по проекту.
      </p>

      {feedback ? (
        <p
          role="status"
          className={cn(
            "text-sm font-medium",
            status === "success" ? "text-emerald-700" : "text-destructive"
          )}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
