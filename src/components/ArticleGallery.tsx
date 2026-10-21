import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import type { ArticleImage } from "../lib/articles";

export function ArticleGallery({ images }: { images: ArticleImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(6);
  if (!images.length) return null;
  const move = (delta: number) => setActive((current) => current === null ? null : (current + delta + images.length) % images.length);
  return <section id="gallery" className="scroll-mt-28 border-t border-border pt-10" aria-labelledby="gallery-heading">
    <div className="mb-6 flex items-baseline justify-between gap-4"><h2 id="gallery-heading" className="font-serif text-3xl">In photographs</h2><p className="text-sm text-muted-foreground">{images.length} photographs</p></div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{images.slice(0, visible).map((image, index) => <button key={image.src} onClick={() => setActive(index)} className="group relative aspect-[4/3] overflow-hidden bg-secondary text-left" aria-label={`Open photograph ${index + 1}: ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={400} height={300} className="h-full w-full object-cover transition-transform motion-safe:group-hover:scale-105" /><span className="absolute bottom-2 right-2 bg-black/65 p-1.5 text-white"><Expand className="h-4 w-4" aria-hidden /></span></button>)}</div>
    {visible < images.length && <button onClick={() => setVisible((count) => count + 12)} className="mt-6 min-h-11 border border-primary px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/5">Show more photographs ({images.length - visible} remaining)</button>}
    <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
      <DialogContent className="z-[70] w-[calc(100%-2rem)] max-w-5xl border-white/20 bg-[#061e1b] p-4 pt-12 text-white sm:rounded-none sm:p-6 sm:pt-12" onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
        <DialogTitle className="sr-only">Article photograph {(active ?? 0) + 1} of {images.length}</DialogTitle>
        {active !== null && <img src={images[active].src} alt={images[active].alt} className="mx-auto max-h-[65vh] w-auto max-w-full object-contain" />}
        <DialogDescription className="text-center text-sm leading-6 text-white/85">{active !== null ? images[active].caption || images[active].alt : ""}</DialogDescription>
        <div className="flex items-center justify-between"><button type="button" onClick={() => move(-1)} aria-label="Previous photograph" className="flex h-11 w-11 items-center justify-center border border-white/30 hover:bg-white/10"><ChevronLeft aria-hidden /></button><span className="text-sm" aria-live="polite">{(active ?? 0) + 1} / {images.length}</span><button type="button" onClick={() => move(1)} aria-label="Next photograph" className="flex h-11 w-11 items-center justify-center border border-white/30 hover:bg-white/10"><ChevronRight aria-hidden /></button></div>
      </DialogContent>
    </Dialog>
  </section>;
}
