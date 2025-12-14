"use client";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/gtag";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ga-consent");
    setVisible(stored !== "granted");
  }, []);

  const accept = () => {
    try {
      (window as any).gtag?.("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        security_storage: "granted",
      });
    } catch {}
    localStorage.setItem("ga-consent", "granted");
    trackEvent("consent_accept", { category: "privacy" });
    setVisible(false);
  };

  const decline = () => {
    try {
      (window as any).gtag?.("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        security_storage: "granted",
      });
    } catch {}
    localStorage.setItem("ga-consent", "denied");
    trackEvent("consent_decline", { category: "privacy" });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Privacy preferences"
      style={{
        position: "fixed",
        inset: "auto 16px 16px 16px",
        zIndex: 10000,
        padding: "12px 16px",
        borderRadius: 12,
        backdropFilter: "blur(6px)",
        background: "var(--card-bg, rgba(255,255,255,0.75))",
        boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
        color: "var(--text, #111)",
      }}>
      <p style={{ margin: 0, marginBottom: 10 }}>
        We use analytics to improve your experience. You can accept or decline.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={decline}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.1)",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}>
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: "var(--accent, #7047C2)",
            color: "white",
            cursor: "pointer",
          }}>
          Accept
        </button>
      </div>
    </div>
  );
}
