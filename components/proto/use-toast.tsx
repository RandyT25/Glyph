"use client";

import { useCallback, useRef, useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((m: string) => {
    clearTimeout(timer.current);
    setMsg(m);
    timer.current = setTimeout(() => setMsg(null), 2600);
  }, []);
  const node = msg ? (
    <div
      role="status"
      className="proto-slide fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[398px] -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white shadow-xl"
    >
      {msg}
    </div>
  ) : null;
  return { show, node };
}
