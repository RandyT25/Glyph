"use client";

import { motion } from "framer-motion";
import { Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "customer" | "merchant";

interface DemoTabsProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: typeof Smartphone; sub: string }[] = [
  { id: "customer", label: "Customer App", icon: Smartphone, sub: "The loyalty experience" },
  { id: "merchant", label: "Merchant Dashboard", icon: Monitor, sub: "The business console" },
];

export default function DemoTabs({ active, onChange }: DemoTabsProps) {
  return (
    <div className="flex gap-2 p-1 bg-[#111113] border border-[#27272A] rounded-2xl">
      {tabs.map(({ id, label, icon: Icon, sub }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            "relative flex items-center gap-3 px-5 py-3 rounded-xl transition-colors duration-200 cursor-pointer flex-1",
            active === id ? "text-white" : "text-[#71717A] hover:text-[#A1A1AA]"
          )}
        >
          {active === id && (
            <motion.div
              layoutId="demo-tab-bg"
              className="absolute inset-0 rounded-xl bg-[#18181B] border border-[#4F46E5]/20"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <div className="relative flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors", active === id ? "bg-[#4F46E5]/10" : "bg-[#18181B]")}>
              <Icon size={16} className={active === id ? "text-[#6366F1]" : "text-[#52525B]"} />
            </div>
            <div className="text-left hidden sm:block">
              <p className={cn("text-sm font-semibold leading-tight", active === id ? "text-white" : "text-[#A1A1AA]")}>{label}</p>
              <p className="text-xs text-[#71717A] mt-0.5">{sub}</p>
            </div>
            <p className={cn("text-sm font-semibold sm:hidden", active === id ? "text-white" : "text-[#A1A1AA]")}>{label}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
