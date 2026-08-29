import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui";
import { Toaster } from "@/components/Toaster";

const nav = [
  { label: "Dashboard", to: "/admin/dashboard" as const },
  { label: "Products", to: "/admin/products" as const },
  { label: "Categories", to: "/admin/categories" as const },
  { label: "Orders", to: "/admin/orders" as const },
  { label: "Customers", to: "/admin/customers" as const },
  { label: "Banners", to: "/admin/banners" as const },
  { label: "Offers", to: "/admin/offers" as const },
  { label: "Reviews", to: "/admin/reviews" as const },
  { label: "Homepage Sections", to: "/admin/homepage" as const },
  { label: "Store Information", to: "/admin/store-settings" as const },
  { label: "Settings", to: "/admin/settings" as const },
];

export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const { state, ready, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !state.admin) navigate({ to: "/admin/login" });
  }, [ready, state.admin, navigate]);

  if (!ready || !state.admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 lg:flex">
      <aside className="bg-ink text-background lg:w-64 lg:shrink-0">
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/" className="block">
            <p className="font-display text-lg tracking-[0.18em] text-gold">PARSHWA</p>
            <p className="text-[0.55rem] tracking-[0.4em] text-background/60">ADMIN PANEL</p>
          </Link>
          <button className="text-xl lg:hidden" aria-label="Toggle navigation" onClick={() => setOpen((o) => !o)}>
            ☰
          </button>
        </div>
        <nav className={`${open ? "block" : "hidden"} px-3 pb-5 lg:block`}>
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm text-background/70 transition-colors hover:bg-background/10 hover:text-gold"
              activeProps={{ className: "bg-primary text-primary-foreground hover:text-primary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            className="mt-2 block w-full rounded-md px-3 py-2.5 text-left text-sm text-background/70 hover:bg-background/10 hover:text-gold"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-4">
          <h1 className="font-display text-2xl">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:block">{state.settings.adminEmail}</span>
            <Link to="/">
              <Button size="sm" variant="outline">View Store</Button>
            </Link>
          </div>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border/70 bg-card p-5 shadow-soft ${className}`}>{children}</div>;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/70 bg-card shadow-soft">
      <table className="w-full min-w-[42rem] text-sm">{children}</table>
    </div>
  );
}
