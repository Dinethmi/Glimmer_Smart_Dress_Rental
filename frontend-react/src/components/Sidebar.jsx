import React from "react";
import { T } from "../theme";
import GlimmerLogo from "./GlimmerLogo";
import {
  LayoutGrid, Shirt, Package, Users, CalendarClock, Repeat,
  ShieldCheck, BarChart3, Settings, CreditCard, Sparkles
} from "lucide-react";

export const defaultNavItems = [
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

export default function Sidebar({ page, setPage, open, setOpen, items = defaultNavItems }) {
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
          <GlimmerLogo size={160} />
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          {items.map(({ key, label, icon: Icon }) => {
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
