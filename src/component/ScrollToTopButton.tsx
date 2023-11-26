"use client";
import { useEffect, useState } from "react";
import "./ScrollToTopButton.scss";
import Image from "next/image";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };

  return (
    <button
      className={`position-fixed  p-0 outline-none scrollToTop ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}>
      <Image
        className="m-2"
        src={"/Images/Icons/up.png"}
        alt="up"
        title="up"
        width={20}
        height={20}
      />
    </button>
  );
};

export default ScrollToTopButton;
