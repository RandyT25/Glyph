"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await fetch("https://glyph-app-sigma.vercel.app/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="text-sm text-[#6366F1] font-medium">You&apos;re on the list. ✓</p>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-[#111113] border border-[#27272A] rounded-lg px-3 py-2 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#4F46E5] transition-colors min-w-0"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-[#4F46E5] hover:bg-[#6366F1] disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
      >
        {state === "loading" ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
