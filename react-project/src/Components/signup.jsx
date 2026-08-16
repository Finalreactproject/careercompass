import { useState } from "react";

function Signup({ onLogin, onClose }) {
  const [role, setRole] = useState("jobSeeker");

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(10, 4, 30, 0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
      animation: "fadeIn 0.2s ease",
    },
    card: {
      background: "linear-gradient(160deg, #1e0a4a 0%, #2d1b69 100%)",
      border: "1px solid rgba(167,139,250,0.25)",
      borderRadius: "22px",
      padding: "48px 40px 40px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
      textAlign: "center",
      color: "#fff",
      position: "relative",
      animation: "slideUp 0.25s ease",
    },
    closeBtn: {
      position: "absolute",
      top: "16px",
      right: "18px",
      background: "rgba(255,255,255,0.08)",
      border: "none",
      color: "rgba(255,255,255,0.6)",
      fontSize: "18px",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.2s",
      lineHeight: 1,
    },
    logo: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#fff",
      letterSpacing: "-0.5px",
      margin: "0 0 4px",
    },
    tagline: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.5)",
      margin: "0 0 28px",
      letterSpacing: "0.5px",
    },
    roleGroup: {
      display: "flex",
      gap: "10px",
      marginBottom: "26px",
    },
    roleBtn: (active) => ({
      flex: 1,
      padding: "10px 10px",
      borderRadius: "10px",
      border: active ? "2px solid #a78bfa" : "2px solid rgba(255,255,255,0.12)",
      background: active ? "rgba(167,139,250,0.2)" : "transparent",
      color: active ? "#c4b5fd" : "rgba(255,255,255,0.5)",
      fontSize: "12.5px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    heading: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#e9d5ff",
      margin: "0 0 18px",
    },
    input: {
      width: "100%",
      padding: "13px 16px",
      marginBottom: "12px",
      borderRadius: "10px",
      border: "1.5px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.07)",
      color: "#fff",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s ease",
    },
    loginBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "6px",
      transition: "opacity 0.2s ease",
      letterSpacing: "0.3px",
      boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .signup-input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>

      <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div style={styles.card}>

          {onClose && (
            <button style={styles.closeBtn} onClick={onClose}>✕</button>
          )}

          <h1 style={styles.logo}>CareerCompass</h1>
          <p style={styles.tagline}>Find. Grow. Go.</p>

          <div style={styles.roleGroup}>
            <button style={styles.roleBtn(role === "jobSeeker")} onClick={() => setRole("jobSeeker")}>
              Student / Intern / Job Seeker
            </button>
            <button style={styles.roleBtn(role === "recruiter")} onClick={() => setRole("recruiter")}>
              Recruiter
            </button>
          </div>

          <h2 style={styles.heading}>
            {role === "jobSeeker" ? "Job Seeker Login" : "Recruiter Login"}
          </h2>

          <input
            className="signup-input"
            style={styles.input}
            placeholder="Email"
            type="email"
            onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
          />
          <input
            className="signup-input"
            style={styles.input}
            type="password"
            placeholder="Password"
            onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
          />

          <button
            style={styles.loginBtn}
            onClick={() => onLogin(role === "jobSeeker" ? "student" : "recruiter")}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Login
          </button>

        </div>
      </div>
    </>
  );
}

export default Signup;
