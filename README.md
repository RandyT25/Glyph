This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Clickable prototype (`/prototype`)

A fake-data prototype of the Glyph stamp card for small shops in Indonesia (Bahasa Indonesia UI, mobile-first).
No backend: all data lives in `localStorage` (key `glyph-proto-v1`; "Reset data demo" on the prototype home restores it).

- `/prototype` menu · `/prototype/kasir` cashier · `/prototype/wa` WhatsApp preview
- `/prototype/desain` card designer (templates, logo, cover photo, stamp icon/own stamp image, colour) · `/prototype/kartu?c=8x2f` customer card (query param, because the site is a static export) · `/prototype/dashboard` owner dashboard

Code: `app/prototype/*`, `components/proto/*`, `lib/proto/*`.

Brand assets live in `public/brand` (small web copies; originals in `public/brand/source`).

## Bahasa landing page (`/id`)

Owner-facing website in Bahasa Indonesia (NFC card + WhatsApp stamps). Lives in `app/(id)/id/page.tsx`; the English marketing site at `/` is untouched.
Screenshots are in `public/site` (WebP, captured from the prototype). New prototype screens: `/prototype/nfc` (NFC cards), dashboard "Riwayat" tab, cashier modes (Nomor / Cari nama / Tap NFC).
