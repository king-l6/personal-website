import { cn } from "@/lib/utils"
import { navigation, site } from "@/lib/content"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:py-5">
        <a
          href="#top"
          className="shrink-0 text-[11px] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors hover:text-muted-foreground sm:tracking-[0.28em]"
        >
          {site.name}
        </a>

        <nav aria-label="Sections" className="flex items-center gap-4 sm:gap-8">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-[10px] tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-foreground sm:text-[11px] sm:tracking-[0.16em]",
                item.hideOnMobile && "hidden sm:inline"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
