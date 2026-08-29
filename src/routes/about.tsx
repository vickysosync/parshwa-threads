import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Button, SectionHeading } from "@/components/ui";
import { IMG } from "@/data/mock";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | PARSHWA COLLECTION, Kharadi Pune" },
      {
        name: "description",
        content:
          "PARSHWA COLLECTION blends traditional Indian craftsmanship with contemporary fashion for modern women. Learn about our boutique in Kharadi, Pune.",
      },
      { property: "og:title", content: "Our Story | PARSHWA COLLECTION" },
      { property: "og:description", content: "Affordable luxury women's ethnic and fusion wear in Pune." },
    ],
  }),
  component: About,
});

function About() {
  const { state } = useStore();
  const s = state.storeInfo;

  return (
    <SiteLayout>
      <PageHeader crumb="Home / About" title="Our Story" subtitle="Traditional elegance, contemporary confidence." />

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <img src={IMG.boutique} alt="PARSHWA COLLECTION boutique interior" loading="lazy" className="h-96 w-full rounded-xl object-cover shadow-soft" />
        <div>
          <p className="eyebrow text-gold">Since our first drape</p>
          <h2 className="mt-3 text-3xl md:text-4xl">A Boutique Built Around Women's Wardrobes</h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            PARSHWA COLLECTION is a premier women's ethnic and fusion wear boutique in Pune. Strategically
            located at Sangharsh Chowk on Kharadi Road, our store brings together the finest of traditional
            Indian craftsmanship and contemporary fashion trends for the modern Indian woman.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            From handwoven Paithani and silk sarees to ready-to-wear kurtis, coordinated pant-dupatta sets,
            festive lehengas and indo-western silhouettes — every piece is selected personally by our team
            for its fabric, fall and finish.
          </p>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="What Guides Us" title="Our Philosophy" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Fashion Philosophy", d: "Heritage weaves reimagined with modern cuts so tradition never feels dated." },
              { t: "Quality Commitment", d: "Premium fabrics, careful stitching and honest descriptions on every style." },
              { t: "Customer First", d: "Personal styling assistance in-store and easy, transparent shopping online." },
              { t: "Affordable Luxury", d: "Boutique-grade design at price points that fit real, everyday wardrobes." },
            ].map((f) => (
              <div key={f.t} className="rounded-lg border border-border/70 bg-card p-6 shadow-soft">
                <p className="text-xl text-gold">✦</p>
                <h3 className="mt-3 font-display text-xl">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-gold">Boutique Information</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Come See the Fabric in Person</h2>
          <div className="gold-rule mt-4" />
          <address className="mt-6 space-y-2 text-sm not-italic leading-relaxed text-muted-foreground">
            <p>{s.address}</p>
            <p>Phone: {s.phone}</p>
            <p>Email: {s.email}</p>
            <p>Store Hours: {s.hours}</p>
            <p>Payments accepted: Cash, Debit Card and UPI</p>
          </address>
          <div className="mt-7 flex gap-3">
            <Link to="/contact"><Button>Contact Us</Button></Link>
            <Link to="/shop"><Button variant="outline">Shop the Collection</Button></Link>
          </div>
        </div>
        <img src={IMG.luxury} alt="Detail of premium silk fabric" loading="lazy" className="h-96 w-full rounded-xl object-cover shadow-soft" />
      </section>
    </SiteLayout>
  );
}
