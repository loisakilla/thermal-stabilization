import Link from "next/link";

export const metadata = {
  title: "Согласие на обработку данных",
};

export default function ConsentPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 sm:px-6">
      <h1 className="text-4xl">Согласие на обработку данных</h1>
      <p className="text-muted-foreground">
        Используя контактные каналы, указанные на сайте, пользователь выражает
        согласие на обработку предоставленных данных в объеме, необходимом для
        обработки запроса и последующей коммуникации.
      </p>
      <p className="text-muted-foreground">
        Согласие может быть отозвано письменным обращением на адрес проектной
        команды. На текущем этапе автоматизированный сбор через веб-формы не используется.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Вернуться на главную
      </Link>
    </main>
  );
}
