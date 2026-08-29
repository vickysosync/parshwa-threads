import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Button, EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/category/$category")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.category} | PARSHWA COLLECTION Pune` },
      {
        name: "description",
        content: `Shop our ${params.category} collection — premium fabrics and elegant designs at boutique prices from PARSHWA COLLECTION, Kharadi, Pune.`,
      },
      { property: "og:title", content: `${params.category} | PARSHWA COLLECTION` },
      { property: "og:description", content: `Explore the ${params.category} range at PARSHWA COLLECTION.` },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { state } = useStore();
  const products = state.products.filter((p) => p.category === category && p.status === "Active");
  const meta = state.categories.find((c) => c.slug === category);

  return (
    <SiteLayout>
      <PageHeader
        crumb={`Home / Shop / ${category}`}
        title={meta?.name ?? category}
        subtitle={meta?.description}
      />
      <div className="container-x py-12">
        {products.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            text="No styles found in this category. Try sarees, kurtis or festive wear."
            action={
              <Link to="/shop">
                <Button variant="outline">Browse the Collection</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
