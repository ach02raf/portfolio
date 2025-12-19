"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./FeedbackPopup.scss";

interface FeedbackPopupProps {
  translations: {
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    advicePlaceholder: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    ratingLabel: string;
  };
  /** Show when user scrolls past this percent of the page (default: 80). Set to false to disable. */
  triggerOnScroll?: boolean;
  triggerScrollPercent?: number;
  /** Show after N milliseconds (optional). */
  triggerAfterMs?: number;
  /** Show when user moves cursor toward closing the tab (optional). */
  triggerOnExitIntent?: boolean;
  /** Show when a specific section comes into view (pass section id). */
  triggerOnSectionId?: string;
  /** IntersectionObserver threshold (0-1) for section trigger. */
  triggerSectionThreshold?: number;
  /** Listen for a global event `open-feedback-popup` to open programmatically. */
  listenForOpenEvent?: boolean;
}

export default function FeedbackPopup({
  translations,
  triggerOnScroll = true,
  triggerScrollPercent = 80,
  triggerAfterMs,
  triggerOnExitIntent,
  triggerOnSectionId,
  triggerSectionThreshold = 0.3,
  listenForOpenEvent = true,
}: FeedbackPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [advice, setAdvice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const tryShow = useCallback(() => {
    if (hasShown) return;
    setIsVisible(true);
    setHasShown(true);
  }, [hasShown]);

  useEffect(() => {
    if (!triggerOnScroll) return;

    const handleScroll = () => {
      if (hasShown) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= triggerScrollPercent) {
        tryShow();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown, triggerOnScroll, triggerScrollPercent, tryShow]);

  useEffect(() => {
    if (!triggerOnSectionId || hasShown) return;
    const target = document.getElementById(triggerOnSectionId);
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some(
            (entry) => entry.isIntersecting && entry.intersectionRatio >= triggerSectionThreshold
          )
        ) {
          tryShow();
        }
      },
      { threshold: triggerSectionThreshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerOnSectionId, triggerSectionThreshold, hasShown, tryShow]);

  useEffect(() => {
    if (!triggerAfterMs || hasShown) return;
    const timer = setTimeout(() => {
      tryShow();
    }, triggerAfterMs);
    return () => clearTimeout(timer);
  }, [triggerAfterMs, hasShown, tryShow]);

  useEffect(() => {
    if (!triggerOnExitIntent || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        tryShow();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [triggerOnExitIntent, hasShown, tryShow]);

  // Optional: allow any component to open the popup via a custom event
  // This should work multiple times, independent of auto-trigger state
  useEffect(() => {
    if (!listenForOpenEvent) return;
    const onOpen = () => {
      setIsVisible(true);
    };
    // Cast to satisfy TS since this is a custom event name
    window.addEventListener("open-feedback-popup" as any, onOpen as EventListener);
    return () => window.removeEventListener("open-feedback-popup" as any, onOpen as EventListener);
  }, [listenForOpenEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rating,
          advice,
        }),
      });

      if (!response.ok) throw new Error("Failed to send feedback");

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setName("");
      setEmail("");
      setRating(0);
      setAdvice("");
      setIsVisible(false);
      setSubmitStatus(null);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="feedback-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <motion.div
            className="feedback-popup-container"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 20 }}>
            <button className="feedback-close-btn" onClick={handleClose} aria-label="Close">
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <motion.h2
              className="feedback-title"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              {translations.title}
            </motion.h2>

            <form onSubmit={handleSubmit} className="feedback-form">
              <motion.div
                className="rating-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                <label className="rating-label">{translations.ratingLabel}</label>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= (hoveredRating || rating) ? "active" : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}>
                      <FontAwesomeIcon icon={faStar} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.input
                type="text"
                placeholder={translations.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="feedback-input"
                required
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              />

              <motion.input
                type="email"
                placeholder={translations.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="feedback-input"
                required
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              />

              <motion.textarea
                placeholder={translations.advicePlaceholder}
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="feedback-textarea"
                rows={4}
                required
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              />

              <motion.button
                type="submit"
                className="feedback-submit-btn"
                disabled={isSubmitting || rating === 0}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                {isSubmitting ? "..." : translations.submitButton}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
