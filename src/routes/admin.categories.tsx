import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/AdminLayout";
import { Badge, Button, Input, Label, Modal, Select } from "@/components/ui";
import { useStore } from "@/lib/store";
import { CATEGORY_LIST, IMG, type Category } from "@/data/mock";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories | PARSHWA COLLECTION Admin" },
      { name: "description", content: "Manage boutique categories, imagery and visibility." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Categories | PARSHWA COLLECTION Admin" },
      { property: "og:description", content: "Add, edit and disable store categories." },
    ],
  }),
  component: AdminCategories,
});

const IMAGE_OPTIONS = Object.entries(IMG).filter(([k]) => k !== "hero");

function AdminCategories() {
  const { state, set, toast } = useStore();
  const [editing, setEditing] = useState<Category | null>(null);

  const save = (c: Category) => {
    const exists = state.categories.some((x) => x.id === c.id);
    set(
      "categories",
      exists ? state.categories.map((x) => (x.id === c.id ? c : x)) : [...state.categories, { ...c, id: `c${Date.now()}` }],
    );
    setEditing(null);
    toast(exists ? "Category updated" : "Category added");
  };

  return (
    <AdminLayout title="Categories">
      <div className="mb-5 flex justify-end">
        <Button
          onClick={() =>
            setEditing({ id: "", name: "", slug: "Sarees", description: "", image: IMG.paithani, status: "Active" })
          }
        >
          + Add Category
        </Button>
      </div>

      <TableWrap>
        <thead className="bg-secondary text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <tr>
            <th className="p-3">Category</th>
            <th className="p-3">Maps To</th>
            <th className="p-3">Products</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((c) => (
            <tr key={c.id} className="border-t border-border/60">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img src={c.image} alt="" loading="lazy" className="h-12 w-10 rounded object-cover" />
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  </div>
                </div>
              </td>
              <td className="p-3 text-muted-foreground">{c.slug}</td>
              <td className="p-3">{state.products.filter((p) => p.category === c.slug).length}</td>
              <td className="p-3"><Badge tone={c.status === "Active" ? "success" : "muted"}>{c.status}</Badge></td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(c)}>Edit</Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      set("categories", state.categories.filter((x) => x.id !== c.id));
                      toast("Category deleted", "info");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      {editing && <CategoryForm category={editing} onClose={() => setEditing(null)} onSave={save} />}
    </AdminLayout>
  );
}

function CategoryForm({
  category,
  onClose,
  onSave,
}: {
  category: Category;
  onClose: () => void;
  onSave: (c: Category) => void;
}) {
  const [f, setF] = useState(category);
  return (
    <Modal open onClose={onClose} title={category.id ? "Edit Category" : "Add Category"}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
        <div>
          <Label>Display Name</Label>
          <Input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        </div>
        <div>
          <Label>Product Category</Label>
          <Select value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })}>
            {CATEGORY_LIST.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <div>
          <Label>Description</Label>
          <Input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        </div>
        <div>
          <Label>Category Image</Label>
          <div className="flex flex-wrap gap-2">
            {IMAGE_OPTIONS.map(([k, src]) => (
              <button
                type="button"
                key={k}
                onClick={() => setF({ ...f, image: src })}
                className={`h-16 w-14 overflow-hidden rounded border-2 ${f.image === src ? "border-primary" : "border-transparent"}`}
                aria-label={k}
              >
                <img src={src} alt={k} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={f.status === "Active"}
            onChange={(e) => setF({ ...f, status: e.target.checked ? "Active" : "Inactive" })}
            className="h-4 w-4 accent-[oklch(0.415_0.144_8.5)]"
          />
          Active on storefront
        </label>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Category</Button>
        </div>
      </form>
    </Modal>
  );
}
