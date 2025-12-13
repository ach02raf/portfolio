"use client";
import Image from "next/image";
import "./firstSection.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function AnimatedText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
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
  }, [displayText, isDeleting, text, typingSpeed, loopNum]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
  return (
    <div className="row m-0 firstSection w-100">
      <div className="col-lg-7 d-block m-auto ">
        <div className="firstSection-div m-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            {name[0] + " " + name[1] + " "} <span>{name[2] + " " + name[3]}</span>
          </motion.h2>
          <h2 className="firstSection-Typewriter">
            <AnimatedText text={`${props.firstSection.description}`} />
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
