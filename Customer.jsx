// ============================================================================
// CUSTOMER & PUBLIC PAGE REFERENCE CODES
// This file contains all the React components used for the Customer side
// (Home Page, Public Catalog, Authentication, Navbar) for easy reference.
// ============================================================================

import React, { useState, useEffect } from "react";
import { ShoppingCart, Moon, Sun, Sparkles, ChevronRight } from "lucide-react";

/* --- 1. HOME NAVBAR COMPONENT --- */
export function HomeNavbar({ activeTab, setActiveTab, user, onSignIn, onSignOut, theme, setTheme, onSignUp }) {
  const homeNav = ["Home", "Dress Catalog", "Occasions", "Contact"];
  
  return (
    <div className="glm-home-nav">
      {/* Brand Logo */}
      <div className="logo">Glimmer</div>
      
      {/* Navigation Links */}
      <div className="glm-home-nav-pills">
        {homeNav.map((n) => (
          <button 
            key={n} 
            onClick={() => setActiveTab(n)}
            className={activeTab === n ? "active" : ""}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Actions (Login, Cart, Theme) */}
      <div className="glm-home-nav-actions">
        {/* Shopping Cart */}
        <button><ShoppingCart size={15} /> <span className="badge">2</span></button>
        
        {/* Theme Toggle */}
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} color="#FFDF73" />}
        </button>
        
        {/* Authentication State */}
        {user ? (
          <>
            <span>Hello, {user.name || user.email.split('@')[0]}</span>
            <button onClick={onSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={onSignIn}>Sign In</button>
            <button onClick={onSignUp}>Sign Up</button>
          </>
        )}
        
        {/* Call to Action */}
        {activeTab !== "Home" && (
          <button onClick={() => {
            if (!user) onSignIn();
            else alert("Booking functionality coming soon!");
          }}>Book a Dress</button>
        )}
      </div>
    </div>
  );
}

/* --- 2. HOME PAGE / CATALOG FOR CUSTOMERS --- */
export function HomePage({ user, onSignIn, onSignOut, onSignUp, theme, setTheme }) {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div>
      <HomeNavbar 
        user={user} onSignOut={onSignOut} 
        activeTab={activeTab} setActiveTab={setActiveTab} 
        onSignIn={onSignIn} onSignUp={onSignUp} 
        theme={theme} setTheme={setTheme} 
      />

      {activeTab === "Home" && (
        <div className="hero-section">
          <h1>Champagne Glamour, <br/> For Every Occasion</h1>
          <p>Browse Glimmer's curated collection of bridal, evening and party gowns — rent the dress, keep the memory.</p>
          <button onClick={() => setActiveTab("Dress Catalog")}>Book Now</button>
        </div>
      )}

      {activeTab === "Dress Catalog" && (
        <div className="catalog-section">
          <h2>Our Collection</h2>
          
          <div className="grid">
            {/* Display dresses. If user is logged in, they can book. If not, they must sign in. */}
            {dresses.map((d) => (
              <div key={d.code} className="dress-card">
                <h3>{d.name}</h3>
                <button onClick={() => {
                  if (!user) onSignIn();
                  else alert("Added to cart! (Booking flow coming soon)");
                }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 3. AUTHENTICATION PAGE (LOGIN / SIGNUP) --- */
export function AuthPage({ onBack, onAuth, type = "login" }) {
  const [authType, setAuthType] = useState(type);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  
  const handleAuth = async () => {
    if (authType === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const endpoint = authType === "login" ? "/api/auth/login" : "/api/auth/register";
    const bodyPayload = authType === "login" 
      ? { email, password } 
      : { email, password, role: 'customer', name, nic, whatsapp, address };
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      const data = await response.json();
      
      if (response.ok) {
        onAuth(data.user);
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{authType === "login" ? "Welcome back" : "Create an Account"}</h2>
      
      {error && <div className="error-message">{error}</div>}

      {authType === "signup" && (
        <>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
          <input value={nic} onChange={e => setNic(e.target.value)} placeholder="NIC / Passport Number" />
          <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="Whatsapp Number" />
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
        </>
      )}

      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      
      {authType === "signup" && (
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
      )}

      <button onClick={handleAuth}>{authType === "login" ? "Sign In" : "Sign Up"}</button>
      
      <button onClick={() => setAuthType(authType === "login" ? "signup" : "login")}>
        {authType === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
      </button>
    </div>
  );
}

/* --- 4. MAIN APP ROUTING LOGIC --- */
export function GlimmerApp() {
  const [view, setView] = useState("home"); // home | login | shell | signup
  const [user, setUser] = useState(null);

  return (
    <div>
      {/* 1. Show Home Dashboard */}
      {view === "home" && (
        <HomePage 
          user={user} 
          onSignOut={() => setUser(null)}
          onSignIn={() => setView("login")} 
          onSignUp={() => setView("signup")} 
        />
      )}

      {/* 2. Show Login / Signup Page */}
      {(view === "login" || view === "signup") && (
        <AuthPage 
          type={view} 
          onAuth={(loggedInUser) => {
            setUser(loggedInUser);
            // Route based on role: Admins go to 'shell', Customers stay on 'home'
            if (loggedInUser.role === 'admin' || loggedInUser.role === 'staff') {
              setView("shell");
            } else {
              setView("home"); 
            }
          }} 
          onBack={() => setView("home")} 
        />
      )}

      {/* 3. Show Admin Shell (Only if admin/staff) */}
      {view === "shell" && user?.role !== 'customer' && (
        <AdminShell user={user} onExit={() => { setUser(null); setView("home"); }} />
      )}
    </div>
  );
}
