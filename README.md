# Photographer portfolio

A single-page portfolio for a photographer, built on the Next.js + shadcn/ui
template (`--preset b5rR41Mtnc`, `--template next`, `--pointer`).

Sections, in order: hero and introduction, selected work, pricing, contact.

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm typecheck
pnpm lint
```

Fonts are loaded through `next/font/google`: Cormorant Garamond for display
type, Inter for text, Geist Mono for the small labels and photo captions.

## Replace before launch

Everything below is placeholder content. The photos are the important part.

### 1. Photographs

All images come from `picsum.photos` seeded URLs — real photographs, but
random ones. Replace every one of them with your own work.

Put your files in `public/photos/` and point the entries in `lib/content.ts`
at them, e.g. `src: "/photos/still-water.jpg"`.

| Slot              | Where                         | Placeholder subject           | Suggested replacement                            |
| ----------------- | ----------------------------- | ----------------------------- | ------------------------------------------------ |
| Hero              | `lib/content.ts` → `hero.src` | Wide shoreline at first light | Your strongest wide frame, 2400 × 1350 or larger |
| 01 Still Water    | `photos[0]`                   | Lake at dusk                  | Landscape, Lofoten                               |
| 02 Mira           | `photos[1]`                   | Woman in window light         | Portrait                                         |
| 03 The Long Field | `photos[2]`                   | Dry field, low sky            | Landscape, Jutland                               |
| 04 Kitchen Table  | `photos[3]`                   | Hands on a table              | Documentary still life                           |
| 05 Northbound     | `photos[4]`                   | Ferry on grey water           | Travel / landscape                               |
| 06 Hands          | `photos[5]`                   | Two pairs of hands            | Portrait detail                                  |
| 07 Rain on Glass  | `photos[6]`                   | Rain on a window              | Travel, Kyoto                                    |
| 08 Sisters        | `photos[7]`                   | Two sisters at a wall         | Portrait                                         |
| 09 Last Light     | `photos[8]`                   | Ridge at last light           | Landscape, Dolomites                             |

The gallery is a uniform 4:5 crop, so the images are all rendered in portrait
orientation. `alt` text on each entry describes the intended picture rather
than the placeholder, so update those too if the subject changes.

Once every photo is local, `images.remotePatterns` in `next.config.ts` can be
deleted.

### 2. Identity and copy

- `lib/content.ts` → `site.name`, `site.email`, `site.location`,
  `site.availability`, `site.instagram`, `site.disciplines`. The email is also
  the main contact link at the bottom of the page.
- The introduction prose lives in `app/page.tsx`, in the `#introduction`
  section. It is written in the first person — rewrite it in your own voice.
- `app/layout.tsx` → `metadata` (page title, description, Open Graph).

### 3. Pricing

`lib/content.ts` → `pricing` and `pricingNotes`. Amounts, inclusions and the
deposit/travel terms are all invented. The Instagram link points at
`instagram.com` rather than a profile.

## Structure

```
app/page.tsx          the page: hero, introduction, work, pricing, contact
app/layout.tsx        fonts, metadata, theme provider
components/           site header, footer, photo grid, pricing table, eyebrow
lib/content.ts        all editable content: photos, pricing, site identity
```

Pressing `d` toggles light and dark mode (from the template's theme provider).
