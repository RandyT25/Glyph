import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "indigo" | "ember" | "ghost";
  className?: string;
}

const variantClasses = {
  indigo: "bg-[#4F46E5]/15 text-[#6366F1] border border-[#4F46E5]/25",
  ember: "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25",
  ghost: "bg-[#E0E7FF]/10 text-[#E0E7FF] border border-[#E0E7FF]/20",
};

export default function Badge({
  children,
  variant = "indigo",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
