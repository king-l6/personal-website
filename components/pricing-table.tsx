import { pricing } from "@/lib/content"

export function PricingTable() {
  return (
    <div className="mt-16 grid border-t border-border md:grid-cols-3">
      {pricing.map((tier) => (
        <div
          key={tier.name}
          className="flex flex-col border-b border-border py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0"
        >
          <h3 className="font-heading text-xl">{tier.name}</h3>
          <p className="mt-5 font-heading text-3xl font-light tracking-tight">
            {tier.price}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-pretty text-muted-foreground">
            {tier.summary}
          </p>

          <ul className="mt-7 space-y-2.5 text-sm text-muted-foreground">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-border select-none">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 self-start text-[11px] tracking-[0.16em] uppercase underline-offset-4 transition-colors hover:underline md:mt-auto md:pt-8"
          >
            Enquire
          </a>
        </div>
      ))}
    </div>
  )
}
