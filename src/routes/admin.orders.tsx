import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/AdminLayout";
import { Badge, Button, Input, Select } from "@/components/ui";
import { inr, useStore } from "@/lib/store";
import type { Order } from "@/data/mock";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders | PARSHWA COLLECTION Admin" },
      { name: "description", content: "Track and update boutique order status from pending to delivered." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Orders | PARSHWA COLLECTION Admin" },
      { property: "og:description", content: "Order management for the boutique." },
    ],
  }),
  component: AdminOrders,
});

const STATUSES: Order["status"][] = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const { state, set, toast } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const list = state.orders.filter(
    (o) =>
      (status === "All" || o.status === status) &&
      `${o.id} ${o.customer} ${o.payment}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AdminLayout title="Orders">
      <div className="mb-5 flex flex-wrap gap-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="max-w-xs" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="max-w-48">
          <option>All</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </Select>
      </div>

      <TableWrap>
        <thead className="bg-secondary text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Date</th>
            <th className="p-3">Products</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((o) => (
            <tr key={o.id} className="border-t border-border/60">
              <td className="p-3 font-medium">{o.id}</td>
              <td className="p-3">
                <p>{o.customer}</p>
                <p className="text-xs text-muted-foreground">{o.phone}</p>
              </td>
              <td className="p-3 text-muted-foreground">{o.date}</td>
              <td className="p-3 text-xs text-muted-foreground">
                {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
              </td>
              <td className="p-3">{inr(o.amount)}</td>
              <td className="p-3 text-muted-foreground">{o.payment}</td>
              <td className="p-3">
                <Select
                  value={o.status}
                  className="h-9 w-36 text-xs"
                  onChange={(e) => {
                    set("orders", state.orders.map((x) => (x.id === o.id ? { ...x, status: e.target.value as Order["status"] } : x)));
                    toast(`Order ${o.id} marked ${e.target.value}`);
                  }}
                >
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      {list.length === 0 && (
        <p className="mt-6 text-center text-sm text-muted-foreground">No orders match your filters.</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {STATUSES.map((s) => (
          <Badge key={s} tone="muted">
            {s}: {state.orders.filter((o) => o.status === s).length}
          </Badge>
        ))}
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => { setQ(""); setStatus("All"); }}>
          Reset
        </Button>
      </div>
    </AdminLayout>
  );
}
