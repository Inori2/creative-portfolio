import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";
gsap.registerPlugin(SplitText);

import Menu from "./Menu";

export default function Navbar({ isPreloaderDone }) {
  const navbarContainer = useRef(null);
  const menuRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        [textRef1.current, textRef2.current],
        { y: 150 },
        { y: 0, duration: 0.5, ease: "power1.out" }
      );
    }, navbarContainer);
    return () => ctx.revert();
  }, [isPreloaderDone]);
  return (
    <>
      <div
        className="navbar fixed w-screen p-5 grid grid-cols-9 gap-4 lg:gap-8 justify-center items-center overflow-visible h-[106px] z-49"
        ref={navbarContainer}
      >
        <div className="hidden lg:block col-span-3">
          <span className="block overflow-hidden">
            <div
              className="block font-primary text-base text-stone-700 font-semibold"
              ref={textRef1}
            >
              Based in Vietnam
            </div>
          </span>
          <span className="block overflow-hidden">
            <div
              className="block font-primary text-base text-stone-400 font-semibold"
              ref={textRef1}
            >
              Working globally
            </div>
          </span>
        </div>
        <div className="hidden lg:block col-span-3">
          <span className="block overflow-hidden">
            <div
              className="block font-primary text-base text-stone-700 font-semibold"
              ref={textRef1}
            >
              Freelance availability
            </div>
          </span>
          <span className="block overflow-hidden">
            <div
              className="block font-primary text-base text-stone-400 font-semibold"
              ref={textRef2}
            >
              Open for collaboration
            </div>
          </span>
        </div>
        <Menu ref={menuRef} />
      </div>
    </>
  );
}
