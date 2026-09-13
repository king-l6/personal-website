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

`eslint` is pinned to `^9` on purpose. `eslint-config-next` accepts `>=9`, but
the `eslint-plugin-react` it depends on peers at `^9.7`, so installing ESLint 10
makes `pnpm lint` crash on load rather than report anything. Remove the pin once
`eslint-plugin-react` widens its range to include ESLint 10 — 9.x is a
deprecated line, so it should not be where this settles.

Fonts are loaded through `next/font/google`: Cormorant Garamond for display
type, Inter for text, Geist Mono for the small labels and photo captions.

## Replace before launch

Everything below is placeholder content. The photos are the important part.

### 1. Photographs

All images come from `picsum.photos` seeded URLs — real photographs, but
random ones. Replace every one of them with your own work.

Put your files in `public/photos/` and point the entries in `lib/content.ts`
at them, e.g. `src: "/photos/still-water.jpg"`.

| Slot              | Where                         | Stand-in image                       | Suggested replacement                            |
| ----------------- | ----------------------------- | ------------------------------------ | ------------------------------------------------ |
| Hero              | `lib/content.ts` → `hero.src` | Stone college building across a lawn | Your strongest wide frame, 2400 × 1350 or larger |
| 01 Still Water    | `photos[0]`                   | Frosted grass, dark treeline         | Landscape, Lofoten                               |
| 02 Mira           | `photos[1]`                   | Backlit tall grasses                 | Portrait                                         |
| 03 The Long Field | `photos[2]`                   | Blurred pale shape on blue-white     | Landscape, Jutland                               |
| 04 Kitchen Table  | `photos[3]`                   | Night street, light trails           | Documentary still life                           |
| 05 Northbound     | `photos[4]`                   | Silhouette mid-jump at sunset        | Travel / landscape                               |
| 06 Hands          | `photos[5]`                   | Dirt path through bare trees         | Portrait detail                                  |
| 07 Rain on Glass  | `photos[6]`                   | Twilight sky, blue to orange         | Travel, Kyoto                                    |
| 08 Sisters        | `photos[7]`                   | Building facade with fire escapes    | Portrait                                         |
| 09 Last Light     | `photos[8]`                   | Rocky shoreline at sunset            | Landscape, Dolomites                             |

The gallery is a uniform 4:5 crop, so the images are all rendered in portrait
orientation.

While a slot holds a stand-in, its `alt` text describes the photograph that is
actually on the page — the subject named in the `Stand-in image` column above —
so a screen reader is not told something untrue. The caption names the
photograph that belongs there, with a `Placeholder` tag beneath it. When you
drop in your own file:

1. rewrite `alt` to describe it,
2. set `placeholder: false` on that entry.

That drops the tag for that slot only, so you can replace the pictures a few at
a time. The hero image works the same way.

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
