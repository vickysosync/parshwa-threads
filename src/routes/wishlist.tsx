import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Button, EmptyState } from "@/components/ui";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | PARSHWA COLLECTION" },
      { name: "description", content: "Your saved sarees, kurtis and fusion wear from PARSHWA COLLECTION." },
      { property: "og:title", content: "Wishlist | PARSHWA COLLECTION" },
      { property: "og:description", content: "Keep track of the styles you love." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { state, toggleWishlist, addToCart } = useStore();
  const items = state.products.filter((p) => state.wishlist.includes(p.id));

  return (
    <SiteLayout>
      <PageHeader crumb="Home / Wishlist" title="Your Wishlist" />
      <div className="container-x py-12">
        {items.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            text="Tap the heart on any style to save it for later."
            action={
              <Link to="/shop">
                <Button>Discover Styles</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {items.map((p) => (
              <div key={p.id} className="flex flex-col gap-4 rounded-lg border border-border/70 bg-card p-4 shadow-soft sm:flex-row sm:items-center">
                <img src={p.image} alt={p.name} loading="lazy" className="h-36 w-28 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="eyebrow text-muted-foreground">{p.category}</p>
                  <h2 className="mt-1 font-display text-xl">
                    <Link to="/product/$id" params={{ id: p.id }} className="hover:text-primary">{p.name}</Link>
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-primary">{inr(p.price)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => addToCart(p.id)} disabled={p.stock === 0}>Add to Cart</Button>
                  <Button size="sm" variant="outline" onClick={() => toggleWishlist(p.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
