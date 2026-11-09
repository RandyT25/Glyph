import { Check, Gift } from "lucide-react";
import { readableOn } from "@/lib/proto/model";

type Props = {
  total: number;
  filled: number;
  color: string;
  size?: "sm" | "lg";
};

export function StampGrid({ total, filled, color, size = "lg" }: Props) {
  const cols = size === "lg" ? 5 : total <= 10 ? total : Math.ceil(total / 2);
  const ink = readableOn(color);
  const icon = size === "lg" ? "size-1/2" : "size-3/5";
  return (
    <div
      className={`grid ${size === "lg" ? "gap-3" : "gap-1.5"}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      role="img"
      aria-label={`${Math.min(filled, total)} dari ${total} stempel`}
    >
      {Array.from({ length: total }, (_, i) => {
        const on = i < filled;
        const last = i === total - 1;
        const Icon = last ? Gift : Check;
        return (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-full border-2 transition-colors"
            style={
              on
                ? { background: color, borderColor: color, color: ink }
                : { borderColor: `${color}66`, borderStyle: "dashed", color: `${color}99`, background: `${color}0f` }
            }
          >
            {(on || last) && <Icon className={icon} strokeWidth={on ? 3 : 2} />}
          </div>
        );
      })}
    </div>
  );
}
