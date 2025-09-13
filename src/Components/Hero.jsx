import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useEffect, useRef } from "react";
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function Hero({ isPreloaderDone }) {
  const headingRef = useRef([]);
  const addToHeadingRefs = (el) => {
    if (el && !headingRef.current.includes(el)) {
      headingRef.current.push(el);
    }
  };
  const paragraphRef = useRef(null);
  const indicateRef = useRef(null);
  const sectionRef = useRef(null);
  const hoverHeading = useRef(null);
  const setRef = (el) => {
    if (el) {
      hoverHeading.current = el;
      if (!headingRef.current.includes(el)) {
        headingRef.current.push(el);
      }
    }
  };
  //Animation section
  useEffect(() => {
    if (!isPreloaderDone) return;

    const ctx = gsap.context(() => {
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
      <section id="Index">
        <div className="bg-stone-50 w-screen h-screen flex flex-col px-5">
          {/* Main empty space */}
          <div className="flex-1 md:grid md:grid-cols-12 md:gap-10 lg:gap-20 pt-100 md:pt-60 lg:pt-70 mb-auto">
            <div className="md:col-span-8 xl:col-span-6 text-center md:text-left">
              <div className="w-full overflow-hidden">
                <span
                  className="font-secondary text-xl md:text-l font-bold tracking-normal"
                  ref={addToHeadingRefs}
                >
                  A Seriously Good
                </span>
              </div>
              <div className="w-full overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl md:text-9xl tracking-tight md:leading-30 text-center md:text-left"
                  ref={addToHeadingRefs}
                >
                  {"creative".toUpperCase()}
                </h1>
              </div>
              <div className="w-full w-max-[1024px] overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl md:text-9xl tracking-tight md:leading-30 text-center md:text-right"
                  ref={setRef}
                >
                  {"designer".toUpperCase()}
                </h1>
              </div>
            </div>
          </div>

          {/* Bottom line content */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 py-5">
            {/* Left side: cool sh*t */}
            <div className="overflow-hidden">
              {" "}
              <div
                ref={indicateRef}
                className="hidden md:flex items-center gap-1 text-stone-700"
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
                <span className="text-base font-primary font-semibold tracking-tight">
                  Cool
                </span>
                <span className="text-base font-secondary font-medium tracking-tight">
                  sh*t
                </span>
              </div>
            </div>

            {/* Right side text */}
            <div className="w-full md:w-[25rem]">
              <span
                className="block text-center md:text-right font-primary font-semibold text-xl tracking-tight text-stone-700"
                ref={paragraphRef}
              >
                Website design, digital product design, interactive design,
                prototyping, art direction, print design, branding.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
