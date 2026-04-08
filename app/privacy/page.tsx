import Link from "next/link";

export const metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 sm:px-6">
      <h1 className="text-4xl">Политика конфиденциальности</h1>
      <p className="text-muted-foreground">
        На текущем этапе сайт не содержит форм сбора персональных данных и не подключает
        внешнюю аналитику. Любые контактные взаимодействия происходят по указанным
        каналам связи вне сайта.
      </p>
      <p className="text-muted-foreground">
        При изменении модели обработки данных страница будет обновлена с указанием
        целей, сроков хранения и ответственного лица.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Вернуться на главную
      </Link>
    </main>
  );
}
