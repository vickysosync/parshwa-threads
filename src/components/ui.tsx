import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "dark" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  gold: "bg-gold text-gold-foreground hover:bg-gold/90",
  outline: "border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground",
  ghost: "text-foreground hover:bg-secondary",
  dark: "bg-ink text-background hover:bg-ink/90",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-input bg-card p-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </label>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "primary" | "blush" | "muted" | "success" | "danger" }) {
  const tones = {
    gold: "bg-gold text-gold-foreground",
    primary: "bg-primary text-primary-foreground",
    blush: "bg-blush text-ink",
    muted: "bg-secondary text-secondary-foreground",
    success: "bg-success text-background",
    danger: "bg-destructive text-destructive-foreground",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em]", tones[tone])}>
      {children}
    </span>
  );
}

export function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", size === "sm" ? "text-xs" : "text-base")} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-gold" : "text-border"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-medium text-ink md:text-4xl">{title}</h2>
      <div className={cn("gold-rule mt-4", center && "mx-auto")} />
      {subtitle ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm">
      <div className={cn("my-8 w-full rounded-lg bg-card shadow-lift rise", wide ? "max-w-3xl" : "max-w-lg")}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-md px-2 text-xl text-muted-foreground hover:text-primary">
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <p className="text-2xl">✦</p>
      <h3 className="mt-3 text-xl font-medium">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{text}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  );
}
