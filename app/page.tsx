import Image from "next/image"

import { Eyebrow } from "@/components/eyebrow"
import { PhotoGrid } from "@/components/photo-grid"
import { PricingTable } from "@/components/pricing-table"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { hero, pricingNotes, services, site } from "@/lib/content"

export default function Page() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Eyebrow className="text-muted-foreground">
            {site.disciplines}
          </Eyebrow>
          <h1 className="mt-8 max-w-4xl font-heading text-[2.6rem] leading-[1.06] font-light tracking-[-0.015em] text-balance sm:text-6xl lg:text-7xl">
            Photographs of quiet places, and the people who live in them.
          </h1>
          <p className="mt-9 max-w-xl text-[15px] leading-[1.85] text-pretty text-muted-foreground">
            I work slowly and mostly with available light, which means fewer
            frames and longer afternoons. Most of what you see here was made
            within a day's drive of the sea.
          </p>
        </section>

        <figure className="relative">
          <div className="relative aspect-[3/2] w-full bg-muted sm:aspect-[16/9]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mx-auto max-w-6xl px-6 pt-4 font-mono text-[11px] text-muted-foreground">
            {hero.caption}
          </figcaption>
        </figure>

        <section
          id="introduction"
          className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32"
        >
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow className="text-muted-foreground">Introduction</Eyebrow>
              <h2 className="mt-6 font-heading text-3xl leading-[1.15] font-light sm:text-4xl">
                I'm a photographer based in {site.location}, working in{" "}
                <em className="italic">portrait, landscape and documentary</em>.
              </h2>
            </div>

            <div className="space-y-6 text-[15px] leading-[1.85] text-muted-foreground md:col-span-6 md:col-start-7">
              <p>
                I started photographing because I wanted an excuse to stay
                somewhere a little longer than I otherwise would have — a
                kitchen at the end of a meal, a headland at the end of the day.
                That habit never left. Most commissions begin with a
                conversation and a walk, and end with a set of pictures that
                look like the place they came from.
              </p>
              <p>
                I shoot on film and digital, edit everything myself, and print
                the work I care about. If you'd like pictures of a person, a
                place, or a stretch of time, write to me and tell me about it.
              </p>
            </div>
          </div>

          <dl className="mt-20 grid border-t border-border sm:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={[
                  "border-b border-border py-8 sm:border-b-0 sm:py-10",
                  index > 0
                    ? "sm:border-l sm:border-border sm:pl-8"
                    : "sm:pr-8",
                ].join(" ")}
              >
                <dt className="font-heading text-xl">{service.title}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="work"
          className="scroll-mt-20 border-t border-border bg-muted/40"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow className="text-muted-foreground">
                  Selected work
                </Eyebrow>
                <h2 className="mt-6 font-heading text-3xl leading-[1.15] font-light sm:text-4xl">
                  A selection of photographs
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                Nine pictures from the last few years, in no particular order.
              </p>
            </div>

            <div className="mt-16">
              <PhotoGrid />
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <div className="max-w-2xl">
              <Eyebrow className="text-muted-foreground">Pricing</Eyebrow>
              <h2 className="mt-6 font-heading text-3xl leading-[1.15] font-light sm:text-4xl">
                Sessions and commissions
              </h2>
              <p className="mt-7 text-[15px] leading-[1.85] text-pretty text-muted-foreground">
                Three ways of working together. If none of them fit what you
                have in mind, say so — most of what I shoot starts as a
                variation on one of these.
              </p>
            </div>

            <PricingTable />

            <ul className="mt-10 space-y-2 text-sm text-muted-foreground">
              {pricingNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-20 border-t border-border bg-foreground text-background"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <Eyebrow className="text-background/60">Contact</Eyebrow>
            <h2 className="mt-8 max-w-3xl font-heading text-3xl leading-[1.12] font-light text-balance sm:text-5xl">
              Tell me what you have in mind, and I'll tell you how I'd shoot it.
            </h2>

            <a
              href={`mailto:${site.email}`}
              className="mt-12 inline-block font-heading text-2xl font-light underline decoration-background/30 underline-offset-8 transition-colors hover:decoration-background sm:text-4xl"
            >
              {site.email}
            </a>

            <dl className="mt-20 grid gap-8 border-t border-background/20 pt-8 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Based in
                </dt>
                <dd className="mt-3">{site.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Available
                </dt>
                <dd className="mt-3">{site.availability}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-background/55 uppercase">
                  Instagram
                </dt>
                <dd className="mt-3">
                  <a
                    href="https://instagram.com"
                    className="underline decoration-background/30 underline-offset-4 transition-colors hover:decoration-background"
                  >
                    {site.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
