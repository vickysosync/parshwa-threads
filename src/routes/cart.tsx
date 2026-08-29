import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Button, EmptyState } from "@/components/ui";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag | PARSHWA COLLECTION" },
      { name: "description", content: "Review the styles in your PARSHWA COLLECTION shopping bag before checkout." },
      { property: "og:title", content: "Shopping Bag | PARSHWA COLLECTION" },
      { property: "og:description", content: "Review your selected sarees, kurtis and fusion wear." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartLines, totals, setQty, removeFromCart, toggleWishlist } = useStore();

  return (
    <SiteLayout>
      <PageHeader crumb="Home / Cart" title="Your Shopping Bag" />
      <div className="container-x py-12">
        {cartLines.length === 0 ? (
          <EmptyState
            title="Your bag is empty"
            text="Add a few favourites from the collection and they will appear here."
            action={
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-4">
              {cartLines.map((l) => (
                <div key={l.id} className="flex flex-col gap-4 rounded-lg border border-border/70 bg-card p-4 shadow-soft sm:flex-row">
                  <Link to="/product/$id" params={{ id: l.product.id }} className="shrink-0">
                    <img src={l.product.image} alt={l.product.name} loading="lazy" className="h-40 w-32 rounded-md object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <p className="eyebrow text-muted-foreground">{l.product.category}</p>
                    <h2 className="mt-1 font-display text-xl">
                      <Link to="/product/$id" params={{ id: l.product.id }} className="hover:text-primary">
                        {l.product.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[l.size, l.color].filter(Boolean).join(" • ") || l.product.fabric}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-primary">{inr(l.product.price)}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                      <div className="flex h-10 items-center rounded-md border border-border">
                        <button onClick={() => setQty(l.id, l.qty - 1)} className="px-3" aria-label="Decrease quantity">−</button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} className="px-3" aria-label="Increase quantity">+</button>
                      </div>
                      <button onClick={() => toggleWishlist(l.id)} className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">
                        Move to Wishlist
                      </button>
                      <button onClick={() => removeFromCart(l.id)} className="text-xs uppercase tracking-[0.14em] text-destructive hover:underline">
                        Remove
                      </button>
                      <span className="ml-auto text-sm text-muted-foreground">
                        Subtotal: <strong className="text-ink">{inr(l.product.price * l.qty)}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-32">
              <h2 className="font-display text-2xl">Order Summary</h2>
              <div className="gold-rule mt-3" />
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">You Save</dt><dd className="text-success">− {inr(totals.discount)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{totals.shipping === 0 ? "Free" : inr(totals.shipping)}</dd></div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <dt>Grand Total</dt><dd className="text-primary">{inr(totals.total)}</dd>
                </div>
              </dl>
              <Link to="/checkout" className="mt-6 block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
              <Link to="/shop" className="mt-3 block">
                <Button variant="outline" className="w-full">Continue Shopping</Button>
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
