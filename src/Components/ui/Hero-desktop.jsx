import gsap from "gsap";
import SplitText from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
gsap.registerPlugin(SplitText, TextPlugin);

const HeroDesktop = forwardRef(function Hero({ isPreloaderDone }, ref) {
  const headingRef = useRef([]);
  const addToHeadingRefs = (el) => {
    if (el && !headingRef.current.includes(el)) {
      headingRef.current.push(el);
    }
  };
  const paragraphRef = useRef(null);
  const indicateRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null); // Renamed from hoverRef for clarity
  const cursorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    indicate: indicateRef.current,
  }));

  const hoverAnim = useRef(null); // GSAP animation instance
  const cursorBlinkAnim = useRef(null);
  const reverseTimeout = useRef(null);

  function handleMouseEnter() {
    if (window.innerWidth < 768) return; // Disable hover for mobile (Tailwind md breakpoint)

    if (reverseTimeout.current) {
      clearTimeout(reverseTimeout.current); // Cancel any scheduled reverse
    }
    gsap.set(cursorRef.current, { autoAlpha: 1 });
    cursorBlinkAnim.current.restart();
    hoverAnim.current.play();
  }

  function handleMouseLeave() {
    if (window.innerWidth < 768) return; // Disable hover for mobile (Tailwind md breakpoint)

    if (hoverAnim.current) {
      // Delay before reversing to prevent accidental flickers
      reverseTimeout.current = setTimeout(() => {
        hoverAnim.current.reverse();
        cursorBlinkAnim.current.pause();
        gsap.set(cursorRef.current, { autoAlpha: 0 });
      }, 150); // <-- tweak this delay (150ms feels natural)
    }
  }

  //Animation section
  useEffect(() => {
    if (!isPreloaderDone) return;

    let split; // define here for cleanup

    const ctx = gsap.context(() => {
      // Blinking cursor animation
      cursorBlinkAnim.current = gsap
        .to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })
        .pause();
      gsap.set(cursorRef.current, { autoAlpha: 0 });

      // Text hover animation
      if (!hoverAnim.current) {
        const tl = gsap.timeline({ paused: true });
        tl.to(textRef.current, {
          text: "",
          duration: 0.3,
          ease: "none",
        }).to(textRef.current, {
          text: "engineer".toUpperCase(),
          duration: 0.5,
          ease: "none",
        });
        hoverAnim.current = tl;
      }

      if (headingRef.current.length > 0) {
        gsap.from(headingRef.current, {
          y: 150,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.075,
        });
      }

      if (indicateRef.current) {
        gsap.from(indicateRef.current, {
          y: 100,
          autoAlpha: 0,
          duration: 1,
        });
      }

      if (paragraphRef.current) {
        split = SplitText.create(paragraphRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.from(self.lines, {
              y: 100,
              autoAlpha: 0,
              stagger: 0.075,
              duration: 1,
            });
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert(); // revert GSAP context
      if (split) split.revert(); // revert SplitText
    };
  }, [isPreloaderDone]);

  useEffect(() => {
    return () => {
      if (hoverAnim.current) {
        hoverAnim.current.kill();
        hoverAnim.current = null;
      }
      if (reverseTimeout.current) {
        clearTimeout(reverseTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <section id="index" className="z-10" ref={sectionRef}>
        <div className="bg-stone-50 w-screen h-screen flex flex-col px-5 mt-[-120px]">
          {/* Main empty space */}
          <div className="flex-1 md:grid md:grid-cols-12 md:gap-10 lg:gap-20 pt-80 md:pt-150 lg:pt-80 lg:pb-auto mb-auto">
            <div className="md:col-span-full lg:col-span-10 xl:col-span-8 text-center md:text-left lg:pr-20">
              <div className="w-full overflow-hidden">
                <span
                  className="font-secondary text-2xl font-bold tracking-wide pl-3"
                  ref={addToHeadingRefs}
                >
                  Just An Ordinary
                </span>
              </div>
              <div className="w-full overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl md:text-9xl lg:text-[clamp(3rem,10vw,9.5rem)] tracking-tight md:leading-30 text-center md:text-left"
                  ref={addToHeadingRefs}
                >
                  {"creative".toUpperCase()}
                </h1>
              </div>
              <div className="w-full w-max-[1024px] overflow-hidden lg:pl-30">
                <h1
                  className="font-primary font-bold text-7xl md:text-9xl lg:text-[clamp(3rem,10vw,9.5rem)] tracking-tight md:leading-30 text-center md:text-left"
                  ref={addToHeadingRefs}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span ref={textRef}>{"designer".toUpperCase()}</span>
                  <span ref={cursorRef} className="ml-1">
                    |
                  </span>
                </h1>
              </div>
            </div>
          </div>
          {/* Bottom line content */}
          <div className="pb-30 md:pb-5 flex flex-col md:grid md:grid-cols-12 md:gap-10 justify-between items-end gap-4 md:py-5">
            {/* Left side: cool sh*t */}
            <div className="overflow-hidden md:col-span-4">
              <div
                ref={indicateRef}
                className="hidden md:flex items-center gap-1 text-stone-700 w-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[clamp(14px,1vw,24px)] h-[clamp(14px,1vw,24px)] text-stone-700"
                  aria-hidden="true"
                >
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
                <span className="text-xl font-primary font-semibold tracking-tight">
                  Cool
                </span>
                <span className="text-xl font-secondary font-medium tracking-tight">
                  sh*t
                </span>
              </div>
            </div>

            {/* Right side text */}
            <div className="w-full md:col-span-6 md:col-end-13 lg:col-span-4 lg:col-end-13">
              <span
                className="block text-center md:text-right font-primary font-semibold text-xl lg:text-2xl tracking-tight text-stone-700"
                ref={paragraphRef}
              >
                I help agencies and B2B brands bring ambitious ideas to life
                through focused, goal-driven digital experiences that make a
                measurable impact.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
export default HeroDesktop;
