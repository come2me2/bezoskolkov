import Image from "next/image";

import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/lib/photos";

export function SitePhoto({
  photo,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  caption = false,
}: {
  photo: SitePhoto;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  caption?: boolean;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-2xl bg-elevated hairline", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-10 text-sm text-bone">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
