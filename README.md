# thermal-stabilization

Одностраничный сайт проекта:
**«Создание прецизионной системы термостабилизации на основе элементов Пельтье»**.

Сайт содержит:
- описание продукта и областей применения;
- модификации системы;
- технические характеристики;
- обязательный текст поддержки и логотипы;
- форму обратной связи по email.

## Технологии

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (base-ui)
- GSAP

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: [http://localhost:3000](http://localhost:3000)

## Проверки

```bash
npm run lint
npm test
npm run build
```

## Обратная связь

Форма отправляет email на `POST /api/contact`.

Для разрешённых доменов можно задать:

```bash
CONTACT_FORM_ALLOWED_ORIGINS=https://your-domain.vercel.app,http://localhost:3000
```

При необходимости интеграции с внешней системой используйте:

```bash
CONTACT_LEAD_WEBHOOK_URL=https://example.com/webhook
```

## Автор

Катаев Георгий  
Год создания: 2026
