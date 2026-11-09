// Prototype-only data model. Everything lives in the browser (localStorage).

export type HoursRow = { label: string; time: string };

export type Shop = {
  name: string;
  slug: string;
  color: string;
  stampsNeeded: number;
  reward: string;
  hours: HoursRow[];
  address: string;
};

export type Customer = {
  id: string;
  code: string; // short id used in the card link, e.g. glyph.id/k/8x2f
  name: string;
  phone: string; // digits only, e.g. 081234567801
  stamps: number;
  lastVisit: number; // epoch ms
};

export type ProtoEvent = {
  id: string;
  customerId: string;
  type: "stamp" | "redeem";
  at: number;
};

export type WaMessage = {
  customerId: string;
  code: string;
  text: string;
  at: number;
};

export type UndoInfo = {
  eventId: string;
  customerId: string;
  type: "stamp" | "redeem";
  created: boolean; // customer was created by this stamp
  prev: { stamps: number; lastVisit: number };
};

export type ProtoState = {
  v: 1;
  shop: Shop;
  customers: Customer[];
  events: ProtoEvent[];
  lastWa: WaMessage | null;
  undo: UndoInfo | null;
};

export const DAY = 24 * 60 * 60 * 1000;
export const WA_DOMAIN = "glyph.id/k/";

/* ---------- seed ---------- */

const SEED_CUSTOMERS: Array<[code: string, name: string, phone: string, stamps: number, daysAgo: number]> = [
  ["8x2f", "Dewi Anggraini", "081234567801", 4, 0],
  ["q7rz", "Rizky Pratama", "081234567802", 10, 2], // full card
  ["h3nd", "Hendra Gunawan", "081234567803", 9, 0],
  ["b2di", "Budi Santoso", "081234567804", 7, 1],
  ["d9mz", "Dimas Aditya", "081234567805", 8, 9],
  ["tn6o", "Tono Sutrisno", "081234567806", 6, 20],
  ["fj5r", "Fajar Nugroho", "081234567807", 5, 5],
  ["ek3o", "Eko Prasetyo", "081234567808", 3, 12],
  ["ag2s", "Agus Wijaya", "081234567809", 2, 3],
  ["yg1a", "Yoga Permana", "081234567810", 1, 6],
];

export function createSeed(now = Date.now()): ProtoState {
  const customers: Customer[] = SEED_CUSTOMERS.map(([code, name, phone, stamps, d], i) => ({
    id: `c${i + 1}`,
    code,
    name,
    phone,
    stamps,
    lastVisit: now - d * DAY - (i % 4) * 3600_000,
  }));

  const events: ProtoEvent[] = [];
  customers.forEach((c) => {
    for (let i = 0; i < c.stamps; i++) {
      events.push({ id: `e-${c.id}-${i}`, customerId: c.id, type: "stamp", at: c.lastVisit - i * 2 * DAY });
    }
  });
  // two rewards redeemed this week (earlier cards of Agus and Yoga)
  events.push({ id: "r1", customerId: "c9", type: "redeem", at: now - 5 * DAY });
  events.push({ id: "r2", customerId: "c10", type: "redeem", at: now - 6 * DAY });

  return {
    v: 1,
    shop: {
      name: "Barber Joko",
      slug: "barberjoko",
      color: "#D9480F",
      stampsNeeded: 10,
      reward: "Potong rambut gratis",
      hours: [
        { label: "Senin – Sabtu", time: "09.00 – 21.00" },
        { label: "Minggu", time: "10.00 – 18.00" },
      ],
      address: "Jl. Kebon Jeruk Raya No. 12, Jakarta Barat",
    },
    customers,
    events,
    lastWa: null,
    undo: null,
  };
}

/* ---------- helpers ---------- */

export function formatPhone(digits: string): string {
  const parts = [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8)].filter(Boolean);
  return parts.join(" ");
}

export function isValidPhone(digits: string): boolean {
  return /^08\d{8,11}$/.test(digits);
}

export function displayName(c: Pick<Customer, "name">): string {
  return c.name.trim() || "Tanpa nama";
}

export function firstName(c: Pick<Customer, "name">): string {
  return c.name.trim().split(/\s+/)[0] || "";
}

export function isFull(stamps: number, needed: number): boolean {
  return stamps >= needed;
}

export function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function readableOn(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "#ffffff";
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.4 ? "#111827" : "#ffffff";
}

export function relativeDay(at: number, now = Date.now()): string {
  const days = Math.floor((startOfDay(now) - startOfDay(at)) / DAY);
  if (days <= 0) return "Hari ini";
  if (days === 1) return "Kemarin";
  if (days < 30) return `${days} hari lalu`;
  return new Date(at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function startOfDay(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function clockTime(at: number): string {
  return new Date(at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export type MessageKind = "stamp" | "full" | "redeem";

export function buildMessage(kind: MessageKind, shop: Shop, c: Customer): string {
  const link = `${WA_DOMAIN}${c.code}`;
  const n = shop.stampsNeeded;
  const reward = lowerFirst(shop.reward);
  if (kind === "redeem") {
    return `Reward ${reward} sudah ditukar. Terima kasih sudah setia di ${shop.name}! Kartu barumu mulai dari 0 dari ${n} stempel. Lihat kartumu: ${link}`;
  }
  if (kind === "full") {
    return `Selamat! Kartu stempelmu di ${shop.name} sudah penuh (${n} dari ${n}). Tunjukkan pesan ini ke kasir untuk ${reward}. Lihat kartumu: ${link}`;
  }
  const have = Math.min(c.stamps, n);
  return `Terima kasih sudah datang ke ${shop.name}! Kamu punya ${have} dari ${n} stempel. ${n - have} lagi untuk ${reward}. Lihat kartumu: ${link}`;
}

export function weekStats(s: ProtoState, now = Date.now()) {
  const since = now - 7 * DAY;
  return {
    customers: s.customers.filter((c) => c.lastVisit >= since).length,
    stamps: s.events.filter((e) => e.type === "stamp" && e.at >= since).length,
    rewards: s.events.filter((e) => e.type === "redeem" && e.at >= since).length,
  };
}
