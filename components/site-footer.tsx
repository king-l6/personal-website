import { site } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
        <p>
          © {new Date().getFullYear()} {site.name}. All photographs are the
          property of the photographer.
        </p>
        <a href="#top" className="transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
