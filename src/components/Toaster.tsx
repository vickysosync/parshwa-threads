import { useStore } from "@/lib/store";

export function Toaster() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-200 flex w-[min(20rem,90vw)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`rise pointer-events-auto rounded-md border-l-4 bg-card px-4 py-3 text-sm shadow-lift ${
            t.type === "error"
              ? "border-destructive"
              : t.type === "info"
                ? "border-gold"
                : "border-success"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
