import React, { useState, useMemo } from "react";
import {
  LayoutGrid, Shirt, Package, Users, CalendarClock, Repeat,
  ShieldCheck, BarChart3, Settings, Bell, Search, Plus, Eye,
  MoreHorizontal, Edit3, Trash2, ChevronDown, Menu, X, Sparkles,
  CreditCard, Star, Filter, ArrowUpRight, ArrowDownRight, Lock,
  Mail, Check, LogOut, MapPin, Heart
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar,
} from "recharts";

/* ---------------------------------------------------------------------- */
/*  DESIGN TOKENS                                                          */
/* ---------------------------------------------------------------------- */
const T = {
  plum: "#3D1F49",
  plumDeep: "#2A1533",
  plumMid: "#6B3A80",
  lilac: "#9B6BB3",
  lavender: "#D7C3EA",
  blush: "#F6DCE6",
  blushSoft: "#FBEFF3",
  bg: "#FAF7F6",
  card: "#FFFFFF",
  line: "#EEE3EA",
  text: "#2E1B33",
  textMuted: "#8B7A92",
  success: "#4C9A72",
  successBg: "#E7F5EE",
  warning: "#C98A2E",
  warningBg: "#FBF0DE",
  danger: "#C1554F",
  dangerBg: "#FBE9E7",
  info: "#5A6BB3",
  infoBg: "#EAEDFB",
};

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Manrope:wght@400;500;600;700;800&display=swap');
`;

/* ---------------------------------------------------------------------- */
/*  MOCK DATA                                                              */
/* ---------------------------------------------------------------------- */
const revenueTrend = [
  { m: "Mar", v: 312000 }, { m: "Apr", v: 358000 }, { m: "May", v: 401000 },
  { m: "Jun", v: 372000 }, { m: "Jul", v: 445000 }, { m: "Aug", v: 486500 },
];

const bookingStatus = [
  { label: "Pending", count: 12 },
  { label: "Confirmed", count: 18 },
  { label: "Ready", count: 7 },
  { label: "Rented", count: 34 },
  { label: "Returned", count: 96 },
];

const dresses = [
  { name: "Aurora Pearl Gown", code: "GLM-2201", cat: "Bridal", sizes: "S · M · L", price: 18500, status: "available", grad: ["#EADFF5", "#F6DCE6"] },
  { name: "Royal Rose Evening Dress", code: "GLM-2214", cat: "Evening", sizes: "M · L", price: 12000, status: "rented", grad: ["#F3D9E6", "#D9C3EA"] },
  { name: "Celeste Bridal Gown", code: "GLM-2233", cat: "Bridal", sizes: "S · M", price: 24000, status: "available", grad: ["#F6E9EF", "#E4D3ED"] },
  { name: "Midnight Elegance", code: "GLM-2240", cat: "Formal", sizes: "M · L · XL", price: 9500, status: "cleaning", grad: ["#DED0E8", "#3D1F49"] },
  { name: "Blush Garden Dress", code: "GLM-2255", cat: "Party", sizes: "S · M", price: 7200, status: "available", grad: ["#FBEFF3", "#F6DCE6"] },
  { name: "Sapphire Evening Gown", code: "GLM-2262", cat: "Evening", sizes: "M · L", price: 14500, status: "reserved", grad: ["#D7C3EA", "#9B6BB3"] },
];

const statusMeta = {
  available: { label: "Available", bg: T.successBg, fg: T.success },
  rented: { label: "Rented", bg: T.infoBg, fg: T.info },
  reserved: { label: "Reserved", bg: T.warningBg, fg: T.warning },
  cleaning: { label: "Needs Cleaning", bg: T.dangerBg, fg: T.danger },
  pending: { label: "Pending", bg: T.warningBg, fg: T.warning },
  confirmed: { label: "Confirmed", bg: T.infoBg, fg: T.info },
  overdue: { label: "Overdue", bg: T.dangerBg, fg: T.danger },
  returned: { label: "Returned", bg: T.successBg, fg: T.success },
};

const bookings = [
  { id: "BK-1042", customer: "Sarah Fernando", dress: "Aurora Pearl Gown", event: "12 Sep 2026", requested: "05 Sep 2026", status: "pending" },
  { id: "BK-1041", customer: "Dinithi Perera", dress: "Sapphire Evening Gown", event: "14 Sep 2026", requested: "04 Sep 2026", status: "confirmed" },
  { id: "BK-1039", customer: "Amaya Silva", dress: "Celeste Bridal Gown", event: "20 Sep 2026", requested: "02 Sep 2026", status: "rented" },
  { id: "BK-1035", customer: "Nethmi Jayawardena", dress: "Royal Rose Evening Dress", event: "01 Sep 2026", requested: "24 Aug 2026", status: "overdue" },
  { id: "BK-1031", customer: "Kavindi Perera", dress: "Blush Garden Dress", event: "28 Aug 2026", requested: "20 Aug 2026", status: "returned" },
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "catalog", label: "Dress Catalog", icon: Shirt },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "customers", label: "Customers", icon: Users },
  { key: "bookings", label: "Booking Requests", icon: CalendarClock },
  { key: "rentals", label: "Rentals", icon: Repeat },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "returns", label: "Returns", icon: Repeat },
  { key: "roles", label: "Users & Roles", icon: ShieldCheck },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

/* ---------------------------------------------------------------------- */
/*  SMALL PRIMITIVES                                                       */
/* ---------------------------------------------------------------------- */
function Badge({ status }) {
  const m = statusMeta[status] || statusMeta.available;
  return (
    <span style={{
      background: m.bg, color: m.fg, fontWeight: 700, fontSize: 12,
      padding: "4px 11px", borderRadius: 999, display: "inline-block",
      letterSpacing: 0.2,
    }}>{m.label}</span>
  );
}

function GlimmerLogo({ size = 34, showText = true, dark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="dressGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C99FE0" />
            <stop offset="1" stopColor="#E8A9C4" />
          </linearGradient>
        </defs>
        <path d="M24 6 L18 12 L30 12 Z" stroke={dark ? "#fff" : T.plum} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M20 13 C14 20, 8 30, 10 41 C16 37, 20 35, 24 35 C28 35, 32 37, 38 41 C40 30, 34 20, 28 13 Z" fill="url(#dressGrad)" />
        <path d="M24 13 L24 35" stroke="#ffffff88" strokeWidth="1.4" />
        <circle cx="37" cy="12" r="1.6" fill={T.lilac} />
        <circle cx="40" cy="17" r="1" fill={T.blush} />
      </svg>
      {showText && (
        <div style={{ lineHeight: 1 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700, fontStyle: "italic",
            fontSize: size * 0.62, color: dark ? "#fff" : T.plum, letterSpacing: 0.2,
          }}>Glimmer</div>
          {size > 28 && (
            <div style={{
              fontSize: 9, letterSpacing: 2, color: dark ? T.lavender : T.textMuted,
              marginTop: 2, fontWeight: 700,
            }}>SMART DRESS RENTAL</div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Original stylised gown illustration — a hanging silhouette with a fitted
 * bodice and a softly pleated skirt. Used across dress cards and hero
 * moments so the brand's fashion identity reads through actual artwork
 * rather than flat colour blocks.
 */
function DressArt({ id, tone = "#fff", accent, opacity = 1, sparkle = true }) {
  const gid = `dressArt-${id}`;
  return (
    <svg viewBox="0 0 200 260" width="100%" height="100%" style={{ opacity, overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="30" y1="20" x2="170" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor={tone} stopOpacity="0.95" />
          <stop offset="1" stopColor={accent || tone} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* hanger */}
      <path d="M100 14 C100 20 106 20 106 26" stroke={tone} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M60 34 L100 12 L140 34" stroke={tone} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* bodice */}
      <path d="M78 34 C78 46 82 54 100 54 C118 54 122 46 122 34" stroke={tone} strokeWidth="2" fill="none" />
      {/* skirt with soft pleats, flares outward */}
      <path
        d="M76 54
           C50 100, 30 160, 34 232
           C56 216, 78 208, 100 208
           C122 208, 144 216, 166 232
           C170 160, 150 100, 124 54
           C112 60, 88 60, 76 54 Z"
        fill={`url(#${gid})`}
      />
      {[86, 100, 114].map((x, i) => (
        <path key={x} d={`M${x} 58 C ${x - 14 + i * 6} 110, ${x - 22 + i * 8} 170, ${x - 18 + i * 10} 224`}
          stroke={accent || tone} strokeOpacity="0.5" strokeWidth="1.3" fill="none" />
      ))}
      {sparkle && (
        <>
          <path d="M154 40 l3 7 7 3 -7 3 -3 7 -3-7-7-3 7-3 z" fill={accent || tone} opacity="0.85" />
          <circle cx="168" cy="60" r="2.2" fill={accent || tone} opacity="0.7" />
          <circle cx="46" cy="70" r="1.6" fill={accent || tone} opacity="0.6" />
        </>
      )}
    </svg>
  );
}

function StatCard({ label, value, delta, positive, icon: Icon }) {
  return (
    <div style={{
      background: T.card, borderRadius: 18, padding: "18px 20px", border: `1px solid ${T.line}`,
      boxShadow: "0 2px 10px rgba(61,31,73,0.04)", flex: "1 1 200px", minWidth: 190,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 12.5, color: T.textMuted, fontWeight: 600 }}>{label}</span>
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: T.blushSoft,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><Icon size={16} color={T.plumMid} /></div>
      </div>
      <div style={{ fontSize: 25, fontWeight: 800, color: T.plum, marginTop: 10, fontFamily: "Manrope" }}>{value}</div>
      {delta && (
        <div style={{
          display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 12.5,
          color: positive ? T.success : T.danger, fontWeight: 700,
        }}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  SHELL: SIDEBAR + TOPBAR                                                */
/* ---------------------------------------------------------------------- */
function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(42,21,51,0.35)", zIndex: 30,
        }} className="sidebar-scrim" />
      )}
      <aside className={`glm-sidebar ${open ? "open" : ""}`} style={{
        width: 236, background: T.plumDeep, height: "100vh", position: "fixed", left: 0, top: 0,
        display: "flex", flexDirection: "column", padding: "22px 14px", zIndex: 40,
        borderRight: `1px solid ${T.plum}`,
      }}>
        <div style={{ padding: "4px 10px 22px" }}>
          <GlimmerLogo size={30} dark />
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          {navItems.map(({ key, label, icon: Icon }) => {
            const active = page === key;
            return (
              <button key={key} onClick={() => { setPage(key); setOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 11, border: "none", cursor: "pointer",
                textAlign: "left", padding: "10px 13px", borderRadius: 11, fontSize: 13.6,
                fontWeight: active ? 700 : 500, fontFamily: "Manrope",
                background: active ? "linear-gradient(90deg,#6B3A80,#9B6BB3)" : "transparent",
                color: active ? "#fff" : "#C9B7D4",
                transition: "background 0.15s, color 0.15s",
              }}>
                <Icon size={17} strokeWidth={2} />
                {label}
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <div style={{
            background: "rgba(155,107,179,0.16)", borderRadius: 14, padding: 14,
            color: T.lavender, fontSize: 12, lineHeight: 1.5,
          }}>
            <Sparkles size={15} style={{ marginBottom: 6 }} />
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 12.5 }}>Glimmer Pro tip</div>
            Mark cleaned dresses "Available" promptly to avoid missed bookings.
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, setOpen, onExit }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 26px", background: T.card, borderBottom: `1px solid ${T.line}`,
      position: "sticky", top: 0, zIndex: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="glm-burger" onClick={() => setOpen(true)} style={{
          border: "none", background: T.blushSoft, borderRadius: 10, width: 36, height: 36,
          display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}><Menu size={18} color={T.plum} /></button>
        <div>
          <div style={{ fontSize: 11.5, color: T.textMuted, fontWeight: 600 }}>Glimmer / {title}</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: T.plum, fontFamily: "Manrope" }}>{title}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div className="glm-search" style={{
          display: "flex", alignItems: "center", gap: 8, background: T.bg, borderRadius: 999,
          padding: "9px 16px", border: `1px solid ${T.line}`, width: 240,
        }}>
          <Search size={15} color={T.textMuted} />
          <input placeholder="Search anything…" style={{
            border: "none", background: "transparent", outline: "none", fontSize: 13, width: "100%",
            fontFamily: "Manrope", color: T.text,
          }} />
        </div>
        <button style={{
          border: "none", background: T.blushSoft, width: 38, height: 38, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative",
        }}>
          <Bell size={17} color={T.plum} />
          <span style={{
            position: "absolute", top: 7, right: 8, width: 7, height: 7, borderRadius: 99,
            background: T.danger, border: "1.5px solid #fff",
          }} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg, ${T.plumMid}, ${T.lilac})`,
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14,
          }}>SF</div>
          <div className="glm-uname" style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Sarah Fernando</div>
            <div style={{ fontSize: 11, color: T.textMuted }}>Store Admin</div>
          </div>
        </div>
        <button onClick={onExit} title="Sign out" style={{
          border: "none", background: T.blushSoft, width: 38, height: 38, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}><LogOut size={16} color={T.plumMid} /></button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  PAGES                                                                  */
/* ---------------------------------------------------------------------- */
function DashboardPage() {
  return (
    <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <div style={{ fontSize: 21, fontWeight: 800, color: T.plum, fontFamily: "Manrope" }}>Good morning, Sarah</div>
        <div style={{ fontSize: 13.5, color: T.textMuted, marginTop: 3 }}>
          Here's what's happening with your dress rental business today.
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <StatCard label="Total Dresses" value="248" delta="+6 this month" positive icon={Shirt} />
        <StatCard label="Available Dresses" value="186" delta="75% of fleet" positive icon={Package} />
        <StatCard label="Active Rentals" value="34" delta="+3 vs last week" positive icon={Repeat} />
        <StatCard label="Pending Bookings" value="12" delta="Needs review" icon={CalendarClock} />
        <StatCard label="Monthly Revenue" value="Rs. 486,500" delta="+9.2%" positive icon={CreditCard} />
        <StatCard label="Overdue Returns" value="4" delta="Action needed" icon={Bell} />
      </div>

      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div style={{
          flex: "2 1 420px", background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, padding: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ fontWeight: 800, color: T.plum, fontSize: 15 }}>Revenue Overview</div>
            <span style={{ fontSize: 12, color: T.textMuted }}>Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.plumMid} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={T.plumMid} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: T.textMuted }} />
              <YAxis hide />
              <Tooltip formatter={(v) => [`Rs. ${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 10, border: `1px solid ${T.line}`, fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke={T.plumMid} strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: "1 1 260px", background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, padding: 20 }}>
          <div style={{ fontWeight: 800, color: T.plum, fontSize: 15, marginBottom: 12 }}>Booking Status</div>
          {bookingStatus.map((b) => (
            <div key={b.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                <span style={{ color: T.text, fontWeight: 600 }}>{b.label}</span>
                <span style={{ color: T.textMuted }}>{b.count}</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: T.bg }}>
                <div style={{
                  width: `${(b.count / 96) * 100}%`, height: "100%", borderRadius: 99,
                  background: `linear-gradient(90deg, ${T.lilac}, ${T.plumMid})`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
          <div style={{ fontWeight: 800, color: T.plum, fontSize: 15 }}>Recent Booking Requests</div>
          <button style={btnGhost}>View all</button>
        </div>
        <BookingsTable rows={bookings} compact />
      </div>
    </div>
  );
}

function BookingsTable({ rows, compact }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.3, minWidth: 720 }}>
        <thead>
          <tr style={{ background: T.bg }}>
            {["Booking ID", "Customer", "Dress", "Event Date", "Status", ""].map((h) => (
              <th key={h} style={{
                textAlign: "left", padding: "11px 20px", color: T.textMuted, fontWeight: 700,
                fontSize: 11.5, letterSpacing: 0.3, borderBottom: `1px solid ${T.line}`,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} style={{ borderBottom: `1px solid ${T.line}` }}>
              <td style={td}><span style={{ fontWeight: 700, color: T.plum }}>{r.id}</span></td>
              <td style={td}>{r.customer}</td>
              <td style={td}>{r.dress}</td>
              <td style={td}>{r.event}</td>
              <td style={td}><Badge status={r.status} /></td>
              <td style={{ ...td, textAlign: "right" }}>
                <button style={iconBtn}><Eye size={15} color={T.plumMid} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const td = { padding: "13px 20px", color: T.text };
const iconBtn = { border: "none", background: "transparent", cursor: "pointer", padding: 6, borderRadius: 8 };
const btnGhost = {
  border: `1px solid ${T.line}`, background: "transparent", color: T.plumMid, fontWeight: 700,
  fontSize: 12.5, padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "Manrope",
};
const btnPrimary = {
  border: "none", background: `linear-gradient(90deg, ${T.plumMid}, ${T.lilac})`, color: "#fff",
  fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 11, cursor: "pointer",
  display: "flex", alignItems: "center", gap: 7, fontFamily: "Manrope",
  boxShadow: "0 6px 16px rgba(107,58,128,0.28)",
};

function DressCard({ d }) {
  return (
    <div style={{
      background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, overflow: "hidden",
      transition: "transform .15s, box-shadow .15s", cursor: "pointer",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 28px rgba(61,31,73,0.10)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{
        height: 190, background: `linear-gradient(160deg, ${d.grad[0]}, ${d.grad[1]})`,
        position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 12,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "18px 46px 0",
        }}>
          <DressArt id={d.code} tone="#ffffff" accent={T.plumDeep} opacity={0.92} />
        </div>
        <button style={{
          width: 30, height: 30, borderRadius: 9, border: "none", background: "rgba(255,255,255,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", zIndex: 1,
        }}><Star size={14} color={T.plumMid} /></button>
        <span style={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}><Badge status={d.status} /></span>
      </div>
      <div style={{ padding: 15 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: T.plum }}>{d.name}</div>
            <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 2 }}>{d.code} · {d.cat}</div>
          </div>
          <button style={iconBtn}><MoreHorizontal size={16} color={T.textMuted} /></button>
        </div>
        <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 8 }}>Sizes: {d.sizes}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <div style={{ fontWeight: 800, color: T.plum, fontSize: 15 }}>Rs. {d.price.toLocaleString()}<span style={{ fontSize: 10.5, color: T.textMuted, fontWeight: 500 }}>/day</span></div>
          <button style={{ ...btnGhost, padding: "6px 12px" }}>View</button>
        </div>
      </div>
    </div>
  );
}

function CatalogPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => dresses.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.plum }}>Dress Catalog</div>
          <div style={{ fontSize: 13, color: T.textMuted, marginTop: 3 }}>{filtered.length} dresses in your collection</div>
        </div>
        <button style={btnPrimary}><Plus size={16} /> Add New Dress</button>
      </div>

      <div style={{
        background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: 14,
        display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{
          flex: "1 1 220px", display: "flex", alignItems: "center", gap: 8, background: T.bg,
          borderRadius: 11, padding: "9px 14px", border: `1px solid ${T.line}`,
        }}>
          <Search size={15} color={T.textMuted} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by model or name…" style={{
            border: "none", outline: "none", background: "transparent", fontSize: 13, width: "100%",
          }} />
        </div>
        {["Category", "Size", "Color", "Availability"].map((f) => (
          <button key={f} style={{
            display: "flex", alignItems: "center", gap: 6, border: `1px solid ${T.line}`, background: T.bg,
            padding: "9px 13px", borderRadius: 11, fontSize: 12.5, color: T.text, fontWeight: 600, cursor: "pointer",
          }}>{f} <ChevronDown size={13} color={T.textMuted} /></button>
        ))}
        <button style={{ ...iconBtn, border: `1px solid ${T.line}`, background: T.bg, padding: 9 }}>
          <Filter size={15} color={T.plumMid} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))", gap: 16 }}>
        {filtered.map((d) => <DressCard key={d.code} d={d} />)}
      </div>
    </div>
  );
}

function BookingsPage() {
  return (
    <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.plum }}>Booking Requests</div>
          <div style={{ fontSize: 13, color: T.textMuted, marginTop: 3 }}>Review and manage incoming rental requests</div>
        </div>
        <button style={btnPrimary}><Plus size={16} /> Create Booking</button>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <StatCard label="New Requests" value="5" icon={Bell} />
        <StatCard label="Pending" value="12" icon={CalendarClock} />
        <StatCard label="Confirmed" value="18" icon={ShieldCheck} />
        <StatCard label="Upcoming Events" value="9" icon={Sparkles} />
      </div>
      <div style={{ background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, overflow: "hidden" }}>
        <BookingsTable rows={bookings} />
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: 26 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: T.plum, marginBottom: 16 }}>{title}</div>
      <div style={{
        background: T.card, border: `1px dashed ${T.line}`, borderRadius: 18, padding: "70px 20px",
        textAlign: "center",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: T.blushSoft, margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><Sparkles size={24} color={T.plumMid} /></div>
        <div style={{ fontWeight: 800, color: T.plum, fontSize: 16 }}>{title} module</div>
        <div style={{ color: T.textMuted, fontSize: 13, marginTop: 6 }}>
          This screen follows the same Glimmer design system — ask and it can be fully built out next.
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  LOGIN PAGE                                                             */
/* ---------------------------------------------------------------------- */
function LoginPage({ onLogin, onBack }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: T.bg, fontFamily: "Manrope" }}>
      <div className="glm-login-hero" style={{
        flex: 1.1, background: `linear-gradient(160deg, ${T.plumDeep}, ${T.plumMid} 70%, ${T.lilac})`,
        display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 52px",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <button onClick={onBack} style={{
          border: "none", background: "none", cursor: "pointer", padding: 0, alignSelf: "flex-start",
        }}><GlimmerLogo dark size={34} /></button>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 34, lineHeight: 1.3,
            maxWidth: 420, fontWeight: 600,
          }}>
            Manage your dress rental business beautifully.
          </div>
          <div style={{ color: T.lavender, fontSize: 13.5, marginTop: 14, maxWidth: 380 }}>
            Bookings, inventory, customers and payments — all in one elegant workspace built for Glimmer.
          </div>
        </div>
        <div style={{ display: "flex", gap: 22, fontSize: 12.5, color: T.lavender, position: "relative", zIndex: 2 }}>
          <span>248 dresses managed</span><span>·</span><span>1,240+ happy customers</span>
        </div>
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)",
          right: -80, bottom: -80,
        }} />
        <div style={{ position: "absolute", right: -10, bottom: -20, width: 220, height: 300, zIndex: 0 }}>
          <DressArt id="login-hero" tone="#ffffff" accent={T.lavender} opacity={0.14} sparkle={false} />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div className="glm-login-mobile-logo" style={{ display: "none", marginBottom: 26 }}>
            <GlimmerLogo size={30} />
          </div>
          <button onClick={onBack} style={{
            border: "none", background: "none", cursor: "pointer", color: T.textMuted, fontSize: 12.5,
            fontWeight: 700, padding: 0, marginBottom: 14, display: "flex", alignItems: "center", gap: 4,
          }}>← Back to site</button>
          <div style={{ fontSize: 23, fontWeight: 800, color: T.plum }}>Welcome back</div>
          <div style={{ fontSize: 13.5, color: T.textMuted, marginTop: 5 }}>Sign in to your Glimmer dashboard</div>

          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 15 }}>
            <label style={label}>Email</label>
            <div style={inputWrap}>
              <Mail size={15} color={T.textMuted} />
              <input defaultValue="sarah@glimmer.lk" style={inputStyle} />
            </div>

            <label style={label}>Password</label>
            <div style={inputWrap}>
              <Lock size={15} color={T.textMuted} />
              <input type={showPw ? "text" : "password"} defaultValue="••••••••" style={inputStyle} />
              <button onClick={() => setShowPw(!showPw)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 11.5, color: T.plumMid, fontWeight: 700 }}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, marginTop: 2 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, color: T.textMuted, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: T.plumMid }} /> Remember me
              </label>
              <a href="#" style={{ color: T.plumMid, fontWeight: 700, textDecoration: "none" }}>Forgot password?</a>
            </div>

            <button onClick={onLogin} style={{ ...btnPrimary, justifyContent: "center", padding: "12px 18px", marginTop: 6 }}>
              Sign In
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.textMuted, fontSize: 11.5, margin: "4px 0" }}>
              <div style={{ flex: 1, height: 1, background: T.line }} /> OR <div style={{ flex: 1, height: 1, background: T.line }} />
            </div>

            <button style={{
              ...btnGhost, justifyContent: "center", display: "flex", alignItems: "center", gap: 8, padding: "11px 18px",
            }}>
              <svg width="15" height="15" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.4l-6.3-5.2C29.4 35.4 26.8 36 24 36c-5.4 0-9.9-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.3 6.9l6.3 5.2C39.7 36.5 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const label = { fontSize: 12, fontWeight: 700, color: T.text, marginBottom: -8 };
const inputWrap = {
  display: "flex", alignItems: "center", gap: 9, border: `1px solid ${T.line}`, borderRadius: 11,
  padding: "11px 14px", background: T.bg,
};
const inputStyle = { border: "none", outline: "none", background: "transparent", fontSize: 13.5, width: "100%", color: T.text, fontFamily: "Manrope" };

/* ---------------------------------------------------------------------- */
/*  PUBLIC HOME PAGE                                                       */
/* ---------------------------------------------------------------------- */
const homeNav = ["Home", "Dress Catalog", "Occasions", "About", "Contact"];

function HomeNavbar({ onSignIn }) {
  const [active, setActive] = useState("Home");
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px", position: "relative", zIndex: 5,
    }} className="glm-home-nav">
      <GlimmerLogo size={30} dark />
      <div className="glm-home-nav-pills" style={{
        display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, padding: 5,
      }}>
        {homeNav.map((n) => (
          <button key={n} onClick={() => setActive(n)} style={{
            border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 999,
            fontSize: 13, fontWeight: 600, fontFamily: "Manrope",
            background: active === n ? "#fff" : "transparent",
            color: active === n ? T.plum : "#E9DEEF",
          }}>{n}</button>
        ))}
      </div>
      <div className="glm-home-nav-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onSignIn} style={{
          border: "none", background: "transparent", color: "#fff", fontWeight: 700,
          fontSize: 13.5, cursor: "pointer", fontFamily: "Manrope",
        }}>Sign In</button>
        <button style={{
          border: "1px solid rgba(255,255,255,0.35)", background: "transparent", color: "#fff",
          fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 999, cursor: "pointer",
        }}>Sign Up</button>
        <button onClick={onSignIn} style={{
          ...btnPrimary, borderRadius: 999, padding: "10px 18px",
        }}>Book a Dress</button>
      </div>
    </div>
  );
}

function HomePage({ onSignIn, onBrowse }) {
  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <div style={{
        background: `linear-gradient(170deg, ${T.plumDeep} 0%, #2E1739 55%, ${T.plumMid} 100%)`,
        paddingBottom: 90, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(215,195,234,0.16), transparent 70%)",
          top: -140, right: -80,
        }} />
        <div className="glm-hero-art" style={{
          position: "absolute", right: "6%", top: 70, width: 260, height: 340, zIndex: 1,
        }}>
          <DressArt id="hero-1" tone="#ffffff" accent={T.lavender} opacity={0.16} sparkle={false} />
        </div>
        <div className="glm-hero-art" style={{
          position: "absolute", left: "4%", top: 190, width: 170, height: 230, zIndex: 1,
        }}>
          <DressArt id="hero-2" tone="#ffffff" accent={T.blush} opacity={0.10} sparkle={false} />
        </div>
        <HomeNavbar onSignIn={onSignIn} />

        <div style={{ textAlign: "center", padding: "56px 20px 0", position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700,
            color: T.lavender, background: "rgba(255,255,255,0.08)", padding: "6px 14px",
            borderRadius: 999, marginBottom: 20, border: "1px solid rgba(255,255,255,0.14)",
          }}><Sparkles size={13} /> Trusted by 1,240+ brides &amp; brands island-wide</div>

          <div style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff",
            fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15,
          }}>
            Effortless Elegance,
            <br />
            <span style={{
              fontStyle: "italic", background: `linear-gradient(90deg, ${T.lavender}, ${T.blush})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>For Every Occasion</span>
          </div>
          <div style={{ color: "#D8C7E1", fontSize: 15, marginTop: 18, maxWidth: 520, marginInline: "auto" }}>
            Browse Glimmer's curated collection of bridal, evening and party gowns — rent the dress,
            keep the memory.
          </div>
        </div>

        <div style={{
          maxWidth: 920, margin: "38px auto 0", background: "rgba(255,255,255,0.96)", borderRadius: 20,
          padding: 16, position: "relative", zIndex: 2, boxShadow: "0 20px 44px rgba(20,8,26,0.35)",
        }} className="glm-home-search">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{
              flex: "2 1 240px", display: "flex", alignItems: "center", gap: 9, background: T.bg,
              borderRadius: 12, padding: "11px 16px", border: `1px solid ${T.line}`,
            }}>
              <Search size={16} color={T.textMuted} />
              <input placeholder="Search by dress name or style…" style={{ ...inputStyle, fontSize: 13.5 }} />
            </div>
            {[["Occasion", "All"], ["Size", "All"], ["Sort by", "Price: Low to High"]].map(([l, v]) => (
              <div key={l} style={{ flex: "1 1 150px" }}>
                <div style={{ fontSize: 10.5, color: T.textMuted, fontWeight: 700, letterSpacing: 0.4, marginBottom: 4 }}>{l.toUpperCase()}</div>
                <button style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: `1px solid ${T.line}`, background: "#fff", borderRadius: 11, padding: "9px 12px",
                  fontSize: 12.5, color: T.text, fontWeight: 600, cursor: "pointer",
                }}>{v} <ChevronDown size={13} color={T.textMuted} /></button>
              </div>
            ))}
            <button onClick={onBrowse} style={{ ...btnPrimary, alignSelf: "stretch", padding: "0 20px" }}>Search</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 26px 70px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 21, fontWeight: 800, color: T.plum }}>This Week's Favourites</div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>Hand-picked gowns ready for your next event</div>
          </div>
          <button onClick={onBrowse} style={btnGhost}>View full catalog</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))", gap: 16 }}>
          {dresses.map((d) => <DressCard key={d.code} d={d} />)}
        </div>

        <div style={{
          marginTop: 60, borderRadius: 22, background: `linear-gradient(120deg, ${T.plumDeep}, ${T.plumMid})`,
          padding: "40px 36px", display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 20, color: "#fff",
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 24 }}>Run a rental business?</div>
            <div style={{ color: T.lavender, fontSize: 13.5, marginTop: 6, maxWidth: 420 }}>
              Sign in to manage inventory, bookings, customers and payments from the Glimmer dashboard.
            </div>
          </div>
          <button onClick={onSignIn} style={{ ...btnPrimary, background: "#fff", color: T.plum, boxShadow: "none" }}>
            Sign In to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ROOT APP                                                               */
/* ---------------------------------------------------------------------- */
export default function GlimmerApp() {
  const [view, setView] = useState("home"); // home | login | shell
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titles = {
    dashboard: "Dashboard", catalog: "Dress Catalog", inventory: "Inventory",
    customers: "Customers", bookings: "Booking Requests", rentals: "Rentals",
    payments: "Payments", returns: "Returns", roles: "Users & Roles",
    reports: "Reports", settings: "Settings",
  };

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: T.bg, color: T.text, minHeight: "100vh" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        input:focus { outline: none; }
        button:focus-visible, input:focus-visible { outline: 2px solid ${T.lilac}; outline-offset: 2px; }
        @media (max-width: 900px) {
          .glm-sidebar { transform: translateX(-100%); transition: transform .25s ease; }
          .glm-sidebar.open { transform: translateX(0); }
          .glm-content { margin-left: 0 !important; }
          .glm-burger { display: flex !important; }
          .glm-search { display: none !important; }
          .glm-uname { display: none; }
          .glm-login-hero { display: none !important; }
          .glm-login-mobile-logo { display: block !important; }
        }
        @media (min-width: 901px) { .sidebar-scrim { display: none !important; } }
        @media (max-width: 760px) {
          .glm-home-nav-pills { display: none !important; }
          .glm-home-nav-actions button:first-child { display: none; }
          .glm-hero-art { display: none !important; }
        }
        @media (max-width: 560px) {
          .glm-home-search > div { flex-direction: column; align-items: stretch !important; }
        }
      `}</style>

      {view === "home" && (
        <HomePage onSignIn={() => setView("login")} onBrowse={() => setView("login")} />
      )}

      {view === "login" && (
        <LoginPage onLogin={() => setView("shell")} onBack={() => setView("home")} />
      )}

      {view === "shell" && (
        <div>
          <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="glm-content" style={{ marginLeft: 236 }}>
            <Topbar title={titles[page]} setOpen={setSidebarOpen} onExit={() => setView("home")} />
            {page === "dashboard" && <DashboardPage />}
            {page === "catalog" && <CatalogPage />}
            {page === "bookings" && <BookingsPage />}
            {!["dashboard", "catalog", "bookings"].includes(page) && <PlaceholderPage title={titles[page]} />}
          </div>
        </div>
      )}
    </div>
  );
}
