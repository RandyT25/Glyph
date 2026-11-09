"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Column, Loading } from "@/components/proto/column";
import { CardView } from "@/components/proto/card-view";
import { useToast } from "@/components/proto/use-toast";
import { useProto } from "@/lib/proto/store";
import { displayName } from "@/lib/proto/model";

function CardPage() {
  const code = useSearchParams().get("c");
  const state = useProto();
  const { show, node } = useToast();
  if (!state) return <Loading />;

  const customer = state.customers.find((c) => c.code === code);
  if (!customer) {
    return (
      <Column>
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="font-heading text-xl font-bold">Kartu tidak ditemukan</p>
          <p className="mt-2 text-slate-500">Tautan ini tidak cocok dengan kartu mana pun di data demo.</p>
          <Link href="/prototype" className="mt-6 flex h-12 items-center rounded-xl bg-slate-900 px-6 font-semibold text-white">
            Ke menu prototipe
          </Link>
        </div>
      </Column>
    );
  }

  return (
    <Column className="bg-slate-50!">
      {node}
      <CardView
        shop={state.shop}
        customerName={displayName(customer) === "Tanpa nama" ? "Pelanggan setia" : displayName(customer)}
        stamps={customer.stamps}
        onChatShop={() => show("Prototipe: di versi asli ini membuka WhatsApp ke toko")}
      />
      <div className="flex-1" />
      <Link href="/prototype" className="flex h-12 items-center justify-center text-sm text-slate-500 underline underline-offset-4">
        ← Kembali ke menu prototipe
      </Link>
    </Column>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CardPage />
    </Suspense>
  );
}
