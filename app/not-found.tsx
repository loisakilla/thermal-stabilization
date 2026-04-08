import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-start justify-center gap-4 px-4 sm:px-6">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="text-4xl">Страница не найдена</h1>
      <p className="text-muted-foreground">
        Проверьте адрес или вернитесь на главную страницу проекта.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        На главную
      </Link>
    </main>
  );
}
