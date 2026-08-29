import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}

export function PageHeader({
  title,
  crumb,
  subtitle,
}: {
  title: string;
  crumb: string;
  subtitle?: string | undefined;
}) {
  return (
    <div className="border-b border-border bg-secondary/50">
      <div className="container-x py-12 text-center">
        <p className="eyebrow text-gold">{crumb}</p>
        <h1 className="mt-3 text-4xl font-medium text-ink">{title}</h1>
        <div className="gold-rule mx-auto mt-4" />
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
