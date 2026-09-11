import React from "react";
import { T } from "../theme";
import { Menu, Search, Bell, LogOut } from "lucide-react";

export default function Topbar({ title, setOpen, onExit }) {
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
