# БезОсколков

Лендинг защитной противоосколочной плёнки для окон (Москва и МО).

## Стек

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

Конфиг использует `output: "standalone"` для деплоя на [ONREZA](https://onreza.ru/frameworks/nextjs.html).

## Деплой на ONREZA

1. Залейте репозиторий на GitHub.
2. В [ONREZA](https://onreza.ru) подключите GitHub и выберите этот репозиторий.
3. Платформа найдёт `next.config`, выполнит `npm run build` и поднимет standalone-сервер.

Production-ветка: `main`.
