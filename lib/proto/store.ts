"use client";

import { useSyncExternalStore } from "react";
import {
  buildMessage,
  createSeed,
  isFull,
  type Customer,
  type ProtoState,
  type Shop,
} from "./model";

const KEY = "glyph-proto-v1";
const listeners = new Set<() => void>();
let cache: ProtoState | null = null;

function load(): ProtoState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProtoState;
      if (parsed && parsed.v === 1 && Array.isArray(parsed.customers)) return parsed;
    }
  } catch {
    /* storage blocked or corrupt: fall through to seed */
  }
  const seed = createSeed();
  persist(seed);
  return seed;
}

function persist(s: ProtoState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore: prototype still works in-memory */
  }
}

function commit(next: ProtoState) {
  cache = next;
  persist(next);
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ProtoState {
  if (!cache) cache = load();
  return cache;
}

/** Returns null on the server / first paint, then the real state. */
export function useProto(): ProtoState | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

/* ---------- actions ---------- */

const uid = () => Math.random().toString(36).slice(2, 9);
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

function newCode(existing: Set<string>): string {
  for (;;) {
    let c = "";
    for (let i = 0; i < 4; i++) c += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    if (!existing.has(c)) return c;
  }
}

export type StampResult = { kind: "stamp" | "full" | "redeem"; customerId: string };

/** Adds a stamp (or redeems if the card is full). Creates the customer if new. */
export function addStamp(phone: string, name: string): StampResult | null {
  const s = getSnapshot();
  const now = Date.now();
  const needed = s.shop.stampsNeeded;
  let customers = s.customers;
  let existing = customers.find((c) => c.phone === phone);
  const created = !existing;
  const prev = existing
    ? { stamps: existing.stamps, lastVisit: existing.lastVisit }
    : { stamps: 0, lastVisit: now };

  if (!existing) {
    existing = {
      id: `c${uid()}`,
      code: newCode(new Set(customers.map((c) => c.code))),
      name: name.trim(),
      phone,
      stamps: 0,
      lastVisit: now,
    };
    customers = [existing, ...customers];
  }

  const redeeming = isFull(existing.stamps, needed);
  const updated: Customer = {
    ...existing,
    stamps: redeeming ? 0 : existing.stamps + 1,
    lastVisit: now,
  };
  const kind = redeeming ? "redeem" : isFull(updated.stamps, needed) ? "full" : "stamp";
  const event = { id: `e${uid()}`, customerId: updated.id, type: redeeming ? ("redeem" as const) : ("stamp" as const), at: now };

  commit({
    ...s,
    customers: customers.map((c) => (c.id === updated.id ? updated : c)),
    events: [...s.events, event],
    lastWa: { customerId: updated.id, code: updated.code, text: buildMessage(kind, s.shop, updated), at: now },
    undo: { eventId: event.id, customerId: updated.id, type: event.type, created, prev },
  });
  return { kind, customerId: updated.id };
}

/** Reverts the most recent stamp/redeem (single level). Returns the customer's name or null. */
export function undoLast(): Customer | null {
  const s = getSnapshot();
  const u = s.undo;
  if (!u) return null;
  const target = s.customers.find((c) => c.id === u.customerId);
  commit({
    ...s,
    customers: u.created
      ? s.customers.filter((c) => c.id !== u.customerId)
      : s.customers.map((c) => (c.id === u.customerId ? { ...c, ...u.prev } : c)),
    events: s.events.filter((e) => e.id !== u.eventId),
    lastWa: null,
    undo: null,
  });
  return target ?? null;
}

export function saveShop(patch: Partial<Shop>) {
  const s = getSnapshot();
  commit({ ...s, shop: { ...s.shop, ...patch } });
}

export function resetDemo() {
  commit(createSeed());
}
