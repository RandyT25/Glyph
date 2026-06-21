"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  Star,
  Activity,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import GlyphMark from "@/components/common/glyph-mark";

type Tab = "overview" | "campaigns" | "customers" | "analytics";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "customers", label: "Customers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const statCards = [
  { label: "Active Members", value: "2,847", change: "+12%", icon: Users, color: "#4F46E5" },
  { label: "Stamps Today", value: "143", change: "+8%", icon: Star, color: "#F59E0B" },
  { label: "Retention Rate", value: "94%", change: "+3%", icon: TrendingUp, color: "#10B981" },
  { label: "Revenue Impact", value: "$14.2K", change: "+21%", icon: Activity, color: "#8B5CF6" },
];

const recentActivity = [
  { name: "Sophie L.", action: "Completed stamp card", time: "2 min ago", reward: true },
  { name: "James O.", action: "Earned stamp #6", time: "8 min ago", reward: false },
  { name: "Mei T.", action: "First visit", time: "15 min ago", reward: false },
  { name: "Carlos R.", action: "Completed stamp card", time: "22 min ago", reward: true },
  { name: "Aisha B.", action: "Earned stamp #4", time: "35 min ago", reward: false },
];

const campaigns = [
  {
    name: "Summer Coffee Card",
    type: "Stamp Card",
    status: "Active",
    members: 1204,
    completions: 87,
  },
  {
    name: "Loyalty Points — All Items",
    type: "Points",
    status: "Active",
    members: 1643,
    completions: 156,
  },
  {
    name: "Winter Pastry Bonus",
    type: "Time-Bonus",
    status: "Paused",
    members: 432,
    completions: 23,
  },
];

const topCustomers = [
  { name: "Sophie Laurent", initials: "SL", visits: 47, stamps: 47, tier: "VIP", since: "Jan 2025" },
  { name: "James Okafor", initials: "JO", visits: 31, stamps: 31, tier: "Gold", since: "Mar 2025" },
  { name: "Mei Tanaka", initials: "MT", visits: 28, stamps: 28, tier: "Gold", since: "Apr 2025" },
  { name: "Carlos Rivera", initials: "CR", visits: 24, stamps: 24, tier: "Silver", since: "Jun 2025" },
  { name: "Aisha Bello", initials: "AB", visits: 19, stamps: 19, tier: "Silver", since: "Aug 2025" },
];

const retentionData = [
  { label: "Week 1", value: 98 },
  { label: "Week 2", value: 89 },
  { label: "Week 3", value: 82 },
  { label: "Week 4", value: 76 },
  { label: "Week 6", value: 71 },
  { label: "Week 8", value: 65 },
];

const heatmapData = [
  [2, 3, 5, 8, 12, 9, 4],
  [3, 6, 14, 22, 28, 18, 7],
  [4, 9, 18, 30, 38, 25, 10],
  [2, 7, 16, 26, 34, 22, 9],
  [3, 8, 17, 28, 36, 24, 10],
  [1, 4, 8, 14, 18, 12, 5],
];

function getHeatColor(val: number): string {
  const max = 38;
  const pct = val / max;
  if (pct < 0.15) return "#27272A";
  if (pct < 0.35) return "#312E81";
  if (pct < 0.6) return "#4338CA";
  if (pct < 0.8) return "#4F46E5";
  return "#6366F1";
}

const timeLabels = ["12a", "4a", "8a", "12p", "4p", "8p", "11p"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPreviewPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <main className="bg-[#09090B] min-h-screen">
      {/* Top nav */}
      <div className="border-b border-[#27272A] bg-[#09090B] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <GlyphMark size={20} />
            <span className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-sm">
              Glyph
            </span>
            <span className="text-[#27272A] mx-1">/</span>
            <span className="text-sm text-[#71717A]">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#52525B]">Maison Café</span>
            <div className="w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">MC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 border-r border-[#27272A] min-h-[calc(100vh-3.5rem)] py-6 px-3 gap-1 sticky top-14">
          {[
            { label: "Overview", icon: LayoutDashboard, tab: "overview" },
            { label: "Campaigns", icon: Megaphone, tab: "campaigns" },
            { label: "Customers", icon: Users, tab: "customers" },
            { label: "Analytics", icon: BarChart3, tab: "analytics" },
            { label: "Settings", icon: Settings, tab: null },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => item.tab && setActiveTab(item.tab as Tab)}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer w-full text-left",
                item.tab === activeTab
                  ? "bg-[#4F46E5] text-white"
                  : "text-[#71717A] hover:text-white hover:bg-[#18181B]",
              ].join(" ")}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div className="flex-1 px-6 py-8 overflow-x-hidden">
          {/* Mobile tabs */}
          <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer",
                  tab.id === activeTab
                    ? "bg-[#4F46E5] text-white"
                    : "bg-[#111113] border border-[#27272A] text-[#71717A]",
                ].join(" ")}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <h1 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5] mb-6">
                  Good morning, Maison Café
                </h1>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="rounded-xl bg-[#111113] border border-[#27272A] p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-[#52525B] uppercase tracking-wide">
                            {stat.label}
                          </span>
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: `${stat.color}20` }}
                          >
                            <Icon size={14} style={{ color: stat.color }} />
                          </div>
                        </div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5]">
                          {stat.value}
                        </p>
                        <p className="text-xs text-[#10B981] mt-1">{stat.change} this month</p>
                      </div>
                    );
                  })}
                </div>

                {/* Bar chart */}
                <div className="rounded-xl bg-[#111113] border border-[#27272A] p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5]">
                      Stamps This Week
                    </h2>
                    <span className="text-xs text-[#52525B]">Jun 14 – Jun 21</span>
                  </div>
                  <div className="flex items-end gap-3 h-36">
                    {[62, 89, 74, 143, 112, 97, 45].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full rounded-t-md transition-all duration-500"
                          style={{
                            height: `${(val / 143) * 100}%`,
                            background:
                              i === 3
                                ? "linear-gradient(to top, #3730A3, #4F46E5)"
                                : "linear-gradient(to top, #1e1e22, #27272A)",
                          }}
                        />
                        <span className="text-[9px] text-[#52525B]">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="rounded-xl bg-[#111113] border border-[#27272A] p-6">
                  <h2 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] mb-5">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {recentActivity.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-bold text-[#71717A]">
                            {item.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#F4F4F5] font-medium">{item.name}</p>
                          <p className="text-xs text-[#71717A]">{item.action}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.reward && (
                            <span className="text-xs bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/20 px-2 py-0.5 rounded-full font-medium">
                              Reward
                            </span>
                          )}
                          <span className="text-xs text-[#52525B]">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "campaigns" && (
              <motion.div
                key="campaigns"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <h1 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5] mb-6">
                  Campaigns
                </h1>
                <div className="space-y-4">
                  {campaigns.map((c) => (
                    <div
                      key={c.name}
                      className="rounded-xl bg-[#111113] border border-[#27272A] p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] mb-1">
                            {c.name}
                          </h3>
                          <span className="text-xs text-[#52525B] bg-[#18181B] border border-[#27272A] px-2 py-0.5 rounded-full">
                            {c.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {c.status === "Active" ? (
                            <CheckCircle size={14} className="text-[#10B981]" />
                          ) : c.status === "Paused" ? (
                            <Clock size={14} className="text-[#F59E0B]" />
                          ) : (
                            <XCircle size={14} className="text-red-400" />
                          )}
                          <span
                            className={[
                              "text-xs font-medium",
                              c.status === "Active"
                                ? "text-[#10B981]"
                                : c.status === "Paused"
                                ? "text-[#F59E0B]"
                                : "text-red-400",
                            ].join(" ")}
                          >
                            {c.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-8 mt-4 pt-4 border-t border-[#27272A]">
                        <div>
                          <p className="text-xs text-[#52525B] mb-1">Members</p>
                          <p className="text-lg font-bold text-[#F4F4F5]">{c.members.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#52525B] mb-1">Completions</p>
                          <p className="text-lg font-bold text-[#F4F4F5]">{c.completions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#52525B] mb-1">Rate</p>
                          <p className="text-lg font-bold text-[#F59E0B]">
                            {((c.completions / c.members) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "customers" && (
              <motion.div
                key="customers"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <h1 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5] mb-6">
                  Top Customers
                </h1>
                <div className="rounded-xl bg-[#111113] border border-[#27272A] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#27272A]">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#52525B] uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#52525B] uppercase tracking-wider hidden sm:table-cell">
                          Visits
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#52525B] uppercase tracking-wider hidden md:table-cell">
                          Stamps
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#52525B] uppercase tracking-wider">
                          Tier
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#52525B] uppercase tracking-wider hidden lg:table-cell">
                          Member Since
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]">
                      {topCustomers.map((customer) => (
                        <tr key={customer.name} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-[#6366F1]">
                                  {customer.initials}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-[#F4F4F5]">
                                {customer.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="text-sm text-[#A1A1AA]">{customer.visits}</span>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="text-sm text-[#A1A1AA]">{customer.stamps}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={[
                                "text-xs font-semibold px-2 py-1 rounded-full",
                                customer.tier === "VIP"
                                  ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/20"
                                  : customer.tier === "Gold"
                                  ? "bg-[#FCD34D]/15 text-[#FCD34D] border border-[#FCD34D]/20"
                                  : "bg-[#71717A]/15 text-[#71717A] border border-[#71717A]/20",
                              ].join(" ")}
                            >
                              {customer.tier}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <span className="text-sm text-[#52525B]">{customer.since}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <h1 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5] mb-6">
                  Analytics
                </h1>

                {/* Retention chart */}
                <div className="rounded-xl bg-[#111113] border border-[#27272A] p-6 mb-6">
                  <h2 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] mb-6">
                    Customer Retention Curve
                  </h2>
                  <div className="relative">
                    {/* Y axis labels */}
                    <div className="flex gap-4">
                      <div className="flex flex-col justify-between text-right w-8 pb-6">
                        {[100, 75, 50, 25, 0].map((v) => (
                          <span key={v} className="text-[9px] text-[#52525B]">{v}%</span>
                        ))}
                      </div>
                      {/* Bars */}
                      <div className="flex-1 flex items-end gap-4 h-40">
                        {retentionData.map((d) => (
                          <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                            <div
                              className="w-full rounded-t-md"
                              style={{
                                height: `${d.value}%`,
                                background: `linear-gradient(to top, #312E81, #4F46E5)`,
                                opacity: 0.4 + (d.value / 100) * 0.6,
                              }}
                            />
                            <span className="text-[9px] text-[#52525B]">{d.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hourly heatmap */}
                <div className="rounded-xl bg-[#111113] border border-[#27272A] p-6">
                  <h2 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] mb-4">
                    Hourly Activity Heatmap
                  </h2>
                  <div className="space-y-2">
                    {/* Time labels */}
                    <div className="flex gap-1.5 pl-10">
                      {timeLabels.map((t) => (
                        <div key={t} className="flex-1 text-center text-[8px] text-[#52525B]">
                          {t}
                        </div>
                      ))}
                    </div>
                    {/* Grid */}
                    {heatmapData.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex items-center gap-1.5">
                        <span className="w-8 text-right text-[9px] text-[#52525B] flex-shrink-0">
                          {dayLabels[rowIdx]}
                        </span>
                        {row.map((val, colIdx) => (
                          <div
                            key={colIdx}
                            className="flex-1 aspect-square rounded-sm"
                            style={{ background: getHeatColor(val) }}
                            title={`${dayLabels[rowIdx]} ${timeLabels[colIdx]}: ${val} stamps`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 justify-end">
                    <span className="text-[9px] text-[#52525B]">Less</span>
                    {["#27272A", "#312E81", "#4338CA", "#4F46E5", "#6366F1"].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
                    ))}
                    <span className="text-[9px] text-[#52525B]">More</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
