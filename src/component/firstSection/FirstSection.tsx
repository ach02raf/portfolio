"use client";
import Image from "next/image";
import "./firstSection.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function AnimatedText({ text, isMobile }: { text: string; isMobile: boolean }) {
  const [displayText, setDisplayText] = useState(isMobile ? text : "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // On mobile, show full text immediately - no typewriter
    if (isMobile) {
      setDisplayText(text);
      return;
    }

    // Desktop: typewriter animation
    let timer: NodeJS.Timeout;
    const fullText = text;

    if (!isDeleting && displayText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
      timer = setTimeout(() => {}, 500);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? fullText.substring(0, displayText.length - 1)
            : fullText.substring(0, displayText.length + 1)
        );
        setTypingSpeed(isDeleting ? 75 : 150);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, typingSpeed, loopNum, isMobile]);

  // Mobile: word-by-word animation with full text visible
  if (isMobile) {
    const words = text.split(" ");
    return (
      <span className="animated-text">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{
              opacity: [0, 1, 1, 0.85, 1],
              filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"],
              y: [0, 0, -2, 0, -2, 0],
            }}
            transition={{
              duration: 3,
              delay: index * 0.08,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            style={{ display: "inline-block", marginRight: "0.3em" }}>
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      className="animated-text">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="cursor">
        |
      </motion.span>
    </motion.span>
  );
}

function FirstSection(props: {
  firstSection: {
    title: string;
    name: string;
    description: string[];
    cv: string;
  };
  cvUrl: string;
}) {
  const name = props.firstSection.name.split(" ");
  const isMobile = useIsMobile();

  return (
    <div className="row m-0 firstSection w-100">
      {/* Snow effect in first section background */}
      <div className="firstSection-snow-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="snowflake">
            ❄
          </span>
        ))}
      </div>

      <div className="col-lg-7 d-block m-auto ">
        <div className="firstSection-div m-auto">
          <motion.h2
            initial={isMobile ? { opacity: 0, y: 30, scale: 0.95 } : { opacity: 0, x: -30 }}
            animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0 }}
            transition={
              isMobile
                ? { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }
                : { duration: 0.6, ease: "easeOut" }
            }>
            {name[0] + " " + name[1] + " "} <span>{name[2] + " " + name[3]}</span>
          </motion.h2>
          <h2 className="firstSection-Typewriter">
            <AnimatedText text={`${props.firstSection.description}`} isMobile={isMobile} />
          </h2>
          <div className="row">
            <div className="col">
              <button className="firstSection-button mb-5">
                <a href={`/cv-${props.cvUrl}.pdf`} download="cv" className="p-4">
                  {props.firstSection.cv}
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5 col-12 position-relative d-flex align-items-lg-end justify-content-center h-100">
        <Image
          width={416}
          height={599}
          src={"/Images/profile.png"}
          alt="BEN FREDJ Mohamed Achraf"
          title="BEN FREDJ Mohamed Achraf"
        />
      </div>
    </div>
  );
}
export default FirstSection;
