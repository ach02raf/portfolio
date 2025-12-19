"use client";

import { motion } from "framer-motion";
import "./FeedbackInvite.scss";

type FeedbackInviteCopy = {
  title: string;
  text: string;
  button: string;
};

export default function FeedbackInvite({ copy }: { copy: FeedbackInviteCopy }) {
  const openPopup = () => {
    const evt = new Event("open-feedback-popup");
    window.dispatchEvent(evt);
  };

  return (
    <section className="feedback-invite" aria-label="Feedback invite">
      <div className="feedback-invite__container">
        <motion.h2
          className="feedback-invite__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}>
          {copy.title}
        </motion.h2>

        <motion.p
          className="feedback-invite__text"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          viewport={{ once: true }}>
          {copy.text}
        </motion.p>

        <motion.button
          type="button"
          className="feedback-invite__btn"
          onClick={openPopup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}>
          {copy.button}
        </motion.button>
      </div>
    </section>
  );
}
