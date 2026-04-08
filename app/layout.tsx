import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const bodyFont = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thermostab.vercel.app"),
  title: {
    default: "Создание прецизионной системы термостабилизации на основе элементов Пельтье",
    template: "%s | Прецизионная система термостабилизации",
  },
  description:
    "Проект по созданию прецизионной системы термостабилизации на основе элементов Пельтье: ключевые характеристики, состав системы и обязательный контент поддержки.",
  openGraph: {
    title: "Создание прецизионной системы термостабилизации на основе элементов Пельтье",
    description:
      "Официальная страница проекта с обязательным текстом поддержки, логотипами Фонда и ПУТП, а также техническими характеристиками продукта.",
    type: "website",
    locale: "ru_RU",
    url: "https://thermostab.vercel.app",
    siteName: "Проект термостабилизации",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={bodyFont.variable}>
      <body className="min-h-dvh font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
