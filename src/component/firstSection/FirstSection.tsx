"use client";
import Image from "next/image";
import "./firstSection.scss";
import { motion, useReducedMotion } from "framer-motion";
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

// Keep the server and first client render identical before reading media preferences.
function useClientReducedMotion() {
  const requested = useReducedMotion();
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => setReduceMotion(Boolean(requested)), [requested]);
  return reduceMotion;
}

function AnimatedText({ text, isMobile }: { text: string; isMobile: boolean }) {
  const reduceMotion = useClientReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // On mobile, show full text immediately - no typewriter
    if (isMobile || reduceMotion) {
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
  }, [displayText, isDeleting, text, typingSpeed, loopNum, isMobile, reduceMotion]);

  // Preserve desktop typing; mobile and reduced-motion users get stable text.
  if (isMobile || reduceMotion) return <span className="animated-text">{text}</span>;

  return (
    <motion.span
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      className="animated-text" aria-hidden="true">
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
  const reduceMotion = useClientReducedMotion();

  return (
    <div className="row m-0 firstSection w-100">
      <div className="col-lg-7 d-block m-auto ">
        <div className="firstSection-div m-auto">
          <motion.h1
            initial={false}
            animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0 }}
            transition={
              isMobile
                ? { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }
                : { duration: 0.6, ease: "easeOut" }
            }>
            {name[0] + " " + name[1] + " "} <span>{name.slice(2).join(" ").replace(/,$/, "")}</span>
          </motion.h1>
          <p className="firstSection-Typewriter">
            {!isMobile && !reduceMotion && <span className="visually-hidden">{props.firstSection.description.join(" ")}</span>}
            <AnimatedText text={`${props.firstSection.description}`} isMobile={isMobile} />
          </p>
          <div className="row">
            <div className="col">
              <div className="firstSection-button mb-5">
                <a
                  href={`/cv-${props.cvUrl}.pdf`}
                  download={`mohamed-achraf-ben-fredj-${props.cvUrl}`}
                  className="p-4">
                  {props.firstSection.cv}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5 col-12 position-relative d-flex align-items-lg-end justify-content-center h-100">
        <Image
          width={416}
          height={599}
          src={"/Images/optimized/profile.webp"}
          alt="BEN FREDJ Mohamed Achraf"
          title="BEN FREDJ Mohamed Achraf"
          priority
          sizes="(max-width: 991px) 100vw, 42vw"
        />
      </div>
    </div>
  );
}
export default FirstSection;
