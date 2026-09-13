import { cn } from "@/lib/utils"

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.22em] uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}
