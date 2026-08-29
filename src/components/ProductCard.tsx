import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/data/mock";
import { discountPct, inr, useStore } from "@/lib/store";
import { Badge, Button, Modal, Stars } from "@/components/ui";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, state } = useStore();
  const [quick, setQuick] = useState(false);
  const off = discountPct(product.price, product.originalPrice);
  const wished = state.wishlist.includes(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.newArrival && <Badge tone="primary">New</Badge>}
          {off > 0 && <Badge tone="gold">{off}% Off</Badge>}
          {product.stock === 0 && <Badge tone="muted">Sold Out</Badge>}
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-base shadow-soft transition-colors ${
            wished ? "text-primary" : "text-ink/60 hover:text-primary"
          }`}
        >
          {wished ? "♥" : "♡"}
        </button>
        <button
          onClick={() => setQuick(true)}
          className="absolute inset-x-3 bottom-3 translate-y-4 rounded-md bg-card/95 py-2 text-[0.68rem] uppercase tracking-[0.16em] opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow text-muted-foreground">{product.category}</p>
        <h3 className="mt-1.5 line-clamp-2 font-display text-lg leading-snug">
          <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-primary">{inr(product.price)}</span>
          {off > 0 && (
            <span className="text-sm text-muted-foreground line-through">{inr(product.originalPrice)}</span>
          )}
        </div>
        <Button
          className="mt-4 w-full"
          size="sm"
          disabled={product.stock === 0}
          onClick={() => addToCart(product.id, 1, product.sizes[0], product.colors[0])}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      <Modal open={quick} onClose={() => setQuick(false)} title={product.name} wide>
        <div className="grid gap-6 sm:grid-cols-2">
          <img src={product.image} alt={product.name} loading="lazy" className="w-full rounded-md object-cover" />
          <div>
            <p className="eyebrow text-gold">{product.category}</p>
            <div className="mt-2 flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-primary">{inr(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">{inr(product.originalPrice)}</span>
              {off > 0 && <Badge tone="blush">{off}% Off</Badge>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex gap-2"><dt className="text-muted-foreground">Fabric:</dt><dd>{product.fabric}</dd></div>
              <div className="flex gap-2"><dt className="text-muted-foreground">Occasion:</dt><dd>{product.occasion}</dd></div>
              <div className="flex gap-2"><dt className="text-muted-foreground">Availability:</dt><dd>{product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}</dd></div>
            </dl>
            <div className="mt-5 flex gap-2">
              <Button onClick={() => { addToCart(product.id); setQuick(false); }} disabled={product.stock === 0}>
                Add to Cart
              </Button>
              <Link to="/product/$id" params={{ id: product.id }} onClick={() => setQuick(false)}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </article>
  );
}
