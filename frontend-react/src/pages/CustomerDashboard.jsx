import React from "react";
import { T, btnPrimary, btnGhost } from "../theme";
import { Badge } from "../components/common";
import { User, Calendar, Clock, ShoppingBag, MapPin, Phone, Mail, ShieldCheck, Plus, ArrowLeft } from "lucide-react";

/**
 * =========================================================================
 * CUSTOMER DASHBOARD (Customer සඳහා වන පුද්ගලික Dashboard එක)
 * =========================================================================
 * මෙම පිටුව (Page) මඟින්:
 * 1. Logged in customer හට තමා සිදු කළ සියලුම Booking Requests සහ ඒවායේ තත්ත්වය (Status) බැලිය හැක.
 * 2. Customer ගේ Profile විස්තර (නම, Email, දුරකථන අංකය, NIC/ලිපිනය) පෙන්වයි.
 * 3. අලුතින් Dress එකක් book කිරීමට කෙලින්ම Dress Catalog එකට යාමට button එකක් ඇත.
 * 4. Sign Out වීමේ පහසුකම සලසයි.
 */
export default function CustomerDashboard({
  customer,
  bookings = [],
  onBrowseCatalog,
  onSignOut,
  onBookDress
}) {
  // Filter bookings belonging to this customer (or show all if sample)
  const myBookings = bookings.filter(
    (b) => !customer?.email || b.customerEmail === customer.email || b.customer === customer?.name
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, padding: "30px 24px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top Header Bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16, marginBottom: 30, paddingBottom: 20,
          borderBottom: `1px solid ${T.line}`
        }}>
          <div>
            <button
              onClick={onBrowseCatalog}
              style={{
                border: "none", background: "none", cursor: "pointer", color: T.plumMid,
                fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6,
                marginBottom: 8, padding: 0
              }}
            >
              <ArrowLeft size={16} /> Back to Dresses & Home
            </button>
            <h1 style={{
              fontSize: 26, fontWeight: 800, color: T.plum,
              fontFamily: "'Playfair Display', serif", margin: 0
            }}>
              Customer Portal
            </h1>
            <p style={{ color: T.textMuted, fontSize: 13.5, marginTop: 4 }}>
              Welcome back, <strong>{customer?.name || "Valued Customer"}</strong>! Manage your dress rentals and bookings here.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onBrowseCatalog} style={btnPrimary}>
              <Plus size={16} /> Book Another Dress
            </button>
            <button onClick={onSignOut} style={btnGhost}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Customer Profile & Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 30 }}>
          {/* Profile Card */}
          <div style={{
            background: T.card, borderRadius: 20, padding: 22,
            border: `1px solid ${T.line}`, boxShadow: "0 4px 15px rgba(61,31,73,0.03)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: `linear-gradient(135deg, ${T.plumMid}, ${T.lilac})`,
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 20
              }}>
                {customer?.name ? customer.name.charAt(0).toUpperCase() : "C"}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: T.plum, fontSize: 17 }}>{customer?.name || "Customer"}</div>
                <span style={{
                  background: T.blushSoft, color: T.plumMid, fontSize: 11,
                  fontWeight: 700, padding: "2px 8px", borderRadius: 999
                }}>
                  Verified Customer Account
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: T.text }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Mail size={15} color={T.textMuted} />
                <span>{customer?.email || "No email provided"}</span>
              </div>
              {customer?.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Phone size={15} color={T.textMuted} />
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer?.nic && (
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <ShieldCheck size={15} color={T.textMuted} />
                  <span>NIC: <strong>{customer.nic}</strong></span>
                </div>
              )}
              {customer?.address && (
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <MapPin size={15} color={T.textMuted} />
                  <span>{customer.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              background: T.card, borderRadius: 16, padding: "16px 20px",
              border: `1px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 700 }}>Total Bookings</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: T.plum, marginTop: 4 }}>{myBookings.length}</div>
              </div>
              <div style={{
                width: 42, height: 42, borderRadius: 12, background: T.blushSoft,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <ShoppingBag size={20} color={T.plumMid} />
              </div>
            </div>

            <div style={{
              background: T.card, borderRadius: 16, padding: "16px 20px",
              border: `1px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 700 }}>Rental Security Deposit Policy</div>
                <div style={{ fontSize: 12.5, color: T.text, marginTop: 4 }}>
                  Deposits are fully refunded upon inspection when returning undamaged.
                </div>
              </div>
              <ShieldCheck size={26} color={T.success} />
            </div>
          </div>
        </div>

        {/* My Bookings Section */}
        <div style={{
          background: T.card, borderRadius: 20, border: `1px solid ${T.line}`,
          overflow: "hidden", boxShadow: "0 4px 15px rgba(61,31,73,0.03)"
        }}>
          <div style={{
            padding: "18px 24px", borderBottom: `1px solid ${T.line}`,
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: T.plum, margin: 0 }}>
                My Dress Bookings &amp; Rental Requests
              </h2>
              <div style={{ fontSize: 12.5, color: T.textMuted, marginTop: 2 }}>
                Track approval, pickup dates, and return schedules
              </div>
            </div>
          </div>

          {myBookings.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: T.blushSoft,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
              }}>
                <ShoppingBag size={24} color={T.plumMid} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: T.plum }}>No Bookings Yet</h3>
              <p style={{ color: T.textMuted, fontSize: 13.5, maxWidth: 380, margin: "6px auto 18px" }}>
                You haven't requested any dress rentals yet. Browse our catalog and book the perfect dress for your special event!
              </p>
              <button onClick={onBrowseCatalog} style={btnPrimary}>
                Explore Dress Catalog
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.3, minWidth: 700 }}>
                <thead>
                  <tr style={{ background: T.bg }}>
                    {["Booking ID", "Dress Name", "Event Date", "Duration", "Collection", "Status", "Amount"].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: "12px 20px", color: T.textMuted,
                        fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3, borderBottom: `1px solid ${T.line}`
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myBookings.map((b) => (
                    <tr key={b.id} style={{ borderBottom: `1px solid ${T.line}` }}>
                      <td style={{ padding: "14px 20px", fontWeight: 700, color: T.plum }}>{b.id}</td>
                      <td style={{ padding: "14px 20px", fontWeight: 600 }}>{b.dress}</td>
                      <td style={{ padding: "14px 20px", color: T.text }}>{b.event}</td>
                      <td style={{ padding: "14px 20px", color: T.textMuted }}>{b.days ? `${b.days} Days` : "1 Day"}</td>
                      <td style={{ padding: "14px 20px", color: T.textMuted }}>{b.deliveryType === "delivery" ? "🚚 Courier" : "🏬 Store"}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <Badge status={b.status || "pending"} />
                      </td>
                      <td style={{ padding: "14px 20px", fontWeight: 700, color: T.plum }}>
                        Rs. {(b.total || b.rentalFee || 15000).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
