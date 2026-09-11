// common.jsx (shared utilities & UI components)
import React from "react";
import { T } from "../theme";
import { ArrowUpRight, ArrowDownRight, Eye } from "lucide-react";

export const td = { padding: "13px 20px", color: T.text };
export const iconBtn = { border: "none", background: "transparent", cursor: "pointer", padding: 6, borderRadius: 8 };

export function Badge({ status }) {
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
  const m = statusMeta[status] || statusMeta.available;
  return (
    <span style={{ background: m.bg, color: m.fg, fontWeight: 700, fontSize: 12, padding: "4px 11px", borderRadius: 999, display: "inline-block", letterSpacing: 0.2 }}>{m.label}</span>
  );
}

export function StatCard({ label, value, delta, positive, icon: Icon }) {
  return (
    <div style={{ background: T.card, borderRadius: 18, padding: "18px 20px", border: `1px solid ${T.line}`, boxShadow: "0 2px 10px rgba(61,31,73,0.04)", flex: "1 1 200px", minWidth: 190 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 12.5, color: T.textMuted, fontWeight: 600 }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: T.blushSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={T.plumMid} />
        </div>
      </div>
      <div style={{ fontSize: 25, fontWeight: 800, color: T.plum, marginTop: 10, fontFamily: "Manrope" }}>{value}</div>
      {delta && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 12.5, color: positive ? T.success : T.danger, fontWeight: 700 }}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
        </div>
      )}
    </div>
  );
}

export function BookingsTable({ rows = [] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.3, minWidth: 720 }}>
        <thead>
          <tr style={{ background: T.bg }}>
            {["Booking ID", "Customer", "Dress", "Event Date", "Status", ""].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "11px 20px", color: T.textMuted, fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3, borderBottom: `1px solid ${T.line}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
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

export { default as GlimmerLogo } from "./GlimmerLogo";
export { default as DressArt } from "./DressArt";
