import React from "react";
import { T, btnGhost } from "../theme";
import { StatCard, BookingsTable } from "../components/common";
import { Shirt, Package, Repeat, CalendarClock, CreditCard, Bell } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { revenueTrend as defaultRevenueTrend, bookingStatus as defaultBookingStatus, bookings as defaultBookings } from "../data/mockData";

export default function Dashboard({
  revenueTrend = defaultRevenueTrend,
  bookingStatus = defaultBookingStatus,
  bookings = defaultBookings,
}) {
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
