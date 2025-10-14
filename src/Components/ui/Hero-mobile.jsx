import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Showreel from "/videos/hero-video-compressed.mp4";
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const HeroMobile = forwardRef(function Hero({ isPreloaderDone }, ref) {
  const headingRef = useRef([]);
  const addToHeadingRefs = (el) => {
    if (el && !headingRef.current.includes(el)) {
      headingRef.current.push(el);
    }
  };
  const paragraphRef = useRef(null);
  const indicateRef = useRef(null);
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useImperativeHandle(ref, () => ({
    indicate: indicateRef.current,
  }));

  //Animation section
  useEffect(() => {
    if (!isPreloaderDone) return;

    let split; // define here for cleanup

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
    if (!isPreloaderDone) return;

    gsap.from(videoWrapperRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.8,
      delay: 0.1,
      ease: "expo.out",
    });
  }, [isPreloaderDone]);

  return (
    <>
      <section id="index" className="z-10" ref={sectionRef}>
        <div className="bg-stone-50 w-screen h-[100svh] flex flex-col px-5">
          {/* Main empty space */}
          <div className="my-auto items-center">
            <div className="overflow-hidden pb-20" ref={videoWrapperRef}>
              {/* Video */}
              <video
                src={Showreel}
                muted
                loop
                playsInline
                autoPlay
                className="aspect-video rounded-2xl"
              ></video>
            </div>
            <div className="text-center">
              <div className="w-full overflow-hidden">
                <span
                  className="font-secondary text-xl font-bold tracking-wide"
                  ref={addToHeadingRefs}
                >
                  Just An Ordinary
                </span>
              </div>
              <div className="w-full overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl tracking-tight text-center"
                  ref={addToHeadingRefs}
                >
                  {"creative".toUpperCase()}
                </h1>
              </div>
              <div className="w-full overflow-hidden">
                <h1
                  className="font-primary font-bold text-7xl tracking-tight text-center"
                  ref={addToHeadingRefs}
                >
                  {"designer".toUpperCase()}
                </h1>
                <span
                  className="font-secondary text-xl font-bold tracking-wide"
                  ref={addToHeadingRefs}
                >
                  and a 5 to 9 developer :)
                </span>
              </div>
            </div>
          </div>
          {/* Bottom line content */}
          <div className="pb-40 flex flex-col justify-between items-end gap-4">
            {/* Left side: cool sh*t */}
            <div className="overflow-hidden">
              <div
                ref={indicateRef}
                className="hidden"
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
            <div className="w-full">
              <span
                className="block text-center font-primary font-semibold text-xl tracking-tight text-stone-700"
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
export default HeroMobile;
