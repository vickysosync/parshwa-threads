import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Button, EmptyState, Input, Label } from "@/components/ui";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | PARSHWA COLLECTION" },
      { name: "description", content: "Complete your PARSHWA COLLECTION order with COD, card, UPI or Google Pay." },
      { property: "og:title", content: "Checkout | PARSHWA COLLECTION" },
      { property: "og:description", content: "Secure demo checkout for your boutique order." },
    ],
  }),
  component: Checkout,
});

export type LastOrder = {
  id: string;
  name: string;
  total: number;
  payment: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
};

function Checkout() {
  const { cartLines, totals, placeOrder, toast, state } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Pune",
    stateName: "Maharashtra",
    pin: "",
  });
  const [payment, setPayment] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const methods = [
    ["Cash on Delivery", state.settings.codEnabled],
    ["Debit/Credit Card", state.settings.cardEnabled],
    ["UPI", state.settings.upiEnabled],
    ["Google Pay", state.settings.gpayEnabled],
  ].filter(([, on]) => on) as [string, boolean][];

  const upd = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (cartLines.length === 0) {
    return (
      <SiteLayout>
        <PageHeader crumb="Home / Checkout" title="Checkout" />
        <div className="container-x py-16">
          <EmptyState
            title="Nothing to check out"
            text="Your shopping bag is empty."
            action={
              <Link to="/shop">
                <Button>Browse the Collection</Button>
              </Link>
            }
          />
        </div>
      </SiteLayout>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || form.pin.length < 6) {
      toast("Please complete all required details", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const order = placeOrder({
        customer: form.name,
        email: form.email,
        phone: form.phone,
        items: cartLines.map((l) => ({
          id: l.product.id,
          name: l.product.name,
          price: l.product.price,
          qty: l.qty,
          image: l.product.image,
        })),
        amount: totals.total,
        payment,
        address: `${form.address}, ${form.city}, ${form.stateName} ${form.pin}`,
      });
      const last: LastOrder = {
        id: order.id,
        name: order.customer,
        total: order.amount,
        payment: order.payment,
        address: order.address,
        items: order.items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      };
      localStorage.setItem("parshwa:lastOrder", JSON.stringify(last));
      setLoading(false);
      toast("Order placed successfully");
      navigate({ to: "/order-success" });
    }, 900);
  };

  return (
    <SiteLayout>
      <PageHeader crumb="Home / Cart / Checkout" title="Checkout" />
      <form onSubmit={submit} className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="rounded-lg border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl">Customer Details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => upd("name", e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" value={form.phone} onChange={(e) => upd("phone", e.target.value)} required />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl">Delivery Address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="addr">Address</Label>
                <Input id="addr" value={form.address} onChange={(e) => upd("address", e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={form.city} onChange={(e) => upd("city", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="st">State</Label>
                <Input id="st" value={form.stateName} onChange={(e) => upd("stateName", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="pin">PIN Code</Label>
                <Input id="pin" value={form.pin} onChange={(e) => upd("pin", e.target.value)} required />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl">Payment Method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {methods.map(([m]) => (
                <label
                  key={m}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-sm transition-colors ${
                    payment === m ? "border-primary bg-secondary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m}
                    onChange={() => setPayment(m)}
                    className="h-4 w-4 accent-[oklch(0.415_0.144_8.5)]"
                  />
                  {m}
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              This is a demo store — no payment is actually processed.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-32">
          <h2 className="font-display text-2xl">Order Summary</h2>
          <div className="gold-rule mt-3" />
          <ul className="mt-5 space-y-3 text-sm">
            {cartLines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {l.product.name} × {l.qty}
                </span>
                <span>{inr(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{totals.shipping === 0 ? "Free" : inr(totals.shipping)}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt><dd className="text-primary">{inr(totals.total)}</dd>
            </div>
          </dl>
          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Placing Order…" : "Place Order"}
          </Button>
        </aside>
      </form>
    </SiteLayout>
  );
}
