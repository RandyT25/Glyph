import { Check, Coffee, Droplets, Flame, Heart, Scissors, Shirt, Star, type LucideIcon } from "lucide-react";
import type { StampIconId } from "@/lib/proto/model";

export const STAMP_ICONS: Record<StampIconId, { Icon: LucideIcon; label: string }> = {
  check: { Icon: Check, label: "Centang" },
  scissors: { Icon: Scissors, label: "Gunting" },
  coffee: { Icon: Coffee, label: "Kopi" },
  shirt: { Icon: Shirt, label: "Baju" },
  droplets: { Icon: Droplets, label: "Air" },
  star: { Icon: Star, label: "Bintang" },
  heart: { Icon: Heart, label: "Hati" },
  flame: { Icon: Flame, label: "Api" },
};
