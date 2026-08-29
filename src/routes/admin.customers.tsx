import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/AdminLayout";
import { Input, Select } from "@/components/ui";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers | PARSHWA COLLECTION Admin" },
      { name: "description", content: "Customer directory with orders, spend and last purchase date." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Customers | PARSHWA COLLECTION Admin" },
      { property: "og:description", content: "Boutique customer records." },
    ],
  }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const { state } = useStore();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("spent");

  const list = state.customers
    .filter((c) => `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sort === "spent" ? b.spent - a.spent : sort === "orders" ? b.orders - a.orders : a.name.localeCompare(b.name),
    );

  return (
    <AdminLayout title="Customers">
      <div className="mb-5 flex flex-wrap gap-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers…" className="max-w-xs" />
        <Select value={sort} onChange={(e) => setSort(e.target.value)} className="max-w-52">
          <option value="spent">Sort: Total Spent</option>
          <option value="orders">Sort: Orders</option>
          <option value="name">Sort: Name</option>
        </Select>
      </div>

      <TableWrap>
        <thead className="bg-secondary text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <tr>
            <th className="p-3">Customer</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Orders</th>
            <th className="p-3">Total Spent</th>
            <th className="p-3">Last Order</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id} className="border-t border-border/60">
              <td className="p-3 font-medium">{c.name}</td>
              <td className="p-3 text-muted-foreground">{c.email}</td>
              <td className="p-3 text-muted-foreground">{c.phone}</td>
              <td className="p-3">{c.orders}</td>
              <td className="p-3 text-primary">{inr(c.spent)}</td>
              <td className="p-3 text-muted-foreground">{c.lastOrder}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </AdminLayout>
  );
}
