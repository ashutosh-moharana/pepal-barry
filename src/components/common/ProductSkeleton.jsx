
export default function ProductSkeleton() {
  return (
    <article className="relative aspect-square overflow-hidden rounded-3xl border border-primary/10 bg-card animate-pulse">
      <div className="absolute inset-0 bg-muted" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />

      <div className="absolute left-4 top-4 h-6 w-20 rounded-full bg-background/60" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="h-5 w-2/3 rounded-full bg-background/60" />
          <div className="h-5 w-14 rounded-full bg-background/60" />
        </div>
      </div>
    </article>
  );
}
