import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";
gsap.registerPlugin(SplitText);

import Menu from "./Menu";

export default function Navbar({ isPreloaderDone }) {
  const navbarContainer = useRef(null);
  const menuRef = useRef(null);
  const topTextRefs = useRef([]);
  const bottomTextRefs = useRef([]);

  // 1) Immediately set initial hidden states on mount (prevents flash)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const topEls = topTextRefs.current.filter(Boolean);
      const bottomEls = bottomTextRefs.current.filter(Boolean);

      // hide whole navbar and children right away
      gsap.set(navbarContainer.current, { autoAlpha: 0 });
      gsap.set(topEls, { y: 150, autoAlpha: 0 });
      gsap.set(bottomEls, { y: 150, autoAlpha: 0 });
      gsap.set(menuRef.current, { y: 40, scale: 0.95, autoAlpha: 0 });
    }, navbarContainer);

    return () => ctx.revert();
  }, []);

  // 2) Play entrance timeline only after preloader finished
  useEffect(() => {
    if (!isPreloaderDone) return;

    const ctx = gsap.context(() => {
      const topEls = topTextRefs.current.filter(Boolean);
      const bottomEls = bottomTextRefs.current.filter(Boolean);

      const tl = gsap.timeline();

      // reveal container quickly so children are visible as they animate
      tl.to(navbarContainer.current, { autoAlpha: 1, duration: 0.15 });

      // animate top texts together
      tl.to(
        topEls,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        0
      );

      // animate bottom texts with stagger (overlap with top)
      tl.to(
        bottomEls,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power1.out",
        },
        0
      );

      // animate Menu (plays at same time)
      tl.to(
        menuRef.current,
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        0
      );
    }, navbarContainer);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  return (
    <>
      <div
        className="navbar fixed w-screen p-5 grid grid-cols-12 gap-4 lg:gap-8 justify-center items-center overflow-visible h-fit z-49 bg-transparent"
        ref={navbarContainer}
      >
        <div className="hidden md:block col-span-3">
          <div className="block overflow-hidden">
            <span
              className="block font-primary text-base text-stone-700 font-semibold"
              ref={(el) => (topTextRefs.current[0] = el)}
            >
              Based in Vietnam
            </span>
          </div>
          <div className="block overflow-hidden">
            <span
              className="block font-primary text-base text-stone-400 font-semibold"
              ref={(el) => (bottomTextRefs.current[0] = el)}
            >
              Working globally
            </span>
          </div>
        </div>
        <div className="hidden md:block col-span-3">
          <div className="block overflow-hidden">
            <span
              className="block font-primary text-base text-stone-700 font-semibold"
              ref={(el) => (topTextRefs.current[1] = el)}
            >
              Freelance availability
            </span>
          </div>
          <div className="block overflow-hidden mix-blend-difference">
            <span
              className="block font-primary text-base text-stone-400 font-semibold"
              ref={(el) => (bottomTextRefs.current[1] = el)}
            >
              Open for collaboration
            </span>
          </div>
        </div>
        <Menu ref={menuRef} />
      </div>
    </>
  );
}
