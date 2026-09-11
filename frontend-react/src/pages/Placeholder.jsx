import React from "react";
import { T } from "../theme";
import { Sparkles } from "lucide-react";

export default function Placeholder({ title }) {
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
