import React from "react";
import { T, btnPrimary } from "../theme";
import { StatCard, BookingsTable } from "../components/common";
import { Bell, CalendarClock, ShieldCheck, Sparkles, Plus } from "lucide-react";

const defaultBookings = [
  { id: "BK-1042", customer: "Sarah Fernando", dress: "Aurora Pearl Gown", event: "12 Sep 2026", requested: "05 Sep 2026", status: "pending" },
  { id: "BK-1041", customer: "Dinithi Perera", dress: "Sapphire Evening Gown", event: "14 Sep 2026", requested: "04 Sep 2026", status: "confirmed" },
  { id: "BK-1039", customer: "Amaya Silva", dress: "Celeste Bridal Gown", event: "20 Sep 2026", requested: "02 Sep 2026", status: "rented" },
  { id: "BK-1035", customer: "Nethmi Jayawardena", dress: "Royal Rose Evening Dress", event: "01 Sep 2026", requested: "24 Aug 2026", status: "overdue" },
  { id: "BK-1031", customer: "Kavindi Perera", dress: "Blush Garden Dress", event: "28 Aug 2026", requested: "20 Aug 2026", status: "returned" },
];

export default function Bookings({ rows = defaultBookings }) {
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
        <BookingsTable rows={rows} />
      </div>
    </div>
  );
}
