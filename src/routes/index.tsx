import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Badge, Button, Input, SectionHeading, Stars } from "@/components/ui";
import { useStore } from "@/lib/store";
import { IMG, OCCASIONS } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARSHWA COLLECTION | Sarees, Ethnic & Fusion Wear in Kharadi, Pune" },
      {
        name: "description",
        content:
          "Premium sarees, kurtis, lehengas and indo-western fashion for the modern Indian woman. Visit our boutique at Sangharsh Chowk, Kharadi, Pune.",
      },
      { property: "og:title", content: "PARSHWA COLLECTION | Affordable Luxury Women's Fashion" },
      {
        property: "og:description",
        content: "Elegant ethnic and fusion fashion curated for the modern Indian woman.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { state, toast } = useStore();
  const s = state.sections;
  const banner = state.banners.find((b) => b.active) ?? state.banners[0]!;
  const featured = state.products.filter((p) => p.featured && p.status === "Active").slice(0, 8);
  const newArrivals = state.products.filter((p) => p.newArrival && p.status === "Active").slice(0, 4);
  const testimonials = state.reviews.filter((r) => r.status === "Approved").slice(0, 4);
  const [email, setEmail] = useState("");
  const store = state.storeInfo;

  return (
    <SiteLayout>
      {s.hero && (
        <section className="relative isolate min-h-[78vh] overflow-hidden">
          <img
            src={banner.image}
            alt="Woman wearing a burgundy silk saree in the PARSHWA COLLECTION boutique"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
          <div className="container-x relative flex min-h-[78vh] items-center py-24">
            <div className="max-w-xl rise">
              <p className="eyebrow text-gold">PARSHWA COLLECTION</p>
              <h1 className="mt-5 text-4xl leading-[1.1] font-medium text-background md:text-6xl">
                {banner.title}
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-background/80">
                {banner.subtitle}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button variant="gold" size="lg">{banner.buttonText}</Button>
                </Link>
                <Link to="/shop" search={{ tab: "new" }}>
                  <Button
                    size="lg"
                    className="border border-background/50 bg-transparent text-background hover:bg-background hover:text-ink"
                    variant="ghost"
                  >
                    Explore New Arrivals
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {s.categories && (
        <section className="container-x py-20">
          <SectionHeading
            eyebrow="Curated Categories"
            title="Shop by Category"
            subtitle="From heritage weaves to contemporary silhouettes — find the style that speaks to you."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {state.categories
              .filter((c) => c.status === "Active")
              .map((c) => (
                <Link
                  key={c.id}
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-lg shadow-soft"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl text-background">{c.name}</h3>
                    <p className="mt-1 text-sm text-background/75">{c.description}</p>
                    <span className="mt-3 inline-block text-[0.68rem] uppercase tracking-[0.2em] text-gold">
                      Shop Now →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {s.featured && (
        <section className="bg-secondary/40 py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Handpicked"
              title="Featured Collection"
              subtitle="Signature styles our customers love, chosen for craftsmanship and everyday elegance."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link to="/shop">
                <Button variant="outline">View All Products</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {s.occasions && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="Dress the Moment" title="Shop by Occasion" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {OCCASIONS.map((o) => (
              <Link
                key={o.name}
                to="/shop"
                search={{ occasion: o.name }}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={o.image}
                  alt={o.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/45 transition-colors group-hover:bg-primary/55" />
                <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs uppercase tracking-[0.16em] text-background">
                  {o.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {s.newArrivals && (
        <section className="container-x py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">Just In</p>
              <h2 className="mt-3 text-3xl font-medium md:text-4xl">New Arrivals</h2>
              <div className="gold-rule mt-4" />
            </div>
            <Link to="/shop" search={{ tab: "new" }}>
              <Button variant="outline" size="sm">View All New Arrivals</Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {s.luxury && (
        <section className="bg-primary text-primary-foreground">
          <div className="grid lg:grid-cols-2">
            <img
              src={IMG.luxury}
              alt="Luxurious silk fabric detail"
              loading="lazy"
              className="h-80 w-full object-cover lg:h-full"
            />
            <div className="flex items-center px-6 py-16 md:px-16">
              <div className="max-w-md">
                <p className="eyebrow text-gold">Affordable Luxury</p>
                <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
                  Luxury You Can Love, Prices You Can Afford
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80">
                  Premium fabrics, timeless silhouettes and fashionable details curated for everyday
                  confidence and special occasions.
                </p>
                <Link to="/shop" className="mt-8 inline-block">
                  <Button variant="gold">Explore Premium Collection</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {s.promo && (
        <section className="container-x py-20">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={IMG.festive}
              alt="Women celebrating in festive Indian ethnic wear"
              loading="lazy"
              className="h-[26rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-sm">
                <Badge tone="gold">Festive Edit</Badge>
                <h2 className="mt-4 text-3xl text-background md:text-4xl">
                  Celebrate Every Occasion in Style
                </h2>
                <Link to="/shop" search={{ occasion: "Festive" }} className="mt-7 inline-block">
                  <Button variant="gold">Shop Festive Wear</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {s.testimonials && (
        <section className="bg-secondary/40 py-20">
          <div className="container-x">
            <SectionHeading eyebrow="Loved by Our Customers" title="What Women Say About Us" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((t) => (
                <figure key={t.id} className="rounded-lg border border-border/70 bg-card p-6 shadow-soft">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-primary">{t.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {s.whyChooseUs && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="The Parshwa Promise" title="Why Choose PARSHWA COLLECTION" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "✦", title: "Premium Quality", text: "Carefully selected fabrics and fashionable designs." },
              { icon: "❖", title: "Affordable Luxury", text: "Premium style at accessible price points." },
              { icon: "◈", title: "Easy Shopping", text: "Simple browsing, cart and checkout experience." },
              { icon: "❋", title: "Trusted Boutique", text: "A customer-focused women's fashion destination in Kharadi." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-border/70 bg-card p-7 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-2xl text-gold">{f.icon}</p>
                <h3 className="mt-4 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {s.storeVisit && (
        <section className="container-x pb-20">
          <div className="grid items-center gap-10 rounded-xl border border-border/70 bg-card p-6 shadow-soft lg:grid-cols-2 lg:p-10">
            <img
              src={IMG.boutique}
              alt="Interior of the PARSHWA COLLECTION boutique in Kharadi, Pune"
              loading="lazy"
              className="h-80 w-full rounded-lg object-cover lg:h-[26rem]"
            />
            <div>
              <p className="eyebrow text-gold">Boutique Experience</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Visit PARSHWA COLLECTION</h2>
              <div className="gold-rule mt-4" />
              <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-muted-foreground">
                <p>{store.address}</p>
                <p>
                  Phone:{" "}
                  <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="text-primary">
                    {store.phone}
                  </a>
                </p>
                <p>Store Hours: {store.hours}</p>
              </address>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-block"
              >
                <Button>Get Directions</Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {s.newsletter && (
        <section className="bg-ink py-20 text-background">
          <div className="container-x max-w-xl text-center">
            <p className="eyebrow text-gold">Newsletter</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Stay in Style</h2>
            <p className="mt-4 text-sm text-background/70">
              Get updates on new arrivals, festive collections and exclusive offers.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast("Please enter a valid email", "error");
                setEmail("");
                toast("Thank you for subscribing to PARSHWA COLLECTION");
              }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="bg-background/10 text-background placeholder:text-background/50"
              />
              <Button variant="gold" type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
