import Image from "next/image"

import { photos } from "@/lib/content"

export function PhotoGrid() {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
      {photos.map((photo) => (
        <li key={photo.id} className="group">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <span className="font-heading text-lg leading-none">
                {photo.title}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {photo.meta}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
