import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useState, useEffect } from "react";
gsap.registerPlugin(SplitText);

export default function Menu() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // internal state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav
      className={`menu p-4 border border-stone-100 bg-[#fff] rounded-md min-w-xs max-w-[400px] h-fit ${
        isMenuOpen ? "open" : ""
      }`}
    >
      <div className="logo-container flex justify-between">
        <a
          href="#"
          className="logo text-right font-primary font-bold text-stone-950 leading-none"
        >
          Made by© <br /> Sang
        </a>
        <div
          className={`menu-toggle cursor-pointer p-1 flex flex-col justify-center items-center`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`w-6 h-0.5 bg-stone-950 my-1 transition-all origin-center duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-stone-950 my-1 transition-all origin-center duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          ></div>
        </div>
      </div>
      <div className="">
        <a href="#hero">
          <div>
            <span>Index</span>
          </div>
        </a>
      </div>
    </nav>
  );
}
