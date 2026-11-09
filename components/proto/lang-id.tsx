"use client";

import { useEffect } from "react";

/** Prototype UI is Bahasa Indonesia; the root layout says lang="en". */
export function LangId() {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = "id";
    return () => {
      document.documentElement.lang = prev;
    };
  }, []);
  return null;
}
