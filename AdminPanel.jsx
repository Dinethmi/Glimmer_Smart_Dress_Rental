// ============================================================================
// ADMIN PANEL REFERENCE CODES
// This file contains all the React components used to build the Admin Panel 
// (Dashboard, Sidebar, Topbar, Catalog, Bookings) for easy reference during viva.
// ============================================================================

import React, { useState, useMemo } from "react";
import {
  LayoutGrid, Shirt, Package, Users, CalendarClock, Repeat,
  ShieldCheck, BarChart3, Settings, Bell, Search, Plus, Eye,
  MoreHorizontal, ChevronDown, Menu, LogOut, Star, ShoppingCart, Filter, ArrowUpRight, ArrowDownRight, Sparkles
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

/* --- 1. SIDEBAR COMPONENT --- */
export function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      {open && <div onClick={() => setOpen(false)} className="sidebar-scrim" />}
      <aside className={`glm-sidebar ${open ? "open" : ""}`} style={{ width: 236, background: "var(--plumDeep)", height: "100vh", position: "fixed", left: 0, top: 0, display: "flex", flexDirection: "column", padding: "22px 14px", zIndex: 40 }}>
        {/* Navigation items rendered here */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          {navItems.map(({ key, label, icon: Icon }) => {
            const active = page === key;
            return (
              <button key={key} onClick={() => { setPage(key); setOpen(false); }}>
                <Icon size={17} /> {label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/* --- 2. TOPBAR COMPONENT --- */
export function Topbar({ title, setOpen, onExit }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 26px", background: "var(--card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="glm-burger" onClick={() => setOpen(true)}><Menu size={18} /></button>
        <div>
          <div>Glimmer / {title}</div>
          <div style={{ fontSize: 19, fontWeight: 800 }}>{title}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div className="glm-search"><Search size={15} /><input placeholder="Search anything…" /></div>
        <button><Bell size={17} /></button>
        <div className="glm-uname">
          <div style={{ fontSize: 13, fontWeight: 700 }}>Sarah Fernando</div>
          <div style={{ fontSize: 11 }}>Store Admin</div>
        </div>
        <button onClick={onExit}><LogOut size={16} /></button>
      </div>
    </div>
  );
}

/* --- 3. DASHBOARD PAGE --- */
export function DashboardPage() {
  return (
    <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <div style={{ fontSize: 21, fontWeight: 800 }}>Good morning, Sarah</div>
        <div style={{ fontSize: 13.5 }}>Here's what's happening with your dress rental business today.</div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <StatCard label="Total Dresses" value="248" delta="+6 this month" positive icon={Shirt} />
        <StatCard label="Available Dresses" value="186" delta="75% of fleet" positive icon={Package} />
        <StatCard label="Active Rentals" value="34" delta="+3 vs last week" positive icon={Repeat} />
        <StatCard label="Monthly Revenue" value="Rs. 486,500" delta="+9.2%" positive icon={BarChart3} />
      </div>

      {/* Charts & Status */}
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div style={{ flex: "2 1 420px", background: "var(--card)", padding: 20 }}>
          <div style={{ fontWeight: 800 }}>Revenue Overview</div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={revenueTrend}>
              <XAxis dataKey="m" />
              <Area type="monotone" dataKey="v" stroke="var(--plumMid)" fill="var(--plumMid)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: "1 1 260px", background: "var(--card)", padding: 20 }}>
          <div style={{ fontWeight: 800 }}>Booking Status</div>
          {/* Progress bars for booking status go here */}
        </div>
      </div>

      {/* Bookings Table */}
      <div style={{ background: "var(--card)", padding: 20 }}>
        <div style={{ fontWeight: 800 }}>Recent Booking Requests</div>
        <BookingsTable rows={bookings} compact />
      </div>
    </div>
  );
}

/* --- 4. CATALOG PAGE --- */
export function CatalogPage() {
  const [q, setQ] = useState("");
  return (
    <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Dress Catalog</div>
        <button><Plus size={16} /> Add New Dress</button>
      </div>
      
      {/* Search & Filters */}
      <div style={{ display: "flex", gap: 10, padding: 14, background: "var(--card)" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by model or name…" />
        <button>Category <ChevronDown size={13}/></button>
        <button><Filter size={15} /></button>
      </div>

      {/* Dress Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))", gap: 16 }}>
        {dresses.map((d) => <DressCard key={d.code} d={d} />)}
      </div>
    </div>
  );
}

/* --- 5. BOOKINGS PAGE --- */
export function BookingsPage() {
  return (
    <div style={{ padding: 26 }}>
      <div style={{ fontSize: 20, fontWeight: 800 }}>Booking Requests</div>
      <BookingsTable rows={bookings} />
    </div>
  );
}

/* --- 6. HELPER COMPONENTS --- */
export function StatCard({ label, value, delta, positive, icon: Icon }) {
  return (
    <div style={{ background: "var(--card)", padding: "18px 20px" }}>
      <Icon size={16} />
      <div style={{ fontSize: 25, fontWeight: 800 }}>{value}</div>
      <div style={{ color: positive ? "green" : "red" }}>{delta}</div>
    </div>
  );
}

export function DressCard({ d }) {
  return (
    <div style={{ background: "var(--card)", padding: 15 }}>
      <div style={{ fontWeight: 800 }}>{d.name}</div>
      <div>Rs. {d.price}/day</div>
    </div>
  );
}

export function BookingsTable({ rows }) {
  return (
    <table>
      <thead>
        <tr><th>ID</th><th>Customer</th><th>Dress</th><th>Status</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td><td>{r.customer}</td><td>{r.dress}</td><td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
