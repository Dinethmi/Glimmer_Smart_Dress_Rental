import React, { useState } from "react";
import { T, btnPrimary, btnGhost } from "../theme";
import { Badge, iconBtn, DressArt } from "./common";
import { Star, MoreHorizontal, ShoppingCart, Calendar, Check, AlertCircle } from "lucide-react";

/**
 * =========================================================================
 * DRESS CARD COMPONENT
 * =========================================================================
 * මෙම Component එක මඟින් Catalog එකේ එක් එක් dress එක card එකක් ලෙස පෙන්වයි.
 * මෙහි ඇති නීති (Rules & Logic):
 * 1. Button එකෙහි නිරන්තරයෙන්ම "Add to Cart" ලෙස පෙන්වයි (Unavailable ලෙස button එකේ නොපෙන්වයි).
 * 2. "Add to Cart" click කළ විට:
 *    - Customer කෙනෙක් Register / Log in වී නොමැති නම් -> Sign In / Sign Up වන ලෙස prompt කරයි.
 *    - ඇඳුම Available නැති නම් (උදා: Reserved, Rented, Needs Wash/Cleaning) -> ඒ පිළිබඳව
 *      පැහැදිලි Error Message එකක් පෙන්වයි.
 *    - දැනටමත් Cart එකේ තිබේ නම් -> ඒ පිළිබඳව Warning එකක් පෙන්වයි.
 * 3. "Book Now" Button එක Card එකෙහි පෙනෙන්නට තිබුණද දැනට ක්‍රියාත්මක නොවේ (Placeholder).
 */
export default function DressCard({ d, onAddToCart, onBook }) {
  const [added, setAdded] = useState(false);

  // Handle Add to Cart click
  const handleAddToCartClick = (e) => {
    e.stopPropagation();

    if (onAddToCart) {
      const res = onAddToCart(d);
      if (res && res.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }
    }
  };

  // Handle Book Now click (dormant/placeholder as requested)
  const handleBookClick = (e) => {
    e.stopPropagation();
    if (onBook) {
      onBook(d);
    }
  };

  return (
    <div style={{
      background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, overflow: "hidden",
      transition: "transform .15s, box-shadow .15s", cursor: "pointer", position: "relative"
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 28px rgba(61,31,73,0.10)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Top Dress Visual Display */}
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

      {/* Card Body */}
      <div style={{ padding: "16px 15px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14.5, color: T.plum }}>{d.name}</div>
            <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 2 }}>{d.code} · {d.cat}</div>
          </div>
          <button style={iconBtn}><MoreHorizontal size={16} color={T.textMuted} /></button>
        </div>

        <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 6 }}>Sizes: {d.sizes}</div>

        {/* Price & Action Buttons */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 14, flexWrap: "wrap", gap: 8
        }}>
          <div style={{ fontWeight: 800, color: T.plum, fontSize: 15 }}>
            Rs. {d.price.toLocaleString()}
            <span style={{ fontSize: 10.5, color: T.textMuted, fontWeight: 500 }}>/day</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* 1. Add to Cart Button (Always displayed normally with "Add to Cart") */}
            <button
              onClick={handleAddToCartClick}
              title="Add this dress to your cart"
              style={{
                ...btnPrimary,
                padding: "8px 13px",
                fontSize: 12,
                gap: 5,
                background: added ? T.success : undefined,
                color: added ? "#fff" : undefined,
                transition: "all 0.2s ease"
              }}
            >
              {added ? (
                <>
                  <Check size={13} /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={13} /> Add to Cart
                </>
              )}
            </button>

            {/* 2. Book Now Button (Styled placeholder, dormant currently) */}
            <button
              onClick={handleBookClick}
              title="Instant booking coming soon"
              style={{
                border: "1px solid #D4AF37",
                background: "rgba(212, 175, 55, 0.12)",
                color: T.plumDeep,
                fontWeight: 700,
                fontSize: 12,
                padding: "8px 11px",
                borderRadius: 11,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "Manrope",
                opacity: 0.85
              }}
            >
              <Calendar size={13} color="#AA8529" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
