import React, { useState, useEffect } from "react";
import { T, btnPrimary, btnGhost } from "../theme";
import {
  ShieldCheck, UserPlus, Users, Mail, Lock, Phone,
  CheckCircle2, AlertCircle, X, Shield, Key
} from "lucide-react";

/**
 * =========================================================================
 * USERS & ROLES MANAGEMENT (ADMIN ONLY)
 * =========================================================================
 * මෙම Component එක මඟින්:
 * 1. Admin හට store එකෙහි සේවය කරන Staff සාමාජිකයින්ගේ විස්තර බැලිය හැක.
 * 2. Admin හට නව Staff accounts සාදා දිය හැක (+ Add Staff Member).
 * 3. සාදන ලද Staff account එකෙහි Email සහ Password භාවිතා කර, එම Staff
 *    සාමාජිකයාට සාමාන්‍ය Sign In පිටුවෙන්ම Dashboard එකට Login විය හැක.
 */

const DEFAULT_STAFF = [
  { id: "u-1", name: "Sarah Fernando", email: "admin@glimmer.lk", role: "admin", phone: "077 111 2233", status: "Active" },
  { id: "u-2", name: "Store Associate", email: "staff@glimmer.lk", role: "staff", phone: "077 333 4455", status: "Active" }
];

export default function UsersAndRoles() {
  const [users, setUsers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("glimmer_staff_accounts") || "[]");
      return [...DEFAULT_STAFF, ...saved];
    } catch {
      return DEFAULT_STAFF;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("staff");
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success' | 'error', text: string }

  // Load from backend if available
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        }
      })
      .catch((err) => console.log("Backend users offline, using local list:", err.message));
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setStatusMsg({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check duplicate
    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      setStatusMsg({ type: "error", text: "A user with this email address already exists." });
      return;
    }

    const newStaffUser = {
      id: "staff-" + Date.now(),
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      phone: phone.trim(),
      role: role,
      status: "Active"
    };

    try {
      // Send to backend API
      const res = await fetch("http://localhost:5000/api/auth/create-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaffUser)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create staff account");
      }
    } catch (err) {
      console.log("Saving locally to localStorage:", err.message);
    }

    // Save locally
    const existingSaved = JSON.parse(localStorage.getItem("glimmer_staff_accounts") || "[]");
    localStorage.setItem("glimmer_staff_accounts", JSON.stringify([...existingSaved, newStaffUser]));

    setUsers((prev) => [...prev, newStaffUser]);
    setStatusMsg({
      type: "success",
      text: `Staff account for "${name}" created! They can now sign in using the normal Sign In page with ${trimmedEmail}.`
    });

    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("staff");
    setTimeout(() => {
      setShowModal(false);
      setStatusMsg(null);
    }, 2800);
  };

  return (
    <div style={{ padding: "28px 36px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: T.plum, fontFamily: "'Playfair Display', serif", margin: 0 }}>
            Users & Roles Management
          </h1>
          <p style={{ color: T.textMuted, fontSize: 14, marginTop: 6, maxWidth: 650 }}>
            Create and oversee staff credentials. Staff members do not self-register; they use the credentials you provide to log in directly via the standard Sign In page.
          </p>
        </div>

        <button
          onClick={() => { setShowModal(true); setStatusMsg(null); }}
          className="btn-gold-shiny"
          style={{ padding: "11px 20px", fontSize: 13.5, display: "flex", alignItems: "center", gap: 8 }}
        >
          <UserPlus size={16} /> + Add Staff Member
        </button>
      </div>

      {/* Staff User Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {users.map((u, i) => (
          <div
            key={u._id || u.id || i}
            style={{
              background: T.card, borderRadius: 16, border: `1px solid ${T.line}`,
              padding: 22, boxShadow: "0 4px 14px rgba(0,0,0,0.03)", position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: u.role === "admin" ? "rgba(212, 175, 55, 0.15)" : "rgba(61, 31, 73, 0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: u.role === "admin" ? "#8C7118" : T.plumMid
              }}>
                {u.role === "admin" ? <Shield size={22} /> : <Users size={22} />}
              </div>

              <span style={{
                padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                background: u.role === "admin" ? "rgba(212, 175, 55, 0.18)" : "rgba(61, 31, 73, 0.12)",
                color: u.role === "admin" ? "#8C7118" : T.plumMid,
                border: `1px solid ${u.role === "admin" ? "#D4AF37" : T.plum}`
              }}>
                {u.role}
              </span>
            </div>

            <div style={{ fontSize: 16, fontWeight: 800, color: T.plum }}>{u.name}</div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={13} /> {u.email}
            </div>
            {u.phone && (
              <div style={{ fontSize: 12.5, color: T.textMuted, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <Phone size={13} /> {u.phone}
              </div>
            )}

            <div style={{
              marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${T.line}`,
              display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12
            }}>
              <span style={{ color: T.success, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                <CheckCircle2 size={13} /> Active Access
              </span>
              <span style={{ color: T.textMuted, fontSize: 11 }}>Normal Sign-In Enabled</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Staff Account */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(15, 6, 20, 0.65)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div style={{
            background: T.card, borderRadius: 22, maxWidth: 480, width: "100%",
            border: `1px solid ${T.line}`, padding: 30, boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            position: "relative"
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute", top: 18, right: 18, background: "transparent",
                border: "none", cursor: "pointer", color: T.textMuted
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: "rgba(212, 175, 55, 0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", color: T.plumDeep
              }}>
                <Key size={20} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: T.plum, margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Add New Staff Member
              </h3>
            </div>
            <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20 }}>
              Create credentials for store employees. They can sign in normally through the standard login page.
            </p>

            {statusMsg && (
              <div style={{
                marginBottom: 16, padding: "10px 14px", borderRadius: 10, fontSize: 12.5, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 8,
                background: statusMsg.type === "success" ? T.successBg : T.dangerBg,
                color: statusMsg.type === "success" ? T.success : T.danger,
                border: `1px solid ${statusMsg.type === "success" ? T.success : T.danger}`
              }}>
                {statusMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaff} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: T.text, display: "block", marginBottom: 5 }}>
                  Full Name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kasun Perera"
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${T.line}`,
                    background: T.bg, fontSize: 13.5, color: T.text, outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: T.text, display: "block", marginBottom: 5 }}>
                  Staff Email Address (Login Username) *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. kasun@glimmer.lk"
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${T.line}`,
                    background: T.bg, fontSize: 13.5, color: T.text, outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: T.text, display: "block", marginBottom: 5 }}>
                  Temporary Password *
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${T.line}`,
                    background: T.bg, fontSize: 13.5, color: T.text, outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: T.text, display: "block", marginBottom: 5 }}>
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${T.line}`,
                      background: T.bg, fontSize: 13.5, color: T.text, outline: "none", boxSizing: "border-box"
                    }}
                  >
                    <option value="staff">Staff Associate</option>
                    <option value="manager">Store Manager</option>
                    <option value="inventory">Inventory Clerk</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: T.text, display: "block", marginBottom: 5 }}>
                    Contact Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07X XXXXXXX"
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${T.line}`,
                      background: T.bg, fontSize: 13.5, color: T.text, outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ ...btnGhost, padding: "10px 18px", fontSize: 13 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold-shiny"
                  style={{ padding: "10px 20px", fontSize: 13 }}
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
