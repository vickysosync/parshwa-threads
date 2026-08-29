import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button, EmptyState } from "@/components/ui";
import { inr } from "@/lib/store";
import type { LastOrder } from "./checkout";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed | PARSHWA COLLECTION" },
      { name: "description", content: "Your PARSHWA COLLECTION order has been confirmed. View your order summary." },
      { property: "og:title", content: "Order Confirmed | PARSHWA COLLECTION" },
      { property: "og:description", content: "Thank you for shopping with our Kharadi boutique." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("parshwa:lastOrder");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  return (
    <SiteLayout>
      <div className="container-x py-20">
        {!order ? (
          <EmptyState
            title="No recent order"
            text="Place an order to see your confirmation here."
            action={
              <Link to="/shop">
                <Button>Start Shopping</Button>
              </Link>
            }
          />
        ) : (
          <div className="mx-auto max-w-2xl rise">
            <div className="rounded-xl border border-border/70 bg-card p-8 text-center shadow-lift">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
                ✓
              </div>
              <h1 className="mt-5 font-display text-3xl">Order Confirmed!</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you, {order.name}. Our boutique team will contact you shortly.
              </p>
              <p className="mt-4 inline-block rounded-md bg-secondary px-4 py-2 text-sm tracking-[0.14em]">
                Order No. <strong className="text-primary">{order.id}</strong>
              </p>

              <dl className="mt-8 space-y-3 text-left text-sm">
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Customer</dt><dd>{order.name}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Payment Method</dt><dd>{order.payment}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Delivery Address</dt><dd className="text-right">{order.address}</dd></div>
                <div className="flex justify-between gap-4 border-t border-border pt-3 text-base font-semibold">
                  <dt>Order Total</dt><dd className="text-primary">{inr(order.total)}</dd>
                </div>
              </dl>

              <div className="mt-8 text-left">
                <h2 className="eyebrow text-gold">Ordered Products</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {order.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between border-b border-border/60 py-2">
                      <span>{i.name} × {i.qty}</span>
                      <span>{inr(i.price * i.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/shop"><Button>Continue Shopping</Button></Link>
                <Link to="/admin/orders"><Button variant="outline">View Orders</Button></Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
