import React, { useState } from "react";
import { T, btnPrimary, btnGhost } from "../theme";
import { X, Calendar, Clock, MapPin, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";

/**
 * =========================================================================
 * CUSTOMER BOOKING MODAL (Customer සඳහා Dress එකක් Book කිරීමේ Modal එක)
 * =========================================================================
 * මෙම Component එකෙන් සිදු වන්නේ:
 * 1. Logged in customer හට තෝරාගත් dress එක සඳහා event date & return date තේරීම.
 * 2. දින ගණන අනුව මුළු rental මුදල ගණනය කිරීම.
 * 3. Pickup/Delivery ක්‍රමය සහ අමතර සටහන් ලබා ගැනීම.
 * 4. Booking එක confirm කර backend/state වෙත යැවීම.
 */
export default function CustomerBookingModal({ dress, customer, onClose, onConfirm }) {
  // Booking fields state
  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [deliveryType, setDeliveryType] = useState("pickup"); // pickup | delivery
  const [deliveryAddress, setDeliveryAddress] = useState(customer?.address || "");
  const [selectedSize, setSelectedSize] = useState(dress?.sizes?.split("·")?.[0]?.trim() || "M");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!dress) return null;

  // Calculate duration in days
  const calculateDays = () => {
    if (!startDate || !returnDate) return 1;
    const s = new Date(startDate);
    const e = new Date(returnDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const days = calculateDays();
  const rentalFee = (dress.price || 15000) * days;
  const securityDeposit = Math.round((dress.price || 15000) * 0.5); // 50% refundable deposit
  const totalAmount = rentalFee + securityDeposit;

  // Handle booking form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate) {
      setError("Please select the rental start/event date.");
      return;
    }
    if (!returnDate) {
      setError("Please select the return date.");
      return;
    }
    if (new Date(returnDate) < new Date(startDate)) {
      setError("Return date must be on or after the start date.");
      return;
    }

    const bookingPayload = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      customer: customer?.name || "Registered Customer",
      customerEmail: customer?.email || "",
      customerPhone: customer?.phone || "",
      dress: dress.name,
      dressCode: dress.code,
      size: selectedSize,
      event: startDate,
      returnDate: returnDate,
      days: days,
      deliveryType: deliveryType,
      deliveryAddress: deliveryType === "delivery" ? deliveryAddress : "In-store Pickup",
      rentalFee: rentalFee,
      deposit: securityDeposit,
      total: totalAmount,
      notes: notes,
      requested: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "pending"
    };

    onConfirm(bookingPayload);
    setIsSubmitted(true);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(17, 5, 23, 0.75)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16
    }}>
      <div style={{
        background: T.card, borderRadius: 24, border: `1px solid ${T.line}`,
        width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)", position: "relative"
      }}>
        {/* Modal Close Button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 18, right: 18, border: "none",
          background: T.blushSoft, width: 34, height: 34, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
        }}>
          <X size={17} color={T.plum} />
        </button>

        {isSubmitted ? (
          /* Success Screen */
          <div style={{ padding: "48px 32px", textAlign: "center" }}>
            <div style={{
              width: 68, height: 68, borderRadius: "50%", background: T.successBg,
              color: T.success, display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <CheckCircle size={38} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif" }}>
              Booking Request Placed!
            </h3>
            <p style={{ color: T.textMuted, fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
              Thank you, <strong>{customer?.name || "Customer"}</strong>. Your booking request for{" "}
              <strong>{dress.name}</strong> ({dress.code}) has been received. Our team will review and confirm your slot promptly.
            </p>
            <div style={{ marginTop: 24, padding: 16, background: T.bg, borderRadius: 14, textAlign: "left", fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: T.textMuted }}>Rental Period:</span>
                <strong>{startDate} to {returnDate} ({days} day{days > 1 ? "s" : ""})</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: T.textMuted }}>Delivery Option:</span>
                <strong>{deliveryType === "pickup" ? "Store Pickup (Colombo)" : "Courier Delivery"}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: T.textMuted }}>Total Payable:</span>
                <strong style={{ color: T.plum }}>Rs. {totalAmount.toLocaleString()}</strong>
              </div>
            </div>
            <button onClick={onClose} style={{ ...btnPrimary, width: "100%", justifyContent: "center", marginTop: 24, padding: "12px" }}>
              Done & View My Bookings
            </button>
          </div>
        ) : (
          /* Booking Form Screen */
          <div style={{ padding: "32px 28px" }}>
            {/* Header */}
            <div>
              <span style={{
                background: T.blushSoft, color: T.plumMid, fontSize: 11.5,
                fontWeight: 800, padding: "4px 10px", borderRadius: 999, textTransform: "uppercase"
              }}>
                Book This Dress
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: T.plum, marginTop: 8, fontFamily: "'Playfair Display', serif" }}>
                {dress.name}
              </h3>
              <div style={{ display: "flex", gap: 10, fontSize: 13, color: T.textMuted, marginTop: 4 }}>
                <span>Code: <strong>{dress.code}</strong></span>
                <span>•</span>
                <span>Category: <strong>{dress.cat}</strong></span>
                <span>•</span>
                <span style={{ color: T.plum, fontWeight: 700 }}>Rs. {dress.price?.toLocaleString()} / day</span>
              </div>
            </div>

            {error && (
              <div style={{
                marginTop: 14, padding: "10px 14px", background: T.dangerBg,
                color: T.danger, borderRadius: 10, fontSize: 12.5, fontWeight: 700
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Customer Info (Read-only reminder) */}
              <div style={{ padding: "12px 16px", background: T.bg, borderRadius: 12, border: `1px solid ${T.line}`, fontSize: 12.5 }}>
                <div style={{ fontWeight: 700, color: T.text }}>Booking for: {customer?.name}</div>
                <div style={{ color: T.textMuted, marginTop: 2 }}>{customer?.email} {customer?.phone ? `• ${customer?.phone}` : ""}</div>
              </div>

              {/* Size Picker */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: T.text, display: "block", marginBottom: 6 }}>
                  Select Size
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(dress.sizes ? dress.sizes.split("·") : ["S", "M", "L"]).map((sz) => {
                    const clean = sz.trim();
                    const isSel = selectedSize === clean;
                    return (
                      <button
                        key={clean}
                        type="button"
                        onClick={() => setSelectedSize(clean)}
                        style={{
                          padding: "8px 18px", borderRadius: 10, cursor: "pointer",
                          border: isSel ? `2px solid ${T.plumMid}` : `1px solid ${T.line}`,
                          background: isSel ? T.blushSoft : "transparent",
                          fontWeight: 700, fontSize: 13, color: isSel ? T.plumMid : T.text
                        }}
                      >
                        {clean}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Pickers */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: T.text, display: "block", marginBottom: 6 }}>
                    Rental Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => { setStartDate(e.target.value); setError(""); }}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10,
                      border: `1px solid ${T.line}`, background: T.bg, color: T.text,
                      fontFamily: "Manrope", fontSize: 13, outline: "none"
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: T.text, display: "block", marginBottom: 6 }}>
                    Return Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => { setReturnDate(e.target.value); setError(""); }}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10,
                      border: `1px solid ${T.line}`, background: T.bg, color: T.text,
                      fontFamily: "Manrope", fontSize: 13, outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Delivery Option */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: T.text, display: "block", marginBottom: 6 }}>
                  Collection Method
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("pickup")}
                    style={{
                      flex: 1, padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                      border: deliveryType === "pickup" ? `2px solid ${T.plumMid}` : `1px solid ${T.line}`,
                      background: deliveryType === "pickup" ? T.blushSoft : "transparent",
                      color: deliveryType === "pickup" ? T.plumMid : T.text, fontWeight: 700, fontSize: 12.5
                    }}
                  >
                    🏬 Store Pickup (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("delivery")}
                    style={{
                      flex: 1, padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                      border: deliveryType === "delivery" ? `2px solid ${T.plumMid}` : `1px solid ${T.line}`,
                      background: deliveryType === "delivery" ? T.blushSoft : "transparent",
                      color: deliveryType === "delivery" ? T.plumMid : T.text, fontWeight: 700, fontSize: 12.5
                    }}
                  >
                    🚚 Courier Delivery
                  </button>
                </div>
              </div>

              {deliveryType === "delivery" && (
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: T.text, display: "block", marginBottom: 6 }}>
                    Delivery Address
                  </label>
                  <input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter delivery address..."
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10,
                      border: `1px solid ${T.line}`, background: T.bg, color: T.text,
                      fontFamily: "Manrope", fontSize: 13, outline: "none"
                    }}
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: T.text, display: "block", marginBottom: 6 }}>
                  Special Notes or Fitting Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Needs waist slight adjustment, pickup morning 10 AM..."
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 10,
                    border: `1px solid ${T.line}`, background: T.bg, color: T.text,
                    fontFamily: "Manrope", fontSize: 13, outline: "none", resize: "none"
                  }}
                />
              </div>

              {/* Cost Summary Box */}
              <div style={{
                padding: "14px 16px", borderRadius: 14, background: T.bg,
                border: `1px dashed ${T.line}`, marginTop: 4
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                  <span style={{ color: T.textMuted }}>Rental Fee ({days} day{days > 1 ? "s" : ""}):</span>
                  <strong>Rs. {rentalFee.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: T.textMuted }}>Refundable Deposit:</span>
                  <span>Rs. {securityDeposit.toLocaleString()}</span>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 15, fontWeight: 800, color: T.plum,
                  borderTop: `1px solid ${T.line}`, paddingTop: 8
                }}>
                  <span>Estimated Total:</span>
                  <span>Rs. {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="button" onClick={onClose} style={{ ...btnGhost, flex: 1, justifyContent: "center" }}>
                  Cancel
                </button>
                <button type="submit" style={{ ...btnPrimary, flex: 2, justifyContent: "center", padding: "12px" }}>
                  Confirm Booking Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
