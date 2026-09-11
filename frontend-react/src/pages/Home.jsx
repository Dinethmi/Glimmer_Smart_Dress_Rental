import React, { useState, useEffect } from "react";
import { T, btnPrimary, btnGhost } from "../theme";
import { GlimmerLogo, DressArt } from "../components/common";
import DressCard from "../components/DressCard";
import CartDrawer from "../components/CartDrawer";
import CustomerBookingModal from "../components/CustomerBookingModal";
import Placeholder from "./Placeholder";
import { dresses as defaultDresses } from "../data/mockData";
import {
  ShoppingCart, Moon, Sun, Sparkles, ChevronRight, User,
  CalendarCheck, LogOut, Lock, AlertCircle, X, Check
} from "lucide-react";

/**
 * =========================================================================
 * HOME NAVBAR COMPONENT
 * =========================================================================
 * Navbar එක තුළ:
 * 1. Shopping Cart button එකෙහි සජීවීව Cart එකේ ඇති items ගණන පෙන්වයි.
 * 2. Guest user කෙනෙක් නම් "Sign In" සහ "Sign Up" buttons පෙන්වයි.
 * 3. Logged in customer කෙනෙක් නම් ඔහුගේ නම, "My Bookings" button එක සහ "Sign Out" button එක පෙන්වයි.
 */
const homeNav = ["Home", "Dress Catalog", "Occasions", "Contact"];

export function HomeNavbar({
  activeTab,
  setActiveTab,
  currentUser,
  cartCount = 0,
  onOpenCart,
  onSignIn,
  onSignUp,
  onSignOut,
  onOpenCustomerDashboard,
  theme,
  setTheme
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px", position: "relative", zIndex: 5,
    }} className="glm-home-nav">
      <GlimmerLogo />
      
      {/* Navigation Links */}
      <div className="glm-home-nav-pills" style={{
        display: "flex", alignItems: "center", gap: 4, background: "rgba(255, 255, 255, 0.08)",
        border: `1px solid rgba(255, 255, 255, 0.2)`, borderRadius: 999, padding: 5,
        backdropFilter: "blur(12px)"
      }}>
        {homeNav.map((n) => (
          <button key={n} onClick={() => setActiveTab(n)} style={{
            border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 999,
            fontSize: 13, fontWeight: 600, fontFamily: "Manrope",
            background: activeTab === n ? "rgba(255,255,255,0.9)" : "transparent",
            color: activeTab === n ? T.plumDeep : "#fff",
            textShadow: activeTab !== n ? "0 1px 3px rgba(0,0,0,0.4)" : "none"
          }}>{n}</button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="glm-home-nav-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Active Shopping Cart Button */}
        <button
          onClick={onOpenCart}
          title="View Shopping Cart"
          style={{
            border: `1px solid rgba(255, 255, 255, 0.35)`, background: "rgba(0,0,0,0.15)", color: "#fff",
            position: "relative", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%", backdropFilter: "blur(8px)", transition: "transform 0.15s"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <ShoppingCart size={16} />
          {cartCount > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4, background: T.blush, color: T.plumDeep,
              fontSize: 10.5, fontWeight: 800, width: 18, height: 18, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
            }}>
              {cartCount}
            </div>
          )}
        </button>

        {/* Theme Toggle (Light / Dark) */}
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} style={{
          border: `1px solid rgba(255, 255, 255, 0.35)`, background: "rgba(0,0,0,0.1)", color: "#fff",
          fontWeight: 700, fontSize: 13, padding: "8px", borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, backdropFilter: "blur(8px)",
          transition: "transform 0.2s"
        }}>
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} color="#FFDF73" />}
        </button>

        {/* Dynamic User Authentication State */}
        {currentUser ? (
          // Logged In Customer View
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={onOpenCustomerDashboard}
              style={{
                border: "1px solid rgba(212, 175, 55, 0.6)", background: "rgba(212, 175, 55, 0.15)",
                color: "#FFF5C3", fontWeight: 700, fontSize: 12.5, padding: "7px 14px",
                borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                backdropFilter: "blur(8px)"
              }}
            >
              <User size={14} color="#D4AF37" />
              <span>{currentUser.name ? currentUser.name.split(" ")[0] : "Account"}</span>
            </button>

            <button
              onClick={onOpenCustomerDashboard}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.3)", background: "rgba(255, 255, 255, 0.12)",
                color: "#fff", fontWeight: 700, fontSize: 12.5, padding: "7px 14px",
                borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                backdropFilter: "blur(8px)"
              }}
            >
              <CalendarCheck size={14} />
              <span>My Bookings</span>
            </button>

            <button
              onClick={onSignOut}
              title="Sign Out"
              style={{
                border: "none", background: "rgba(255, 255, 255, 0.1)", color: "#fff",
                cursor: "pointer", padding: "8px", borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center"
              }}
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          // Guest View (Not Logged In)
          <>
            <button onClick={onSignIn} style={{
              border: "none", background: "transparent", color: "#fff", fontWeight: 700,
              fontSize: 13.5, cursor: "pointer", fontFamily: "Manrope", textShadow: "0 1px 3px rgba(0,0,0,0.4)"
            }}>Sign In</button>
            
            <button onClick={onSignUp} style={{
              border: `1px solid rgba(255, 255, 255, 0.4)`, background: "rgba(255,255,255,0.15)", color: "#fff",
              fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 999, cursor: "pointer", backdropFilter: "blur(8px)"
            }}>Sign Up</button>
          </>
        )}

        {activeTab !== "Home" && (
          <button onClick={() => setActiveTab("Dress Catalog")} style={{
            ...btnPrimary, borderRadius: 999, padding: "10px 18px",
          }}>Explore Dresses</button>
        )}
      </div>
    </div>
  );
}

const HERO_SLIDES = [
  { src: "/modern-trend-dress.jpg", title: "Champagne Glamour", tag: "New Arrival" },
  { src: "/emerald-dress.jpg", title: "Emerald Elegance", tag: "Trending Now" },
  { src: "/sapphire-dress.jpg", title: "Sapphire Radiance", tag: "Exclusive" },
];

/**
 * =========================================================================
 * PUBLIC HOME & CATALOG EXPERIENCE
 * =========================================================================
 * මෙම Component එක මඟින්:
 * 1. Landing Hero carousel සහ Collection Cards පෙන්වයි.
 * 2. Dress Card වල "Add to Cart" ක්ලික් කළ විට Shopping Cart එකට dress එක එක් කරයි.
 * 3. Shopping Cart Drawer විවෘත කිරීම, quantity වෙනස් කිරීම සහ checkout පහසුකම් සලසයි.
 */
export default function Home({
  currentUser,
  cart = [],
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  onSignIn,
  onSignUp,
  onSignOut,
  onOpenCustomerDashboard,
  onNewBooking,
  theme,
  setTheme,
  dresses = defaultDresses
}) {
  const [activeTab, setActiveTab] = useState("Home");
  const [slideIdx, setSlideIdx] = useState(0);

  // Toast Notification State: { type: 'success' | 'error' | 'warning', text: string } | null
  const [toast, setToast] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  // Total items in cart
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    if (activeTab !== "Home") return;
    const t = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(t);
  }, [activeTab]);

  // Handle adding an item to cart with validation responses
  const handleAddToCart = (dress) => {
    if (onAddToCart) {
      const res = onAddToCart(dress);
      if (res && !res.success) {
        if (res.type === "auth_required") {
          setShowGuestPrompt(true);
        }
        // Show error / warning notification
        setToast({ type: res.type || "error", text: res.error });
        setTimeout(() => setToast(null), 3800);
      } else if (res && res.success) {
        // Show success notification
        setToast({ type: "success", text: res.message });
        setTimeout(() => setToast(null), 2800);
      }
      return res;
    }
  };

  // Handle Proceed to Checkout from Cart
  const handleCartCheckout = () => {
    setIsCartOpen(false);
    if (!currentUser) {
      // Prompt user to sign in or create an account to finalize rental
      onSignIn();
    } else {
      // If customer is logged in, navigate to Customer Dashboard
      onOpenCustomerDashboard();
    }
  };

  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative" }}>
      {/* Dynamic Toast Notification (Success / Error / Warning) */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 120,
          background: toast.type === "error" ? "#361715" : toast.type === "warning" ? "#38240D" : T.plumDeep,
          color: "#fff", padding: "12px 20px", borderRadius: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)", display: "flex", alignItems: "center",
          gap: 10, fontSize: 13.5, fontWeight: 700,
          border: toast.type === "error" ? `1px solid ${T.danger}` : toast.type === "warning" ? `1px solid ${T.warning}` : "1px solid rgba(212,175,55,0.4)"
        }}>
          {toast.type === "error" || toast.type === "warning" ? (
            <AlertCircle size={18} color={toast.type === "error" ? "#FF8A80" : "#EDB25A"} />
          ) : (
            <Check size={18} color="#D4AF37" />
          )}
          <span>{toast.text}</span>
          {toast.type === "success" && (
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                marginLeft: 8, background: "rgba(255,255,255,0.15)", border: "none",
                color: "#FFF5C3", padding: "4px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12
              }}
            >
              View Cart
            </button>
          )}
        </div>
      )}

      {/* Hero Header Section */}
      <div style={{
        background: `linear-gradient(170deg, #5c0f1c 0%, #29050d 100%)`,
        paddingBottom: activeTab === "Home" ? 90 : 20, position: "relative", overflow: "hidden",
      }}>
        {/* Glitter Noise Overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.25, mixBlendMode: "color-dodge", pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        
        {/* Glowing Orbs */}
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent 60%)",
          top: -150, right: -100, filter: "blur(40px)"
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(235, 223, 242, 0.1), transparent 60%)",
          bottom: -100, left: -50, filter: "blur(30px)"
        }} />

        {activeTab === "Home" && (
          <div className="glm-hero-art" style={{
            position: "absolute", right: "2%", top: 110, width: "40%", height: "calc(100% - 110px)", pointerEvents: "none"
          }}>
            {HERO_SLIDES.map((s, i) => (
              <DressArt key={s.src} src={s.src} opacity={i === slideIdx ? 1 : 0} style={{ position: "absolute", inset: 0 }} />
            ))}
          </div>
        )}

        {/* Navbar with Live Cart Count */}
        <HomeNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onSignIn={onSignIn}
          onSignUp={onSignUp}
          onSignOut={onSignOut}
          onOpenCustomerDashboard={onOpenCustomerDashboard}
          theme={theme}
          setTheme={setTheme}
        />

        {activeTab === "Home" && (
          <>
            <div style={{ textAlign: "center", padding: "56px 20px 0", position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700,
                color: "#EBDFF2", background: "rgba(255, 255, 255, 0.1)", padding: "6px 14px",
                borderRadius: 999, marginBottom: 20, border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)", boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}><Sparkles size={13} color="#D4AF37" /> Trusted by 1,240+ brides &amp; brands island-wide</div>

              <div style={{ position: "relative", height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {HERO_SLIDES.map((s, i) => (
                  <div key={s.src} style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    opacity: i === slideIdx ? 1 : 0,
                    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
                    transform: i === slideIdx ? "translateY(0)" : "translateY(10px)",
                    pointerEvents: i === slideIdx ? "auto" : "none"
                  }}>
                    <div className="gold-text" style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>
                      {s.tag}
                    </div>
                    <div className="gold-text" style={{
                      fontFamily: "'Playfair Display', serif", fontWeight: 700,
                      fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15,
                    }}>
                      {s.title},
                      <br />
                      <span style={{ fontStyle: "italic" }}>For Every Occasion</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ color: "#EBDFF2", fontSize: 15, marginTop: 18, maxWidth: 520, marginInline: "auto", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                Browse Glimmer's curated collection of bridal, evening and party gowns — rent the dress,
                keep the memory.
              </div>
            </div>

            <div style={{ marginTop: 38, display: "flex", justifyContent: "center", position: "relative", zIndex: 2 }}>
              <button className="btn-gold-shiny" onClick={() => setActiveTab("Dress Catalog")} style={{
                padding: "16px 36px", fontSize: 15
              }}>
                Explore Collection
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 26px 70px" }}>
        {activeTab === "Dress Catalog" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif" }}>Our Collection</div>
                <div style={{ fontSize: 14.5, color: T.textMuted, marginTop: 6 }}>
                  Explore our full range of elegant dresses. Click <strong>"Add to Cart"</strong> on any dress to collect items for your rental.
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
              {/* Sidebar Filter Menu */}
              <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                {[
                  { label: "View All Styles", arrow: false },
                  { label: "Category", arrow: true },
                  { label: "The Fall Edit", arrow: true },
                  { label: "Occasion", arrow: true },
                  { label: "Premium Styles", arrow: false },
                  { label: "Collections", arrow: true },
                  { label: "Maternity", arrow: false },
                  { label: "Size + Fit", arrow: true },
                  { label: "Discover Brands", arrow: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: `1px solid ${T.line}`, cursor: "pointer",
                    color: i === 0 ? T.plumDeep : T.text, fontWeight: i === 0 ? 700 : 500,
                    fontSize: 14.5
                  }}>
                    {item.label}
                    {item.arrow && <ChevronRight size={16} color={T.danger} strokeWidth={1.5} />}
                  </div>
                ))}
              </div>
              
              {/* Dress Grid with Add to Cart hook */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 20 }}>
                  {dresses.map((d) => (
                    <DressCard
                      key={d.code}
                      d={d}
                      isInCart={cart.some((item) => item.code === d.code)}
                      onAddToCart={() => handleAddToCart(d)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : activeTab === "Home" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif" }}>Discover Our Collections</h2>
              <p style={{ color: T.textMuted, marginTop: 8 }}>From enchanting bridal wear to dazzling party gowns</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              <div style={{ height: 400, borderRadius: 16, background: "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600') center/cover", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                  <h3 style={{ fontSize: 22, margin: 0, fontFamily: "'Playfair Display', serif" }}>Bridal</h3>
                </div>
              </div>
              <div style={{ height: 400, borderRadius: 16, background: "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=600') center/cover", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                  <h3 style={{ fontSize: 22, margin: 0, fontFamily: "'Playfair Display', serif" }}>Evening</h3>
                </div>
              </div>
              <div style={{ height: 400, borderRadius: 16, background: "url('/party-dress.jpg') center/cover", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                  <h3 style={{ fontSize: 22, margin: 0, fontFamily: "'Playfair Display', serif" }}>Party</h3>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <button className="btn-gold-shiny" onClick={() => setActiveTab("Dress Catalog")} style={{ margin: "0 auto", padding: "14px 28px", fontSize: 15 }}>
                Explore Full Catalog
              </button>
            </div>
            
            {/* About Us Section */}
            <div style={{ margin: "60px auto 0", maxWidth: 1100, textAlign: "center", padding: "0 20px" }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif", marginBottom: 20 }}>About Glimmer</h2>
              <p style={{ color: T.text, fontSize: 16.5, lineHeight: 1.8, marginBottom: 16, textAlign: "justify" }}>
                Glimmer Smart Dress Rental is your premier destination for high-quality, elegant dresses for every special occasion. 
                We believe that everyone deserves to look and feel their best without the commitment of purchasing an expensive outfit they might only wear once.
              </p>
              <p style={{ color: T.text, fontSize: 16.5, lineHeight: 1.8, textAlign: "justify" }}>
                With our curated collection of bridal gowns, evening wear, and party dresses, you can step into the spotlight with confidence. 
                Our easy booking process and reliable service ensure a seamless experience from selection to return.
              </p>
            </div>
          </>
        ) : (
          <Placeholder title={activeTab} />
        )}
      </div>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveFromCart}
        onClearCart={onClearCart}
        onCheckout={handleCartCheckout}
      />

      {/* Guest Account Required Modal */}
      {showGuestPrompt && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(15, 6, 20, 0.72)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div style={{
            background: T.card, borderRadius: 24, maxWidth: 440, width: "100%",
            border: `1px solid ${T.gold}`, padding: 32, textAlign: "center",
            boxShadow: "0 25px 60px rgba(0,0,0,0.35)", position: "relative"
          }}>
            <button
              onClick={() => setShowGuestPrompt(false)}
              style={{
                position: "absolute", top: 16, right: 16, background: "transparent",
                border: "none", cursor: "pointer", color: T.textMuted
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: "rgba(212, 175, 55, 0.15)",
              color: T.plumDeep, display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Lock size={26} color={T.plumDeep} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>
              Customer Account Required
            </h3>
            <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.6, marginBottom: 24 }}>
              To add designer dresses to your cart and reserve rentals, please create a customer account or sign in to your existing account.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                className="btn-gold-shiny"
                onClick={() => {
                  setShowGuestPrompt(false);
                  onSignUp();
                }}
                style={{
                  width: "100%", padding: "12px 18px", fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                <Sparkles size={16} /> Create Customer Account
              </button>

              <button
                onClick={() => {
                  setShowGuestPrompt(false);
                  onSignIn();
                }}
                style={{
                  ...btnGhost,
                  width: "100%", padding: "11px 18px", fontSize: 14,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                <User size={16} /> Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
