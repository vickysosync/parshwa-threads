import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PARSHWA COLLECTION | Kharadi Road, Pune" },
      {
        name: "description",
        content:
          "Call +91 90282 86574 or visit PARSHWA COLLECTION at Sangharsh Chowk, Kharadi Rd, Pune. Open 10:00 AM to 9:00 PM.",
      },
      { property: "og:title", content: "Contact PARSHWA COLLECTION" },
      { property: "og:description", content: "Reach our Kharadi boutique for styling help and store visits." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { state, toast } = useStore();
  const s = state.storeInfo;
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const upd = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <SiteLayout>
      <PageHeader crumb="Home / Contact" title="Contact Us" subtitle="We'd love to help you find your next favourite outfit." />

      <div className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <div className="rounded-lg border border-border/70 bg-card p-7 shadow-soft">
          <h2 className="font-display text-2xl text-primary">{s.name}</h2>
          <div className="gold-rule mt-3" />
          <address className="mt-5 space-y-4 text-sm not-italic leading-relaxed">
            <div>
              <p className="eyebrow text-muted-foreground">Address</p>
              <p className="mt-1">{s.address}</p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Phone</p>
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="mt-1 block text-primary">{s.phone}</a>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Email</p>
              <a href={`mailto:${s.email}`} className="mt-1 block text-primary">{s.email}</a>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Store Hours</p>
              <p className="mt-1">{s.hours}</p>
            </div>
          </address>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block"
          >
            <Button variant="outline">Get Directions</Button>
          </a>
        </div>

        <form
          className="rounded-lg border border-border/70 bg-card p-7 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            toast("Thank you! Our team will get back to you shortly.");
          }}
        >
          <h2 className="font-display text-2xl">Send a Message</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cname">Name</Label>
              <Input id="cname" required value={form.name} onChange={(e) => upd("name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="cemail">Email</Label>
              <Input id="cemail" type="email" required value={form.email} onChange={(e) => upd("email", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="cphone">Phone</Label>
              <Input id="cphone" value={form.phone} onChange={(e) => upd("phone", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="csub">Subject</Label>
              <Input id="csub" value={form.subject} onChange={(e) => upd("subject", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="cmsg">Message</Label>
              <Textarea id="cmsg" rows={5} required value={form.message} onChange={(e) => upd("message", e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full sm:w-auto">Send Message</Button>
        </form>
      </div>
    </SiteLayout>
  );
}
