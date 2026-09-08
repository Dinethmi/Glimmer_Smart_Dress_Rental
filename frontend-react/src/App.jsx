import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutGrid, Shirt, Package, Users, CalendarClock, Repeat,
  ShieldCheck, BarChart3, Settings, Bell, Search, Plus, Eye,
  MoreHorizontal, Edit3, Trash2, ChevronDown, Menu, X, Sparkles,
  CreditCard, Star, Filter, ArrowUpRight, ArrowDownRight, Lock,
  Mail, Check, LogOut, MapPin, Heart, Briefcase, ShoppingCart, ChevronRight,
  Moon, Sun
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar,
} from "recharts";

/* ---------------------------------------------------------------------- */
/*  DESIGN TOKENS                                                          */
/* ---------------------------------------------------------------------- */
const T = {
  plum: "var(--plum)",
  plumDeep: "var(--plumDeep)",
  plumMid: "var(--plumMid)",
  lilac: "var(--lilac)",
  lavender: "var(--lavender)",
  blush: "var(--blush)",
  blushSoft: "var(--blushSoft)",
  bg: "var(--bg)",
  card: "var(--card)",
  line: "var(--line)",
  text: "var(--text)",
  textMuted: "var(--textMuted)",
  success: "var(--success)",
  successBg: "var(--successBg)",
  warning: "var(--warning)",
  warningBg: "var(--warningBg)",
  danger: "var(--danger)",
  dangerBg: "var(--dangerBg)",
  info: "var(--info)",
  infoBg: "var(--infoBg)",
};

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  --plum: #8A2234;
  --plumDeep: #2B0A11;
  --plumMid: #571622;
  --lilac: #D4AF37;
  --lavender: #F2E4E6;
  --blush: #FFD700;
  --blushSoft: #F9F2F4;
  --bg: #FCFAFA;
  --card: #FFFFFF;
  --line: #EFE9EA;
  --text: #2B0A11;
  --textMuted: #8A5F67;
  --success: #4C9A72;
  --successBg: #E7F5EE;
  --warning: #C98A2E;
  --warningBg: #FBF0DE;
  --danger: #C1554F;
  --dangerBg: #FBE9E7;
  --info: #5A6BB3;
  --infoBg: #EAEDFB;
}

[data-theme="dark"] {
  --plum: #8A2234;
  --plumDeep: #170408;
  --plumMid: #2B0A11;
  --lilac: #FFDF73;
  --lavender: #3B161E;
  --blush: #D4AF37;
  --blushSoft: #2B0A11;
  --bg: #0D0204;
  --card: #140508;
  --line: #2B0A11;
  --text: #F7EAEB;
  --textMuted: #A8868D;
  --success: #67C596;
  --successBg: #152E22;
  --warning: #EDB25A;
  --warningBg: #38240D;
  --danger: #D66D68;
  --dangerBg: #361715;
  --info: #6D82D6;
  --infoBg: #181E38;
}

@keyframes goldShimmer {
  0% { background-position: -100% center; }
  100% { background-position: 200% center; }
}

.gold-text {
  background: linear-gradient(
    to right, 
    #c49740 0%, 
    #ffe79a 20%, 
    #c49740 40%, 
    #8a601c 60%, 
    #ffe79a 80%, 
    #c49740 100%
  );
  background-size: 200% auto;
  color: #D4AF37;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: goldShimmer 5s linear infinite;
  text-shadow: 0px 4px 15px rgba(196, 151, 64, 0.4);
}

@keyframes btnShine {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.btn-gold-shiny {
  background: linear-gradient(
    110deg,
    #D4AF37 0%,
    #AA8529 35%,
    #fff2b2 50%,
    #AA8529 65%,
    #D4AF37 100%
  );
  background-size: 200% auto;
  color: #29050d !important;
  font-weight: 800 !important;
  border: 1px solid rgba(255, 235, 138, 0.8) !important;
  border-radius: 999px !important;
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3), inset 0 2px 2px rgba(255, 255, 255, 0.6) !important;
  animation: btnShine 4s linear infinite;
  transition: all 0.2s ease-in-out !important;
  cursor: pointer;
  backdrop-filter: blur(5px);
}
.btn-gold-shiny:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 25px rgba(212, 175, 55, 0.5), inset 0 2px 2px rgba(255, 255, 255, 0.8) !important;
}
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
  { name: "Aurora Pearl Gown", code: "GLM-2201", cat: "Bridal", sizes: "S · M · L", price: 18500, status: "available", grad: ["#4B2761", "#220F30"] },
  { name: "Royal Rose Evening Dress", code: "GLM-2214", cat: "Evening", sizes: "M · L", price: 12000, status: "rented", grad: ["#764591", "#4B2761"] },
  { name: "Celeste Bridal Gown", code: "GLM-2233", cat: "Bridal", sizes: "S · M", price: 24000, status: "available", grad: ["#3F1D59", "#1E0D2B"] },
  { name: "Midnight Elegance", code: "GLM-2240", cat: "Formal", sizes: "M · L · XL", price: 9500, status: "cleaning", grad: ["#220F30", "#110517"] },
  { name: "Blush Garden Dress", code: "GLM-2255", cat: "Party", sizes: "S · M", price: 7200, status: "available", grad: ["#522774", "#2A1140"] },
  { name: "Sapphire Evening Gown", code: "GLM-2262", cat: "Evening", sizes: "M · L", price: 14500, status: "reserved", grad: ["#7A3B99", "#3F1D59"] },
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

function GlimmerLogo({ size = 200 }) {
  return (
    <div style={{ 
      display: "flex", alignItems: "center", pointerEvents: "none",
      background: "rgba(0, 0, 0, 0.6)", // Darken the black background slightly
      padding: "5px 15px",
      borderRadius: 16,
      border: "1px solid rgba(255, 215, 0, 0.4)", // Golden glassy border
      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)", // Shiny glassy glow
      backdropFilter: "blur(8px)" // Glassmorphism
    }}>
      <img 
        src="/logo2.png" 
        alt="Glimmer Logo" 
        style={{ 
          width: size, 
          objectFit: "contain",
          filter: "contrast(1.1) brightness(1.05)" 
        }} 
      />
    </div>
  );
}

function DressArt({ id, src = "/modern-trend-dress.jpg", opacity = 1, style }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const w = canvas.width;
      const h = canvas.height;
      
      // Global background removal using aggressive Brightness + Neutrality (Saturation) check
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Check if the pixel is bright enough to be background/floor shadow (down to medium grey)
        if (r > 160 && g > 160 && b > 160) {
          // Check if the pixel is neutral (low saturation)
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          // Allow up to 30 diff for slightly tinted studio lighting on the floor
          if (diff < 35) {
            // It's the background! Make it transparent.
            const whiteness = (r + g + b) / 3;
            // Smooth fade: pure white is fully transparent, darker greys fade out smoothly
            data[i+3] = whiteness >= 235 ? 0 : Math.max(0, 255 - (whiteness - 160) * 3.5);
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };
  }, []);

  return (
    <div style={{ 
      width: "100%", height: "100%", opacity, display: "flex", alignItems: "center", justifyContent: "center", 
      pointerEvents: "none", transition: "opacity 1.5s ease-in-out", ...style
    }}>
      <canvas ref={canvasRef} style={{ 
        width: "100%", height: "100%", objectFit: "contain",
        pointerEvents: "none"
      }} />
    </div>
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
          <GlimmerLogo size={160} dark />
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
  border: "none", background: `linear-gradient(90deg, #D4AF37, #FFF5C3, #AA8529)`, color: "#110517",
  fontWeight: 800, fontSize: 13, padding: "10px 18px", borderRadius: 11, cursor: "pointer",
  display: "flex", alignItems: "center", gap: 7, fontFamily: "Manrope",
  boxShadow: "0 6px 16px rgba(212,175,55,0.35)",
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
          <button style={{ ...btnPrimary, padding: "7px 12px", gap: 5, fontSize: 11.5 }}>
            <ShoppingCart size={13} /> Add
          </button>
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
/*  AUTH PAGE (LOGIN / SIGN UP)                                            */
function AuthPage({ onBack, onAuth, onStaffLogin, type = "login", isStaff = false }) {
  const [authType, setAuthType] = useState(type);
  const [role, setRole] = useState(isStaff ? "admin" : "customer");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setRole(isStaff ? "admin" : "customer");
  }, [isStaff]);

  useEffect(() => {
    if (authType === "login") {
      if (isStaff) {
        setEmail(role === "admin" ? "admin@glimmer.lk" : "staff@glimmer.lk");
      } else {
        setEmail("user@glimmer.lk");
      }
      setPassword("");
      setError("");
    }
  }, [role, authType, isStaff]);

  const handleAuth = () => {
    if (authType === "login") {
      if (isStaff) {
        if (role === "admin" && email === "admin@glimmer.lk" && password === "admin123") {
          onAuth();
        } else if (role === "staff" && email === "staff@glimmer.lk" && password === "staff123") {
          onAuth();
        } else {
          setError("Invalid employee credentials.");
        }
      } else {
        // Customer login
        if (email === "user@glimmer.lk" && password === "user123") {
          onAuth();
        } else {
          setError("Invalid email or password.");
        }
      }
    } else {
      // Allow any signup for now
      onAuth();
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: T.bg, fontFamily: "Manrope" }}>
      <div className="glm-login-hero" style={{
        flex: 1.1, background: `linear-gradient(160deg, var(--plumDeep), var(--plum) 70%, var(--plumMid))`,
        display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 52px",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <button onClick={onBack} style={{
          border: "none", background: "none", cursor: "pointer", padding: 0, alignSelf: "flex-start",
        }}><GlimmerLogo dark /></button>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 34, lineHeight: 1.3,
            maxWidth: 420, fontWeight: 700,
            background: `linear-gradient(90deg, #D4AF37, #FFF5C3, #AA8529, #FFF5C3, #D4AF37)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {authType === "login" ? "Welcome to Glimmer." : "Join Glimmer and elevate your style."}
          </div>
          <div style={{ color: "#EBDFF2", fontSize: 13.5, marginTop: 14, maxWidth: 380, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            {authType === "login" 
              ? "Sign in to rent dresses or manage your business."
              : "Create an account to browse exclusive collections, book dresses, and manage your rentals."}
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
          <DressArt id="login-hero" opacity={0.8} />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div className="glm-login-mobile-logo" style={{ display: "none", marginBottom: 26 }}>
            <GlimmerLogo />
          </div>
          <button onClick={onBack} style={{
            border: "none", background: "none", cursor: "pointer", color: T.textMuted, fontSize: 12.5,
            fontWeight: 700, padding: 0, marginBottom: 14, display: "flex", alignItems: "center", gap: 4,
          }}>← Back to site</button>
          <div style={{ fontSize: 23, fontWeight: 800, color: T.plum }}>
            {authType === "login" 
              ? "Welcome back" 
              : (isStaff ? "Join the Team" : "Create an Account")}
          </div>
          <div style={{ fontSize: 13.5, color: T.textMuted, marginTop: 5 }}>
            {authType === "login" 
              ? "Sign in to continue to Glimmer" 
              : (isStaff ? "Sign up for an employee account" : "Sign up to start renting with Glimmer")}
          </div>

          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 15 }}>
            {isStaff && authType === "login" && (
              <div style={{ display: "flex", background: "rgba(0,0,0,0.04)", borderRadius: 11, padding: 4, marginBottom: 4 }}>
                <button onClick={() => setRole("admin")} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", background: role === "admin" ? "#fff" : "transparent", color: role === "admin" ? T.plumMid : T.textMuted, fontWeight: 700, cursor: "pointer", fontSize: 12, boxShadow: role === "admin" ? "0 2px 6px rgba(0,0,0,0.06)" : "none", transition: "all 0.2s" }}>Admin</button>
                <button onClick={() => setRole("staff")} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", background: role === "staff" ? "#fff" : "transparent", color: role === "staff" ? T.plumMid : T.textMuted, fontWeight: 700, cursor: "pointer", fontSize: 12, boxShadow: role === "staff" ? "0 2px 6px rgba(0,0,0,0.06)" : "none", transition: "all 0.2s" }}>Staff</button>
              </div>
            )}
            {error && (
              <div style={{ padding: "10px", background: T.dangerBg, color: T.danger, borderRadius: 8, fontSize: 12.5, fontWeight: 700 }}>
                {error}
              </div>
            )}
            {authType === "signup" && (
              <>
                <label style={label}>Full Name</label>
                <div style={inputWrap}>
                  <Users size={15} color={T.textMuted} />
                  <input placeholder="Jane Doe" style={inputStyle} />
                </div>
                {isStaff && (
                  <>
                    <label style={label}>Job Role</label>
                    <div style={{ ...inputWrap, position: "relative" }}>
                      <Briefcase size={15} color={T.textMuted} />
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer", color: T.text, background: "transparent", border: "none", width: "100%", outline: "none" }} defaultValue="">
                        <option value="" disabled>Select your role...</option>
                        <option value="Manager">Store Manager</option>
                        <option value="Sales">Sales Representative</option>
                        <option value="Inventory">Inventory Clerk</option>
                        <option value="Stylist">Stylist / Fitter</option>
                      </select>
                      <ChevronDown size={14} color={T.textMuted} style={{ position: "absolute", right: 14, pointerEvents: "none" }} />
                    </div>
                    <label style={label}>Staff Invite Code</label>
                    <div style={inputWrap}>
                      <ShieldCheck size={15} color={T.textMuted} />
                      <input placeholder="Enter the code provided by admin" style={inputStyle} />
                    </div>
                  </>
                )}
              </>
            )}
            
            <label style={label}>Email</label>
            <div style={inputWrap}>
              <Mail size={15} color={T.textMuted} />
              <input value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder={isStaff ? "Employee email" : "Email address"} style={inputStyle} />
            </div>

            <label style={label}>Password</label>
            <div style={inputWrap}>
              <Lock size={15} color={T.textMuted} />
              <input type={showPw ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder="Password" style={inputStyle} />
              <button onClick={() => setShowPw(!showPw)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 11.5, color: T.plumMid, fontWeight: 700 }}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            {authType === "login" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, marginTop: 2 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 7, color: T.textMuted, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: T.plumMid }} /> Remember me
                </label>
                <a href="#" style={{ color: T.plumMid, fontWeight: 700, textDecoration: "none" }}>Forgot password?</a>
              </div>
            )}

            <button onClick={handleAuth} style={{ ...btnPrimary, justifyContent: "center", padding: "12px 18px", marginTop: 6 }}>
              {authType === "login" ? "Sign In" : "Create Account"}
            </button>
            
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: T.textMuted }}>
              {authType === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setAuthType(authType === "login" ? "signup" : "login")} style={{ 
                border: "none", background: "none", cursor: "pointer", color: T.plumMid, fontWeight: 700, padding: 0 
              }}>
                {authType === "login" ? "Sign Up" : "Sign In"}
              </button>
            </div>
            
            {!isStaff && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.textMuted, fontSize: 11.5, margin: "4px 0" }}>
                  <div style={{ flex: 1, height: 1, background: T.line }} /> OR <div style={{ flex: 1, height: 1, background: T.line }} />
                </div>

                <button style={{
                  ...btnGhost, justifyContent: "center", display: "flex", alignItems: "center", gap: 8, padding: "11px 18px",
                }}>
                  <svg width="15" height="15" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.4l-6.3-5.2C29.4 35.4 26.8 36 24 36c-5.4 0-9.9-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.3 6.9l6.3 5.2C39.7 36.5 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>
                  Continue with Google
                </button>
              </>
            )}

            {!isStaff && authType === "login" && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button onClick={onStaffLogin} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 11.5, color: T.textMuted, textDecoration: "underline" }}>
                  Staff Portal
                </button>
              </div>
            )}
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
const homeNav = ["Home", "Dress Catalog", "Occasions", "Contact"];

function HomeNavbar({ activeTab, setActiveTab, onSignIn, theme, setTheme, onSignUp }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px", position: "relative", zIndex: 5,
    }} className="glm-home-nav">
      <GlimmerLogo />
      <div className="glm-home-nav-pills" style={{
        display: "flex", alignItems: "center", gap: 4, background: "rgba(255, 255, 255, 0.08)",
        border: `1px solid rgba(255, 255, 255, 0.2)`, borderRadius: 999, padding: 5,
        backdropFilter: "blur(12px)"
      }}>
        {homeNav.map((n) => (
          <button key={n} onClick={() => setActiveTab(n)} style={{
            border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 999,
            fontSize: 13, fontWeight: 600, fontFamily: "Manrope",
            background: activeTab === n ? "rgba(255,255,255,0.9)" : "transparent",
            color: activeTab === n ? T.plumDeep : "#fff",
            textShadow: activeTab !== n ? "0 1px 3px rgba(0,0,0,0.4)" : "none"
          }}>{n}</button>
        ))}
      </div>
      <div className="glm-home-nav-actions" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button style={{
          border: `1px solid rgba(255, 255, 255, 0.35)`, background: "rgba(0,0,0,0.1)", color: "#fff",
          position: "relative", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: "50%", backdropFilter: "blur(8px)"
        }}>
          <ShoppingCart size={15} />
          <div style={{
            position: "absolute", top: -4, right: -4, background: T.blush, color: T.plumDeep,
            fontSize: 10, fontWeight: 800, width: 16, height: 16, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>2</div>
        </button>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} style={{
          border: `1px solid rgba(255, 255, 255, 0.35)`, background: "rgba(0,0,0,0.1)", color: "#fff",
          fontWeight: 700, fontSize: 13, padding: "8px", borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, backdropFilter: "blur(8px)",
          transition: "transform 0.2s"
        }}>
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} color="#FFDF73" />}
        </button>
        <button onClick={onSignIn} style={{
          border: "none", background: "transparent", color: "#fff", fontWeight: 700,
          fontSize: 13.5, cursor: "pointer", fontFamily: "Manrope", textShadow: "0 1px 3px rgba(0,0,0,0.4)"
        }}>Sign In</button>
        <button onClick={onSignUp} style={{
          border: `1px solid rgba(255, 255, 255, 0.4)`, background: "rgba(255,255,255,0.15)", color: "#fff",
          fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 999, cursor: "pointer", backdropFilter: "blur(8px)"
        }}>Sign Up</button>
        {activeTab !== "Home" && (
          <button onClick={() => setActiveTab("Dress Catalog")} style={{
            ...btnPrimary, borderRadius: 999, padding: "10px 18px",
          }}>Book a Dress</button>
        )}
      </div>
    </div>
  );
}

const HERO_SLIDES = [
  { src: "/modern-trend-dress.jpg", title: "Champagne Glamour", tag: "New Arrival" },
  { src: "/emerald-dress.jpg", title: "Emerald Elegance", tag: "Trending Now" },
  { src: "/sapphire-dress.jpg", title: "Sapphire Radiance", tag: "Exclusive" },
];

function HomePage({ onSignIn, onSignUp, theme, setTheme }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (activeTab !== "Home") return;
    const t = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(t);
  }, [activeTab]);

  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <div style={{
        background: `linear-gradient(170deg, #5c0f1c 0%, #29050d 100%)`, // Deep glassy maroon
        paddingBottom: activeTab === "Home" ? 90 : 20, position: "relative", overflow: "hidden",
      }}>
        {/* Glitter Noise Overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.25, mixBlendMode: "color-dodge", pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        
        {/* Glassmorphism Glowing Orbs */}
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent 60%)",
          top: -150, right: -100, filter: "blur(40px)"
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(235, 223, 242, 0.1), transparent 60%)",
          bottom: -100, left: -50, filter: "blur(30px)"
        }} />

        {activeTab === "Home" && (
          <div className="glm-hero-art" style={{
            position: "absolute", right: "2%", top: 110, width: "40%", height: "calc(100% - 110px)", pointerEvents: "none"
          }}>
            {HERO_SLIDES.map((s, i) => (
              <DressArt key={s.src} src={s.src} opacity={i === slideIdx ? 1 : 0} style={{ position: "absolute", inset: 0 }} />
            ))}
          </div>
        )}
        <HomeNavbar activeTab={activeTab} setActiveTab={setActiveTab} onSignIn={onSignIn} onSignUp={onSignUp} theme={theme} setTheme={setTheme} />

        {activeTab === "Home" && (
          <>
            <div style={{ textAlign: "center", padding: "56px 20px 0", position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700,
                color: "#EBDFF2", background: "rgba(255, 255, 255, 0.1)", padding: "6px 14px",
                borderRadius: 999, marginBottom: 20, border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)", boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}><Sparkles size={13} color="#D4AF37" /> Trusted by 1,240+ brides &amp; brands island-wide</div>

              <div style={{ position: "relative", height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {HERO_SLIDES.map((s, i) => (
                  <div key={s.src} style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    opacity: i === slideIdx ? 1 : 0,
                    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
                    transform: i === slideIdx ? "translateY(0)" : "translateY(10px)",
                    pointerEvents: i === slideIdx ? "auto" : "none"
                  }}>
                    <div className="gold-text" style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>
                      {s.tag}
                    </div>
                    <div className="gold-text" style={{
                      fontFamily: "'Playfair Display', serif", fontWeight: 700,
                      fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15,
                    }}>
                      {s.title},
                      <br />
                      <span style={{ fontStyle: "italic" }}>For Every Occasion</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ color: "#EBDFF2", fontSize: 15, marginTop: 18, maxWidth: 520, marginInline: "auto", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                Browse Glimmer's curated collection of bridal, evening and party gowns — rent the dress,
                keep the memory.
              </div>
            </div>

            <div style={{ marginTop: 38, display: "flex", justifyContent: "center", position: "relative", zIndex: 2 }}>
              <button className="btn-gold-shiny" onClick={() => setActiveTab("Dress Catalog")} style={{
                padding: "16px 36px", fontSize: 15
              }}>
                Book Now
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 26px 70px" }}>
        {activeTab === "Dress Catalog" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif" }}>Our Collection</div>
                <div style={{ fontSize: 14.5, color: T.textMuted, marginTop: 6 }}>Explore our full range of elegant dresses for every occasion.</div>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
              {/* Sidebar Filter Menu */}
              <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                {[
                  { label: "View All Styles", arrow: false },
                  { label: "Category", arrow: true },
                  { label: "The Fall Edit", arrow: true },
                  { label: "Occasion", arrow: true },
                  { label: "Premium Styles", arrow: false },
                  { label: "Collections", arrow: true },
                  { label: "Maternity", arrow: false },
                  { label: "Size + Fit", arrow: true },
                  { label: "Discover Brands", arrow: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: `1px solid ${T.line}`, cursor: "pointer",
                    color: i === 0 ? T.plumDeep : T.text, fontWeight: i === 0 ? 700 : 500,
                    fontSize: 14.5
                  }}>
                    {item.label}
                    {item.arrow && <ChevronRight size={16} color={T.danger} strokeWidth={1.5} />}
                  </div>
                ))}
              </div>
              
              {/* Dress Grid */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 20 }}>
                  {dresses.map((d) => <DressCard key={d.code} d={d} />)}
                </div>
              </div>
            </div>
          </>
        ) : activeTab === "Home" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif" }}>Discover Our Collections</h2>
              <p style={{ color: T.textMuted, marginTop: 8 }}>From enchanting bridal wear to dazzling party gowns</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              <div style={{ height: 400, borderRadius: 16, background: "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600') center/cover", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                  <h3 style={{ fontSize: 22, margin: 0, fontFamily: "'Playfair Display', serif" }}>Bridal</h3>
                </div>
              </div>
              <div style={{ height: 400, borderRadius: 16, background: "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=600') center/cover", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                  <h3 style={{ fontSize: 22, margin: 0, fontFamily: "'Playfair Display', serif" }}>Evening</h3>
                </div>
              </div>
              <div style={{ height: 400, borderRadius: 16, background: "url('/party-dress.jpg') center/cover", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                  <h3 style={{ fontSize: 22, margin: 0, fontFamily: "'Playfair Display', serif" }}>Party</h3>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <button className="btn-gold-shiny" onClick={() => setActiveTab("Dress Catalog")} style={{ margin: "0 auto", padding: "14px 28px", fontSize: 15 }}>Explore Full Catalog</button>
            </div>
            
            {/* About Us Section */}
            <div style={{ margin: "60px auto 0", maxWidth: 1100, textAlign: "center", padding: "0 20px" }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif", marginBottom: 20 }}>About Glimmer</h2>
              <p style={{ color: T.text, fontSize: 16.5, lineHeight: 1.8, marginBottom: 16, textAlign: "justify" }}>
                Glimmer Smart Dress Rental is your premier destination for high-quality, elegant dresses for every special occasion. 
                We believe that everyone deserves to look and feel their best without the commitment of purchasing an expensive outfit they might only wear once.
              </p>
              <p style={{ color: T.text, fontSize: 16.5, lineHeight: 1.8, textAlign: "justify" }}>
                With our curated collection of bridal gowns, evening wear, and party dresses, you can step into the spotlight with confidence. 
                Our easy booking process and reliable service ensure a seamless experience from selection to return.
              </p>
            </div>
          </>
        ) : (
          <PlaceholderPage title={activeTab} />
        )}

      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ROOT APP                                                               */
/* ---------------------------------------------------------------------- */
export default function GlimmerApp() {
  const [view, setView] = useState("home"); // home | login | shell | signup
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const titles = {
    dashboard: "Dashboard", catalog: "Dress Catalog", inventory: "Inventory",
    customers: "Customers", bookings: "Booking Requests", rentals: "Rentals",
    payments: "Payments", returns: "Returns", roles: "Users & Roles",
    reports: "Reports", settings: "Settings",
  };

  return (
    <div data-theme={theme} style={{ fontFamily: "Manrope, sans-serif", background: T.bg, color: T.text, minHeight: "100vh" }}>
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
        <HomePage onSignIn={() => setView("login")} onSignUp={() => setView("signup")} theme={theme} setTheme={setTheme} />
      )}

      {(view === "login" || view === "signup" || view === "staff_login") && (
        <AuthPage 
          type={view === "staff_login" ? "login" : view} 
          isStaff={view === "staff_login"}
          onAuth={() => setView("shell")} 
          onBack={() => setView("home")} 
          onStaffLogin={() => setView("staff_login")}
        />
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
