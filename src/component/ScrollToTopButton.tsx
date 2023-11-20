"use client";
import { useEffect, useState } from "react";
import "./ScrollToTopButton.scss";
import Image from "next/image";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
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
