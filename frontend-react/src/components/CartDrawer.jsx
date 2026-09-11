import React from "react";
import { T, btnPrimary, btnGhost } from "../theme";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

/**
 * =========================================================================
 * CART DRAWER COMPONENT (Customer සඳහා Shopping Cart එක)
 * =========================================================================
 * මෙම Component එක මඟින්:
 * 1. Customer විසින් Cart එකට එක් කළ Available Dresses දකුණු පසින් Drawer එකක් ලෙස පෙන්වයි.
 * 2. එක් ඇඳුමක් එක් වරක් පමණක් කුලියට ගත හැකි බැවින් (Unique piece rule), Qty එක 1 ලෙස පෙන්වයි.
 * 3. අනවශ්‍ය නම් Dress එක Cart එකෙන් ඉවත් කිරීමේ (Trash/Remove) පහසුකම ඇත.
 * 4. සම්පූර්ණ Rental Subtotal එක සහ 50% Refundable Security Deposit එක ගණනය කරයි.
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveItem,
  onClearCart,
  onCheckout
}) {
  if (!isOpen) return null;

  // Calculate total rental amount (Each dress is a single unique piece: qty = 1)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const deposit = Math.round(subtotal * 0.5); // 50% refundable security deposit
  const total = subtotal + deposit;
  const totalCount = cartItems.length;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 120,
      background: "rgba(17, 5, 23, 0.7)", backdropFilter: "blur(4px)",
      display: "flex", justifyContent: "flex-end"
    }}>
      {/* Background click overlay to close */}
      <div onClick={onClose} style={{ flex: 1 }} />

      {/* Drawer Container */}
      <div style={{
        width: "100%", maxWidth: 450, background: T.card, height: "100vh",
        boxShadow: "-10px 0 30px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column",
        position: "relative", animation: "slideInRight 0.25s ease-out"
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: "20px 24px", borderBottom: `1px solid ${T.line}`,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: T.blushSoft,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <ShoppingBag size={18} color={T.plumMid} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: T.plum, margin: 0 }}>Shopping Cart</h3>
              <span style={{ fontSize: 12, color: T.textMuted }}>{totalCount} designer dress{totalCount !== 1 ? "es" : ""} selected</span>
            </div>
          </div>

          <button onClick={onClose} style={{
            border: "none", background: T.blushSoft, width: 34, height: 34, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
          }}>
            <X size={16} color={T.plum} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 24px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 10px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", background: T.blushSoft,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
              }}>
                <ShoppingBag size={28} color={T.plumMid} />
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: T.plum, margin: "0 0 6px" }}>Your Cart is Empty</h4>
              <p style={{ fontSize: 13, color: T.textMuted, maxWidth: 280, margin: "0 auto 20px" }}>
                Explore our catalog and click "Add to Cart" on available dresses you would like to rent.
              </p>
              <button onClick={onClose} style={{ ...btnPrimary, padding: "10px 20px", fontSize: 13 }}>
                Browse Dress Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cartItems.map((item) => (
                <div key={item.code} style={{
                  display: "flex", gap: 14, padding: "12px 14px", borderRadius: 14,
                  background: T.bg, border: `1px solid ${T.line}`
                }}>
                  {/* Thumbnail / Gradient Box */}
                  <div style={{
                    width: 65, height: 75, borderRadius: 10,
                    background: item.grad ? `linear-gradient(140deg, ${item.grad[0]}, ${item.grad[1]})` : T.plumDeep,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, padding: 4, textAlign: "center" }}>
                      {item.code}
                    </span>
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: T.plum }}>{item.name}</div>
                        <div style={{ fontSize: 11.5, color: T.textMuted }}>{item.cat} · Size: {item.selectedSize || "M"}</div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.code)}
                        title="Remove item"
                        style={{ border: "none", background: "none", cursor: "pointer", padding: 4 }}
                      >
                        <Trash2 size={15} color={T.danger} />
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                      <div style={{ fontWeight: 800, fontSize: 13.5, color: T.text }}>
                        Rs. {(item.price || 0).toLocaleString()}
                        <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 500 }}>/day</span>
                      </div>

                      {/* Unique Rental Piece Notice badge */}
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: T.plumMid, background: T.blushSoft,
                        padding: "3px 8px", borderRadius: 8
                      }}>
                        Qty: 1 (Single Unit)
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear All Button */}
              <button
                onClick={onClearCart}
                style={{
                  border: "none", background: "none", cursor: "pointer",
                  color: T.textMuted, fontSize: 12, textAlign: "right", padding: "4px 0",
                  textDecoration: "underline", alignSelf: "flex-end"
                }}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {cartItems.length > 0 && (
          <div style={{
            padding: "20px 24px", borderTop: `1px solid ${T.line}`,
            background: T.card
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: T.textMuted }}>Rental Subtotal:</span>
                <strong>Rs. {subtotal.toLocaleString()}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                <span style={{ color: T.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
                  <ShieldCheck size={13} color={T.success} /> Refundable Deposit:
                </span>
                <span>Rs. {deposit.toLocaleString()}</span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", fontSize: 16,
                fontWeight: 800, color: T.plum, borderTop: `1px solid ${T.line}`, paddingTop: 10
              }}>
                <span>Estimated Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              style={{
                ...btnPrimary, width: "100%", justifyContent: "center",
                padding: "13px", fontSize: 14, gap: 8
              }}
            >
              <span>Proceed to Booking / Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
