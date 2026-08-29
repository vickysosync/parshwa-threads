import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminCard, AdminLayout, TableWrap } from "@/components/AdminLayout";
import { Badge } from "@/components/ui";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | PARSHWA COLLECTION Admin" },
      { name: "description", content: "Boutique performance overview: products, orders, customers and revenue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Dashboard | PARSHWA COLLECTION Admin" },
      { property: "og:description", content: "Store statistics at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state } = useStore();
  const revenue = state.orders.reduce((n, o) => n + o.amount, 0);
  const pending = state.orders.filter((o) => o.status === "Pending").length;
  const lowStock = state.products.filter((p) => p.stock <= 8);

  const stats = [
    { label: "Total Products", value: state.products.length },
    { label: "Total Orders", value: state.orders.length },
    { label: "Total Customers", value: state.customers.length },
    { label: "Total Revenue", value: inr(revenue) },
    { label: "Pending Orders", value: pending },
    { label: "Low Stock Products", value: lowStock.length },
  ];

  const byCategory = state.categories.map((c) => ({
    name: c.name,
    count: state.products.filter((p) => p.category === c.slug).length,
  }));
  const maxCat = Math.max(1, ...byCategory.map((c) => c.count));

  const sales = [
    { m: "Mar", v: 42 },
    { m: "Apr", v: 58 },
    { m: "May", v: 51 },
    { m: "Jun", v: 74 },
    { m: "Jul", v: 66 },
    { m: "Aug", v: 91 },
  ];
  const maxSale = Math.max(...sales.map((s) => s.v));

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <AdminCard key={s.label}>
            <p className="eyebrow text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-primary">{s.value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <h2 className="font-display text-xl">Monthly Sales (demo)</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {sales.map((s) => (
              <div key={s.m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t bg-primary transition-all duration-500 hover:bg-gold"
                  style={{ height: `${(s.v / maxSale) * 100}%` }}
                  title={`${s.v} orders`}
                />
                <span className="text-xs text-muted-foreground">{s.m}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-display text-xl">Products by Category</h2>
          <div className="mt-5 space-y-3">
            {byCategory.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{c.name}</span>
                  <span>{c.count}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-gold" style={{ width: `${(c.count / maxCat) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-xl">Recent Orders</h2>
          <TableWrap>
            <thead className="bg-secondary text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.orders.slice(0, 6).map((o) => (
                <tr key={o.id} className="border-t border-border/60">
                  <td className="p-3 font-medium">{o.id}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3">{inr(o.amount)}</td>
                  <td className="p-3">
                    <Badge tone={o.status === "Delivered" ? "success" : o.status === "Cancelled" ? "danger" : "muted"}>
                      {o.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <Link to="/admin/orders" className="mt-3 inline-block text-xs uppercase tracking-[0.14em] text-primary hover:underline">
            View all orders →
          </Link>
        </div>

        <div>
          <h2 className="mb-3 font-display text-xl">Low Stock Alerts</h2>
          <TableWrap>
            <thead className="bg-secondary text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-t border-border/60">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-muted-foreground">{p.category}</td>
                  <td className="p-3"><Badge tone={p.stock <= 5 ? "danger" : "gold"}>{p.stock}</Badge></td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </div>
      </div>
    </AdminLayout>
  );
}
