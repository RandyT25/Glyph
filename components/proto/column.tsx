import type { ReactNode } from "react";

/** Phone-width column, centred on desktop. */
export function Column({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className={`mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white shadow-xl ${className}`}>
      {children}
    </main>
  );
}

export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white/95 px-4 pb-4 pt-3 backdrop-blur">
      {children}
    </div>
  );
}

export function Loading() {
  return (
    <Column>
      <div className="flex flex-1 items-center justify-center text-slate-400">Memuat…</div>
    </Column>
  );
}
