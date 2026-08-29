import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Button, EmptyState, Input, Select } from "@/components/ui";
import { useStore } from "@/lib/store";
import { CATEGORY_LIST } from "@/data/mock";

type ShopSearch = {
  q?: string | undefined;
  tab?: string | undefined;
  category?: string | undefined;
  occasion?: string | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    tab: typeof search["tab"] === "string" ? search["tab"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    occasion: typeof search["occasion"] === "string" ? search["occasion"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Women's Ethnic & Fusion Wear | PARSHWA COLLECTION" },
      {
        name: "description",
        content:
          "Browse sarees, kurtis, ethnic sets, lehengas and western wear. Filter by category, price, size, colour and discount.",
      },
      { property: "og:title", content: "Shop the PARSHWA COLLECTION Boutique" },
      { property: "og:description", content: "Sarees, kurtis, lehengas and fusion wear for every occasion." },
    ],
  }),
  component: Shop,
});

const SIZES = ["S", "M", "L", "XL", "XXL"];

function Shop() {
  const search = Route.useSearch();
  const { state } = useStore();

  const [q, setQ] = useState(search.q ?? "");
  const [category, setCategory] = useState(search.category ?? "All");
  const [occasion, setOccasion] = useState(search.occasion ?? "All");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sort, setSort] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [visible, setVisible] = useState(9);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const colors = useMemo(
    () => Array.from(new Set(state.products.flatMap((p) => p.colors))).sort(),
    [state.products],
  );
  const occasions = useMemo(
    () => Array.from(new Set(state.products.map((p) => p.occasion))).sort(),
    [state.products],
  );

  const results = useMemo(() => {
    let list = state.products.filter((p) => p.status === "Active");
    if (search.tab === "new") list = list.filter((p) => p.newArrival);
    if (q.trim())
      list = list.filter((p) =>
        `${p.name} ${p.category} ${p.fabric} ${p.occasion} ${p.colors.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      );
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (occasion !== "All") list = list.filter((p) => p.occasion === occasion);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (size !== "All") list = list.filter((p) => p.sizes.includes(size));
    if (color !== "All") list = list.filter((p) => p.colors.includes(color));
    list = list.filter((p) => p.price <= maxPrice);
    if (minDiscount > 0)
      list = list.filter(
        (p) => ((p.originalPrice - p.price) / p.originalPrice) * 100 >= minDiscount,
      );

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "discount")
      sorted.sort(
        (a, b) =>
          (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice,
      );
    if (sort === "featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [state.products, q, category, occasion, maxPrice, sort, inStockOnly, minDiscount, size, color, search.tab]);

  const filters = (
    <div className="space-y-6 rounded-lg border border-border/70 bg-card p-5 shadow-soft">
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Search</p>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search styles…" />
      </div>
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Category</p>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          {CATEGORY_LIST.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </div>
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Occasion</p>
        <Select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          <option>All</option>
          {occasions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      </div>
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Max Price: ₹{maxPrice.toLocaleString("en-IN")}</p>
        <input
          type="range"
          min={500}
          max={25000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[oklch(0.415_0.144_8.5)]"
          aria-label="Maximum price"
        />
      </div>
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Size</p>
        <div className="flex flex-wrap gap-2">
          {["All", ...SIZES].map((sz) => (
            <button
              key={sz}
              onClick={() => setSize(sz)}
              className={`h-9 min-w-11 rounded-md border px-2 text-xs transition-colors ${
                size === sz ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Colour</p>
        <Select value={color} onChange={(e) => setColor(e.target.value)}>
          <option>All</option>
          {colors.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </div>
      <div>
        <p className="eyebrow mb-2 text-muted-foreground">Discount</p>
        <Select value={String(minDiscount)} onChange={(e) => setMinDiscount(Number(e.target.value))}>
          <option value="0">Any discount</option>
          <option value="10">10% and above</option>
          <option value="20">20% and above</option>
          <option value="30">30% and above</option>
        </Select>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 accent-[oklch(0.415_0.144_8.5)]"
        />
        In stock only
      </label>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          setQ("");
          setCategory("All");
          setOccasion("All");
          setMaxPrice(25000);
          setSize("All");
          setColor("All");
          setMinDiscount(0);
          setInStockOnly(false);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <SiteLayout>
      <PageHeader
        crumb="Home / Shop"
        title={search.tab === "new" ? "New Arrivals" : "The Collection"}
        subtitle="Sarees, kurtis, ethnic sets, lehengas and fusion wear — thoughtfully curated."
      />
      <div className="container-x grid gap-8 py-12 lg:grid-cols-[17rem_1fr]">
        <aside>
          <Button variant="outline" size="sm" className="mb-4 w-full lg:hidden" onClick={() => setFiltersOpen((f) => !f)}>
            {filtersOpen ? "Hide Filters" : "Show Filters"}
          </Button>
          <div className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-32`}>{filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min(visible, results.length)} of {results.length} styles
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Sort
              </label>
              <Select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="w-52">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <EmptyState
              title="No styles found"
              text="No styles found. Try sarees, kurtis or festive wear."
              action={
                <Link to="/shop">
                  <Button variant="outline">Browse Everything</Button>
                </Link>
              }
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < results.length && (
                <div className="mt-10 flex justify-center">
                  <Button variant="outline" onClick={() => setVisible((v) => v + 9)}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
