import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  Building2Icon,
  FileTextIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { LandingAnimations } from "@/components/landing/landing-animations";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { complianceBlock, projectContent } from "@/content/project-content";

const navItems = [
  { label: "О продукте", href: "#about" },
  { label: "Прототип", href: "#prototype" },
  { label: "Модификации", href: "#modifications" },
  { label: "Применение", href: "#applications" },
  { label: "Характеристики", href: "#specs" },
  { label: "Контакты", href: "#contacts" },
  { label: "Поддержка", href: "#support" },
];

const aboutTitles = ["Тема проекта", "Описание продукта", "Назначение"];

const contactIcons = {
  Организация: Building2Icon,
  Реквизиты: FileTextIcon,
  Адрес: MapPinIcon,
} as const;

export default function Home() {
  return (
    <div className="relative">
      <LandingAnimations />

      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-sm">
        <div className="layout-grid mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-semibold">Термостабилизация</span>
          </div>
          <nav aria-label="Навигация по странице" className="w-full overflow-x-auto lg:w-auto">
            <ul className="flex min-w-max items-center gap-4 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="hover:text-foreground" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-16 pt-10 sm:gap-18 sm:px-6 sm:pt-14 lg:px-8">
        <section id="hero" className="flex flex-col gap-5">
          <h1
            data-hero-animate
            className="max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            {projectContent.hero.title}
          </h1>
          <p
            data-hero-animate
            className="max-w-3xl text-base text-muted-foreground sm:text-lg"
          >
            {projectContent.hero.lead}
          </p>
          <div data-hero-animate className="flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href={projectContent.hero.primaryCtaHref} />}
            >
              {projectContent.hero.primaryCtaLabel}
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href={projectContent.hero.secondaryCtaHref} />}
            >
              {projectContent.hero.secondaryCtaLabel}
            </Button>
          </div>
        </section>

        <Separator />

        <section id="about" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">{projectContent.about.title}</h2>
          <div data-animate-stagger className="grid gap-4 md:grid-cols-2">
            {projectContent.about.paragraphs.map((paragraph, index) => (
              <Card key={`${index}-${paragraph}`} data-animate-item>
                <CardHeader>
                  <CardTitle>{aboutTitles[index] ?? "Описание"}</CardTitle>
                  <CardDescription className="text-base leading-7">{paragraph}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="prototype" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">Фото прототипа</h2>
          <Card className="overflow-hidden">
            <div data-animate-stagger className="space-y-0">
              <div
                data-animate-item
                className="relative mx-auto aspect-[16/9] w-[85%] overflow-hidden rounded-xl border bg-muted/20"
              >
                <Image
                  src="/media/product-prototype.png"
                  alt="Прототип прецизионной системы термостабилизации с блоком управления и узлом охлаждения"
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 1020px"
                  className="object-cover"
                  data-product-image
                />
              </div>
              <CardContent data-animate-item className="mx-auto w-[85%] pt-5">
                <p className="text-base leading-7 text-muted-foreground">
                  Лабораторный образец включает универсальный блок управления, источник питания и
                  модуль охлаждения на элементах Пельтье.
                </p>
              </CardContent>
            </div>
          </Card>
        </section>

        <section id="modifications" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">Модификации системы</h2>
          <div data-animate-stagger className="grid gap-4 md:grid-cols-2">
            {projectContent.modifications.map((item) => (
              <Card key={item.title} data-animate-item>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="applications" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">Области применения</h2>
          <div data-animate-stagger className="grid gap-4 md:grid-cols-3">
            {projectContent.applications.map((item) => (
              <Card key={item.title} data-animate-item>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="specs" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">Технические характеристики</h2>
          <div data-animate-stagger className="grid gap-4 md:grid-cols-2">
            {projectContent.specs.map((spec, index) => (
              <article
                key={spec.label}
                data-animate-item
                className={`rounded-2xl border p-5 shadow-sm transition-all ${
                  index === 0
                    ? "md:col-span-2 border-primary/35 bg-[linear-gradient(140deg,oklch(0.99_0.015_96),oklch(0.95_0.03_86))]"
                    : "border-border bg-card/90"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {spec.label}
                  </h3>
                  <span className="rounded-full border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-lg leading-snug font-semibold">{spec.value}</p>
                {spec.note ? (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{spec.note}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="contacts" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">Контакты</h2>
          <Card data-animate-item>
            <CardHeader>
              <CardTitle>Реквизиты и данные организации</CardTitle>
              <CardDescription>
                Данные юридического лица и адрес указаны по материалам отчета о выполнении работ.
              </CardDescription>
            </CardHeader>
            <CardContent data-animate-stagger className="grid gap-3 md:grid-cols-3">
              {projectContent.contacts.map((contact) => {
                const ContactIcon =
                  contactIcons[contact.label as keyof typeof contactIcons] ?? Building2Icon;

                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="rounded-xl border bg-background p-4 transition-colors hover:bg-muted"
                    data-animate-item
                  >
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ContactIcon className="size-4" />
                      {contact.label}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{contact.value}</p>
                  </a>
                );
              })}
            </CardContent>
          </Card>

        </section>

        <section id="support" data-testid="support-block" data-animate-section className="flex flex-col gap-5">
          <h2 className="text-3xl">{complianceBlock.title}</h2>

          <Alert data-animate-item>
            <ShieldCheckIcon />
            <AlertTitle>{complianceBlock.mandatoryText}</AlertTitle>
          </Alert>

          <div data-animate-stagger className="grid gap-4 md:grid-cols-2">
            {complianceBlock.logos.map((logo) => (
              <Card key={logo.id} data-animate-item>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex h-52 justify-center rounded-lg border bg-white p-5">
                    <Image
                      src={logo.localPath}
                      alt={logo.title}
                      width={340}
                      height={180}
                      className="size-full object-contain"
                      loading="eager"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Проект термостабилизации</span>
            <span>Автор: Катаев Георгий · Год создания: 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link href="/consent" className="hover:text-foreground">
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
