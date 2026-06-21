import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16",
        centered && "text-center",
        className
      )}
    >
      <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
        {label}
      </span>
      <h2
        className="font-[family-name:var(--font-dm-sans)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F4F5] leading-tight mt-3"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-[#71717A] max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
