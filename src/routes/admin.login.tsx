import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Toaster } from "@/components/Toaster";
import { useStore } from "@/lib/store";
import { IMG } from "@/data/mock";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | PARSHWA COLLECTION" },
      { name: "description", content: "Boutique administration login for PARSHWA COLLECTION staff." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Login | PARSHWA COLLECTION" },
      { property: "og:description", content: "Staff access to the PARSHWA COLLECTION admin panel." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, toast } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={IMG.hero} alt="PARSHWA COLLECTION boutique" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute bottom-12 left-12 text-background">
          <p className="font-display text-3xl tracking-[0.18em] text-gold">PARSHWA</p>
          <p className="text-[0.62rem] tracking-[0.42em]">COLLECTION</p>
          <p className="mt-4 max-w-xs text-sm text-background/70">
            Manage products, orders, banners and homepage content from one place.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-16">
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              if (login(email, password)) {
                toast("Welcome back, admin");
                navigate({ to: "/admin/dashboard" });
              } else {
                setError("Invalid email or password. Please try again.");
                toast("Invalid credentials", "error");
              }
            }, 600);
          }}
        >
          <p className="eyebrow text-gold">Admin Panel</p>
          <h1 className="mt-3 font-display text-3xl">Sign In</h1>
          <div className="gold-rule mt-4" />

          <div className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-md border-l-4 border-destructive bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </Button>

          <div className="mt-6 rounded-md bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
            <p className="font-semibold text-ink">Demo credentials</p>
            <p className="mt-1">admin@parshwacollection.com</p>
            <p>admin123</p>
          </div>

          <Link to="/" className="mt-6 block text-center text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">
            ← Back to store
          </Link>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
