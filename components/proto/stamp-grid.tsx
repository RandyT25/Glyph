import { Gift } from "lucide-react";
import { STAMP_ICONS } from "./stamp-icons";
import { readableOn, DEFAULT_LOOK, type StampIconId, type StampShape } from "@/lib/proto/model";

type Props = {
  total: number;
  filled: number;
  color: string;
  size?: "sm" | "lg";
  icon?: StampIconId;
  image?: string | null; // owner's own stamp artwork (data URL)
  shape?: StampShape;
  /** Card sits on the brand colour: invert so stamps stay readable. */
  onColor?: boolean;
};

export function StampGrid({
  total,
  filled,
  color,
  size = "lg",
  icon = DEFAULT_LOOK.stampIcon,
  image = null,
  shape = "circle",
  onColor = false,
}: Props) {
  const cols = size === "lg" ? 5 : total <= 10 ? total : Math.ceil(total / 2);
  const Mark = STAMP_ICONS[icon].Icon;
  const ink = readableOn(color);
  const radius = shape === "circle" ? "rounded-full" : "rounded-[22%]";
  const mark = size === "lg" ? "size-1/2" : "size-3/5";

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
        const base = `relative flex aspect-square items-center justify-center overflow-hidden border-2 transition-colors ${radius}`;

        if (on && image && !last) {
          return (
            <div key={i} className={base} style={{ borderColor: onColor ? "#fff" : color, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="size-full object-cover" />
            </div>
          );
        }

        const Icon = last ? Gift : Mark;
        const style = on
          ? onColor
            ? { background: "#fff", borderColor: "#fff", color }
            : { background: color, borderColor: color, color: ink }
          : onColor
            ? { borderColor: "rgba(255,255,255,0.6)", borderStyle: "dashed", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)" }
            : { borderColor: `${color}66`, borderStyle: "dashed", color: `${color}99`, background: `${color}0f` };

        return (
          <div key={i} className={base} style={style}>
            {image && !on && !last ? (
              // empty slot previews the owner's artwork, faded
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="size-full object-cover opacity-20 grayscale" />
            ) : (
              (on || last) && <Icon className={mark} strokeWidth={on ? 2.5 : 2} />
            )}
          </div>
        );
      })}
    </div>
  );
}
