import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/AdminLayout";
import { Badge, Button, Input, Label, Modal, Select } from "@/components/ui";
import { inr, useStore } from "@/lib/store";
import { CATEGORY_LIST, IMG, type Product } from "@/data/mock";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products | PARSHWA COLLECTION Admin" },
      { name: "description", content: "Add, edit and manage the boutique product catalogue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Products | PARSHWA COLLECTION Admin" },
      { property: "og:description", content: "Manage catalogue, pricing and stock." },
    ],
  }),
  component: AdminProducts,
});

const IMAGE_OPTIONS = Object.entries(IMG).filter(([k]) => k !== "hero");

const blank = (): Product => ({
  id: "",
  name: "",
  slug: "",
  category: "Sarees",
  price: 0,
  originalPrice: 0,
  rating: 4.5,
  reviews: 0,
  image: IMG.paithani,
  gallery: [IMG.paithani, IMG.boutique, IMG.luxury],
  description: "",
  fabric: "",
  occasion: "Festive",
  colors: [],
  sizes: [],
  stock: 0,
  featured: false,
  newArrival: false,
  status: "Active",
});

function AdminProducts() {
  const { state, set, toast } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<Product | null>(null);

  const list = state.products.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      `${p.name} ${p.category} ${p.fabric}`.toLowerCase().includes(q.toLowerCase()),
  );

  const save = (p: Product) => {
    const exists = state.products.some((x) => x.id === p.id);
    const record: Product = { ...p, slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), gallery: [p.image, IMG.boutique, IMG.luxury] };
    set(
      "products",
      exists
        ? state.products.map((x) => (x.id === p.id ? record : x))
        : [{ ...record, id: String(Date.now()) }, ...state.products],
    );
    setEditing(null);
    toast(exists ? "Product updated" : "Product added");
  };

  const remove = (id: string) => {
    set("products", state.products.filter((p) => p.id !== id));
    toast("Product deleted", "info");
  };

  return (
    <AdminLayout title="Products">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="max-w-xs" />
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="max-w-48">
          <option>All</option>
          {CATEGORY_LIST.map((c) => <option key={c}>{c}</option>)}
        </Select>
        <Button className="ml-auto" onClick={() => setEditing(blank())}>+ Add Product</Button>
      </div>

      <TableWrap>
        <thead className="bg-secondary text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Flags</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id} className="border-t border-border/60 align-middle">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt="" loading="lazy" className="h-12 w-10 rounded object-cover" />
                  <span className="font-medium">{p.name}</span>
                </div>
              </td>
              <td className="p-3 text-muted-foreground">{p.category}</td>
              <td className="p-3">
                {inr(p.price)}
                <span className="ml-1 text-xs text-muted-foreground line-through">{inr(p.originalPrice)}</span>
              </td>
              <td className="p-3">
                <input
                  type="number"
                  value={p.stock}
                  onChange={(e) =>
                    set("products", state.products.map((x) => (x.id === p.id ? { ...x, stock: Number(e.target.value) } : x)))
                  }
                  className="h-9 w-20 rounded-md border border-input bg-card px-2 text-sm"
                  aria-label={`Stock for ${p.name}`}
                />
              </td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {p.featured && <Badge tone="gold">Featured</Badge>}
                  {p.newArrival && <Badge tone="primary">New</Badge>}
                </div>
              </td>
              <td className="p-3"><Badge tone={p.status === "Active" ? "success" : "muted"}>{p.status}</Badge></td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => remove(p.id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      {editing && <ProductForm product={editing} onClose={() => setEditing(null)} onSave={save} />}
    </AdminLayout>
  );
}

function ProductForm({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [f, setF] = useState<Product>(product);
  const upd = <K extends keyof Product>(k: K, v: Product[K]) => setF((s) => ({ ...s, [k]: v }));
  const discount = f.originalPrice > f.price ? Math.round(((f.originalPrice - f.price) / f.originalPrice) * 100) : 0;

  return (
    <Modal open onClose={onClose} title={product.id ? "Edit Product" : "Add Product"} wide>
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(f);
        }}
      >
        <div className="sm:col-span-2">
          <Label>Product Name</Label>
          <Input required value={f.name} onChange={(e) => upd("name", e.target.value)} />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={f.category} onChange={(e) => upd("category", e.target.value)}>
            {CATEGORY_LIST.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <div>
          <Label>Occasion</Label>
          <Input value={f.occasion} onChange={(e) => upd("occasion", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label>Description</Label>
          <Input value={f.description} onChange={(e) => upd("description", e.target.value)} />
        </div>
        <div>
          <Label>Price (₹)</Label>
          <Input type="number" value={f.price} onChange={(e) => upd("price", Number(e.target.value))} />
        </div>
        <div>
          <Label>Original Price (₹)</Label>
          <Input type="number" value={f.originalPrice} onChange={(e) => upd("originalPrice", Number(e.target.value))} />
        </div>
        <div>
          <Label>Discount</Label>
          <Input readOnly value={`${discount}%`} />
        </div>
        <div>
          <Label>Stock</Label>
          <Input type="number" value={f.stock} onChange={(e) => upd("stock", Number(e.target.value))} />
        </div>
        <div>
          <Label>Fabric</Label>
          <Input value={f.fabric} onChange={(e) => upd("fabric", e.target.value)} />
        </div>
        <div>
          <Label>Sizes (comma separated)</Label>
          <Input value={f.sizes.join(", ")} onChange={(e) => upd("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
        </div>
        <div className="sm:col-span-2">
          <Label>Colours (comma separated)</Label>
          <Input value={f.colors.join(", ")} onChange={(e) => upd("colors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
        </div>
        <div className="sm:col-span-2">
          <Label>Product Image</Label>
          <div className="flex flex-wrap gap-2">
            {IMAGE_OPTIONS.map(([k, src]) => (
              <button
                type="button"
                key={k}
                onClick={() => upd("image", src)}
                className={`h-16 w-14 overflow-hidden rounded border-2 ${f.image === src ? "border-primary" : "border-transparent"}`}
                aria-label={k}
              >
                <img src={src} alt={k} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.featured} onChange={(e) => upd("featured", e.target.checked)} className="h-4 w-4 accent-[oklch(0.415_0.144_8.5)]" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.newArrival} onChange={(e) => upd("newArrival", e.target.checked)} className="h-4 w-4 accent-[oklch(0.415_0.144_8.5)]" />
            New Arrival
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={f.status === "Active"}
              onChange={(e) => upd("status", e.target.checked ? "Active" : "Draft")}
              className="h-4 w-4 accent-[oklch(0.415_0.144_8.5)]"
            />
            Active
          </label>
        </div>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </Modal>
  );
}
