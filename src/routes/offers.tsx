import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Badge, Button, EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Festive Deals | PARSHWA COLLECTION" },
      {
        name: "description",
        content: "Up to 30% off the festive edit, special saree collections and limited-time boutique offers in Kharadi, Pune.",
      },
      { property: "og:title", content: "Offers & Festive Deals | PARSHWA COLLECTION" },
      { property: "og:description", content: "Seasonal savings on sarees, ethnic sets and festive wear." },
    ],
  }),
  component: Offers,
});

function Offers() {
  const { state } = useStore();
  const offers = state.offers.filter((o) => o.active);

  return (
    <SiteLayout>
      <PageHeader crumb="Home / Offers" title="Boutique Offers" subtitle="Seasonal savings across our most-loved collections." />
      <div className="container-x py-12">
        {offers.length === 0 ? (
          <EmptyState title="No live offers" text="Check back soon for festive and seasonal promotions." />
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {offers.map((o) => (
              <article key={o.id} className="group overflow-hidden rounded-xl border border-border/70 bg-card shadow-soft transition-transform duration-500 hover:-translate-y-1">
                <div className="relative h-60 overflow-hidden">
                  <img src={o.image} alt={o.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <div className="absolute left-5 top-5"><Badge tone="gold">Save {o.discount}</Badge></div>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl">{o.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Valid {o.start} – {o.end}
                  </p>
                  <Link to="/shop" className="mt-5 inline-block">
                    <Button size="sm">Shop This Offer</Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
