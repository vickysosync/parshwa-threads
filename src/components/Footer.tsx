import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export function Footer() {
  const { state } = useStore();
  const s = state.storeInfo;

  return (
    <footer className="mt-24 bg-ink text-background">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl tracking-[0.18em] text-gold">PARSHWA</p>
          <p className="text-[0.6rem] tracking-[0.42em] text-background/70">COLLECTION</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">{s.tagline}</p>
          <div className="mt-5 flex gap-3 text-xs uppercase tracking-[0.16em] text-background/70">
            <a href={s.instagram} className="hover:text-gold">Instagram</a>
            <a href={s.facebook} className="hover:text-gold">Facebook</a>
            <a href={s.whatsapp} className="hover:text-gold">WhatsApp</a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow text-gold">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            {["Sarees", "Kurtis", "Ethnic Sets", "Lehengas", "Indo-Western", "Western Wear"].map((c) => (
              <li key={c}>
                <Link to="/category/$category" params={{ category: c }} className="hover:text-gold">
                  {c}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" search={{ tab: "new" }} className="hover:text-gold">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold">Customer Care</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/about" className="hover:text-gold">Shipping</Link></li>
            <li><Link to="/about" className="hover:text-gold">Returns</Link></li>
            <li><Link to="/about" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/offers" className="hover:text-gold">Offers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold">Visit Us</h4>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-background/70">
            <p>{s.address}</p>
            <p><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-gold">{s.phone}</a></p>
            <p><a href={`mailto:${s.email}`} className="hover:text-gold">{s.email}</a></p>
            <p>Store Hours: {s.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-background/50 md:flex-row">
          <p>© {new Date().getFullYear()} PARSHWA COLLECTION. All rights reserved.</p>
          <Link to="/admin/login" className="underline underline-offset-4 hover:text-gold">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
