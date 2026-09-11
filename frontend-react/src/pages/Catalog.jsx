import React, { useState, useMemo } from "react";
import { T, btnPrimary } from "../theme";
import { Search, Plus, Filter, ChevronDown } from "lucide-react";
import { iconBtn } from "../components/common";
import DressCard from "../components/DressCard";
import { dresses as defaultDresses } from "../data/mockData";

/**
 * =========================================================================
 * DRESS CATALOG PAGE
 * =========================================================================
 * මෙම පිටුව (Page) මඟින්:
 * 1. පද්ධතියේ ඇති සියලුම Dresses catalog එකක් ලෙස filter/search කර පෙන්වයි.
 * 2. එක් එක් dress එක Shopping Cart එකට එක් කිරීමට onAddToCart callback එකක් සපයයි.
 * 3. Cart එකේ දැනටමත් ඇති dresses හඳුනාගෙන isInCart state එක DressCard වෙත ලබා දෙයි.
 */
export default function Catalog({ dresses = defaultDresses, cart = [], onAddToCart, onBook }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => dresses.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())), [dresses, q]);

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
        {['Category','Size','Color','Availability'].map((f) => (
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
        {filtered.map((d) => (
          <DressCard
            key={d.code}
            d={d}
            isInCart={cart.some((item) => item.code === d.code)}
            onAddToCart={onAddToCart}
            onBook={onBook}
          />
        ))}
      </div>
    </div>
  );
}
