const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-primary text-primary-foreground active:scale-95 px-6 py-3",
  outline:
    "border border-foreground/10 text-foreground active:bg-foreground/5 active:scale-95 px-6 py-3",
  ghost:
    "text-foreground/70 active:text-foreground active:bg-foreground/5 active:scale-95 px-4 py-2",
  muted:
    "bg-muted text-muted-foreground active:bg-muted/80 active:scale-95 px-5 py-3 rounded-2xl",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  loading = false,
  ...props
}) {
  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

