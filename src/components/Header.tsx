import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, inr } from "@/lib/store";
import { Input } from "@/components/ui";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
];

const catLinks = [
  { label: "Sarees", cat: "Sarees" },
  { label: "Ethnic Wear", cat: "Ethnic Sets" },
  { label: "Fusion Wear", cat: "Indo-Western" },
];

export function Header() {
  const { state, cartCount } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = q.trim()
    ? state.products
        .filter((p) =>
          `${p.name} ${p.category} ${p.occasion} ${p.fabric}`.toLowerCase().includes(q.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  const closeAll = () => {
    setMenu(false);
    setSearch(false);
    setQ("");
  };

  const linkClass =
    "text-xs uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary text-primary-foreground">
        <p className="container-x py-2 text-center text-[0.68rem] uppercase tracking-[0.18em]">
          Free Assistance • UPI Available • Visit Our Kharadi Store
        </p>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container-x flex h-18 items-center justify-between gap-4">
          <button
            className="lg:hidden text-2xl leading-none text-ink"
            aria-label="Open menu"
            onClick={() => setMenu((m) => !m)}
          >
            ☰
          </button>

          <Link to="/" onClick={closeAll} className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-[0.2em] text-primary md:text-2xl">
              PARSHWA
            </span>
            <span className="text-[0.6rem] tracking-[0.42em] text-gold">COLLECTION</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className={linkClass} activeProps={{ className: "text-primary" }}>
                {l.label}
              </Link>
            ))}
            {catLinks.map((l) => (
              <Link
                key={l.label}
                to="/category/$category"
                params={{ category: l.cat }}
                className={linkClass}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/shop" search={{ tab: "new" }} className={linkClass}>
              New Arrivals
            </Link>
            <Link to="/offers" className={linkClass}>
              Offers
            </Link>
            <Link to="/about" className={linkClass}>
              About
            </Link>
            <Link to="/contact" className={linkClass}>
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4 text-lg">
            <button aria-label="Search" onClick={() => setSearch((s) => !s)} className="hover:text-primary">
              ⌕
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-primary">
              ♡
              {state.wishlist.length > 0 && (
                <span className="absolute -right-2 -top-1 rounded-full bg-gold px-1.5 text-[0.6rem] font-bold text-gold-foreground">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Shopping bag" className="relative hover:text-primary">
              ⛬
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1 rounded-full bg-primary px-1.5 text-[0.6rem] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {search && (
          <div className="border-t border-border bg-card">
            <div className="container-x py-4">
              <Input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sarees, kurtis, lehengas…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate({ to: "/shop", search: { q } });
                    closeAll();
                  }
                }}
              />
              {q.trim() && (
                <div className="mt-3 space-y-1">
                  {results.length === 0 ? (
                    <p className="py-4 text-sm text-muted-foreground">
                      No styles found. Try sarees, kurtis or festive wear.
                    </p>
                  ) : (
                    results.map((p) => (
                      <Link
                        key={p.id}
                        to="/product/$id"
                        params={{ id: p.id }}
                        onClick={closeAll}
                        className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-secondary"
                      >
                        <img src={p.image} alt={p.name} loading="lazy" className="h-12 w-10 rounded object-cover" />
                        <span className="flex-1 text-sm">{p.name}</span>
                        <span className="text-sm text-primary">{inr(p.price)}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {menu && (
          <nav className="border-t border-border bg-card lg:hidden">
            <div className="container-x flex flex-col py-3">
              {[
                { label: "Home", to: "/" as const },
                { label: "Shop", to: "/shop" as const },
                { label: "Offers", to: "/offers" as const },
                { label: "About", to: "/about" as const },
                { label: "Contact", to: "/contact" as const },
                { label: "Wishlist", to: "/wishlist" as const },
              ].map((l) => (
                <Link key={l.label} to={l.to} onClick={closeAll} className="border-b border-border/60 py-3 text-sm uppercase tracking-[0.16em]">
                  {l.label}
                </Link>
              ))}
              {catLinks.map((l) => (
                <Link
                  key={l.label}
                  to="/category/$category"
                  params={{ category: l.cat }}
                  onClick={closeAll}
                  className="border-b border-border/60 py-3 text-sm uppercase tracking-[0.16em]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
