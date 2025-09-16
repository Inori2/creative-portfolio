import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const Hero = forwardRef(function Hero({ isPreloaderDone }, ref) {
  const headingRef = useRef([]);
  const addToHeadingRefs = (el) => {
    if (el && !headingRef.current.includes(el)) {
      headingRef.current.push(el);
    }
  };
  const paragraphRef = useRef(null);
  const indicateRef = useRef(null);
  const sectionRef = useRef(null);
  const hoverRef = useRef(null);

  useImperativeHandle(ref, () => ({
    indicate: indicateRef.current,
  }));

  const hoverAnim = useRef(null); // GSAP animation instance
  const reverseTimeout = useRef(null);
  function handleMouseEnter() {
    if (reverseTimeout.current) {
      clearTimeout(reverseTimeout.current); // Cancel any scheduled reverse
    }
    // Create the animation only once
    if (!hoverAnim.current) {
      hoverAnim.current = gsap.to(hoverRef.current, {
        scrambleText: {
          text: "engineer".toUpperCase(),
          chars: "upperCase",
          speed: 5,
        },
        duration: 0.5,
        paused: true, // start paused
      });
    }
    hoverAnim.current.play(); // Play forward
  }

  function handleMouseLeave() {
    if (hoverAnim.current) {
      // Delay before reversing to prevent accidental flickers
      reverseTimeout.current = setTimeout(() => {
        hoverAnim.current.reverse();
      }, 150); // <-- tweak this delay (150ms feels natural)
    }
  }

  //Animation section
  useEffect(() => {
    if (!isPreloaderDone) return;

    const ctx = gsap.context(() => {
      if (headingRef.current.length > 0 && hoverRef.current) {
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
        let split = SplitText.create(paragraphRef.current, {
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
        return () => {
          split.revert();
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  return (
    <>
      <section id="index" className="z-10">
        <div className="bg-stone-50 w-screen h-[100svh] flex flex-col px-5">
          {/* Main empty space */}
          <div className="flex-1 md:grid md:grid-cols-12 md:gap-10 lg:gap-20 pt-60 md:pt-150 lg:pt-80 lg:pb-auto mb-auto">
            <div className="md:col-span-full lg:col-span-10 xl:col-span-8 text-center md:text-left lg:pr-10">
              <div className="w-full overflow-hidden">
                <span
                  className="font-secondary text-xl md:text-xl font-bold tracking-wide pl-3"
                  ref={addToHeadingRefs}
                >
                  Just An Ordinary
                </span>
              </div>
              <div className="w-full overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl md:text-9xl lg:text-[10vw] tracking-tight md:leading-30 text-center md:text-left"
                  ref={addToHeadingRefs}
                >
                  {"creative".toUpperCase()}
                </h1>
              </div>
              <div className="w-full w-max-[1024px] overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl md:text-9xl lg:text-[10vw] tracking-tight md:leading-30 text-center md:text-right"
                  ref={(el) => {
                    hoverRef.current = el;
                    addToHeadingRefs(el);
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {"designer".toUpperCase()}
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
                Website design, digital product design, interactive
                design,prototyping, art direction, print design, branding.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
export default Hero;
