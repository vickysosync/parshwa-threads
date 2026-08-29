import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Badge, Button, EmptyState, SectionHeading, Stars } from "@/components/ui";
import { discountPct, inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details | PARSHWA COLLECTION" },
      {
        name: "description",
        content: "View fabric, sizes, colours, pricing and reviews for this PARSHWA COLLECTION style.",
      },
      { property: "og:title", content: "Product Details | PARSHWA COLLECTION" },
      { property: "og:description", content: "Premium women's ethnic and fusion wear from Kharadi, Pune." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { state, addToCart, toggleWishlist } = useStore();
  const navigate = useNavigate();
  const product = state.products.find((p) => p.id === id);

  const [img, setImg] = useState(0);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <SiteLayout>
        <div className="container-x py-24">
          <EmptyState
            title="Style not found"
            text="This product is no longer available."
            action={
              <Link to="/shop">
                <Button>Back to Shop</Button>
              </Link>
            }
          />
        </div>
      </SiteLayout>
    );
  }

  const off = discountPct(product.price, product.originalPrice);
  const related = state.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const reviews = state.reviews.filter((r) => r.status === "Approved").slice(0, 3);
  const wished = state.wishlist.includes(product.id);
  const chosenSize = size ?? product.sizes[0];
  const chosenColor = color ?? product.colors[0];

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <nav className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
          <Link to="/category/$category" params={{ category: product.category }} className="hover:text-primary">
            {product.category}
          </Link>{" "}
          / <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-lg bg-secondary shadow-soft">
              <img
                src={product.gallery[img]}
                alt={product.name}
                width={900}
                height={1200}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="mt-4 flex gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setImg(i)}
                  className={`h-24 w-20 overflow-hidden rounded-md border-2 transition-colors ${
                    img === i ? "border-primary" : "border-transparent hover:border-gold"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold">{product.category}</p>
            <h1 className="mt-3 text-3xl font-medium md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <Stars rating={product.rating} size="md" />
              <span className="text-sm text-muted-foreground">
                {product.rating} • {product.reviews} reviews
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold text-primary">{inr(product.price)}</span>
              <span className="text-lg text-muted-foreground line-through">{inr(product.originalPrice)}</span>
              {off > 0 && <Badge tone="gold">{off}% Off</Badge>}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-2 text-muted-foreground">Colour</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`rounded-md border px-3 py-2 text-xs transition-colors ${
                        chosenColor === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-2 text-muted-foreground">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`h-10 min-w-12 rounded-md border text-xs transition-colors ${
                        chosenSize === sz ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-11 items-center rounded-md border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 text-lg" aria-label="Decrease quantity">−</button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 text-lg" aria-label="Increase quantity">+</button>
              </div>
              <span className={`text-sm ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
                {product.stock > 0 ? `In stock — ${product.stock} available` : "Out of stock"}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                disabled={product.stock === 0}
                onClick={() => addToCart(product.id, qty, chosenSize, chosenColor)}
              >
                Add to Cart
              </Button>
              <Button
                variant="gold"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product.id, qty, chosenSize, chosenColor);
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </Button>
              <Button variant="outline" onClick={() => toggleWishlist(product.id)}>
                {wished ? "♥ Wishlisted" : "♡ Wishlist"}
              </Button>
            </div>

            <div className="mt-8 rounded-lg border border-border/70 bg-card p-5">
              <h2 className="font-display text-xl">Product Information</h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  ["Fabric", product.fabric],
                  ["Style", product.category],
                  ["Occasion", product.occasion],
                  ["Care Instructions", product.care ?? "Dry clean recommended"],
                  ["Availability", product.stock > 0 ? "In Stock" : "Out of Stock"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl">Description</h2>
          <div className="gold-rule mt-3" />
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {product.description} Styled with a {product.fabric.toLowerCase()} finish, this piece has been
            selected by our Kharadi boutique team for its drape, comfort and finish. Pair it with minimal
            gold jewellery for {product.occasion.toLowerCase()} moments.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl">Customer Reviews</h2>
          <div className="gold-rule mt-3" />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.id} className="rounded-lg border border-border/70 bg-card p-5">
                <Stars rating={r.rating} />
                <blockquote className="mt-3 text-sm text-muted-foreground">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-primary">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <SectionHeading eyebrow="You May Also Like" title="Related Styles" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
