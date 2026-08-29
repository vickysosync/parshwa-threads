import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ADMIN_CREDENTIALS,
  BANNERS,
  CATEGORIES,
  CUSTOMERS,
  HOMEPAGE_SECTIONS,
  OFFERS,
  ORDERS,
  PRODUCTS,
  REVIEWS,
  SETTINGS,
  STORE_INFO,
  type Banner,
  type Category,
  type Customer,
  type Offer,
  type Order,
  type Product,
  type Review,
} from "@/data/mock";

const KEY = "parshwa:v1";

export type CartLine = { id: string; qty: number; size?: string | undefined; color?: string | undefined };
export type Toast = { id: number; message: string; type: "success" | "error" | "info" };

type State = {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  offers: Offer[];
  reviews: Review[];
  orders: Order[];
  customers: Customer[];
  cart: CartLine[];
  wishlist: string[];
  storeInfo: typeof STORE_INFO;
  sections: typeof HOMEPAGE_SECTIONS;
  settings: typeof SETTINGS;
  admin: boolean;
};

const initialState: State = {
  products: PRODUCTS,
  categories: CATEGORIES,
  banners: BANNERS,
  offers: OFFERS,
  reviews: REVIEWS,
  orders: ORDERS,
  customers: CUSTOMERS,
  cart: [],
  wishlist: [],
  storeInfo: STORE_INFO,
  sections: HOMEPAGE_SECTIONS,
  settings: SETTINGS,
  admin: false,
};

type Ctx = {
  state: State;
  ready: boolean;
  set: <K extends keyof State>(key: K, value: State[K]) => void;
  toasts: Toast[];
  toast: (message: string, type?: Toast["type"]) => void;
  addToCart: (id: string, qty?: number, size?: string, color?: string) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  cartLines: (CartLine & { product: Product })[];
  totals: { subtotal: number; discount: number; shipping: number; total: number };
  placeOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const set = useCallback(<K extends keyof State>(key: K, value: State[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);

  const toast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1, size?: string, color?: string) => {
      setState((s) => {
        const existing = s.cart.find((c) => c.id === id);
        const cart = existing
          ? s.cart.map((c) => (c.id === id ? { ...c, qty: c.qty + qty, size: size ?? c.size, color: color ?? c.color } : c))
          : [...s.cart, { id, qty, size, color }];
        return { ...s, cart };
      });
      toast("Added to your shopping bag");
    },
    [toast],
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setState((s) => ({ ...s, cart: s.cart.filter((c) => c.id !== id) }));
      toast("Removed from bag", "info");
    },
    [toast],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

  const toggleWishlist = useCallback(
    (id: string) => {
      setState((s) => {
        const has = s.wishlist.includes(id);
        return { ...s, wishlist: has ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] };
      });
      toast("Wishlist updated", "info");
    },
    [toast],
  );

  const cartLines = useMemo(
    () =>
      state.cart
        .map((c) => {
          const product = state.products.find((p) => p.id === c.id);
          return product ? { ...c, product } : null;
        })
        .filter(Boolean) as (CartLine & { product: Product })[],
    [state.cart, state.products],
  );

  const totals = useMemo(() => {
    const subtotal = cartLines.reduce((n, l) => n + l.product.price * l.qty, 0);
    const discount = cartLines.reduce(
      (n, l) => n + Math.max(0, l.product.originalPrice - l.product.price) * l.qty,
      0,
    );
    const shipping =
      subtotal === 0 || subtotal >= state.settings.freeShippingAbove ? 0 : state.settings.shippingFee;
    return { subtotal, discount, shipping, total: subtotal + shipping };
  }, [cartLines, state.settings]);

  const placeOrder = useCallback((o: Omit<Order, "id" | "date" | "status">) => {
    const order: Order = {
      ...o,
      id: `PC-${Math.floor(100000 + Math.random() * 899999)}`,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
    };
    setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
    return order;
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const ok =
        email.trim().toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
      if (ok) setState((s) => ({ ...s, admin: true }));
      return ok;
    },
    [],
  );

  const logout = useCallback(() => setState((s) => ({ ...s, admin: false })), []);

  const value: Ctx = {
    state,
    ready,
    set,
    toasts,
    toast,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    cartCount: state.cart.reduce((n, c) => n + c.qty, 0),
    cartLines,
    totals,
    placeOrder,
    login,
    logout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const discountPct = (price: number, original: number) =>
  original > price ? Math.round(((original - price) / original) * 100) : 0;
