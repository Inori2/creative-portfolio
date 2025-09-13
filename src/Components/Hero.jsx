import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useEffect } from "react";
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function Hero({ isPreloaderDone }) {
  useEffect(() => {}, [isPreloaderDone]);

  return (
    <>
      <section id="Index">
        <div className="bg-stone-50 w-screen h-screen flex flex-col px-5">
          {/* Main empty space */}
          <div className="flex-1 md:grid md:grid-cols-12 pt-100 md:pt-60 mb-auto">
            <div className="md:col-span-8 text-center md:text-left">
              <div className="w-full">
                <span className="font-secondary text-xl md:text-l font-bold tracking-normal">
                  A Seriously Good
                </span>
              </div>
              <div className="w-full overflow-hidden">
                <h1 className="font-primary font-bold text-7xl md:text-9xl tracking-tight md:leading-30 text-center md:text-left">
                  {"creative".toUpperCase()}
                </h1>
              </div>
              <div className="w-full overflow-hidden">
                <h1 className="font-primary font-bold text-7xl md:text-9xl tracking-tight md:leading-30 text-center md:text-right">
                  {"designer".toUpperCase()}
                </h1>
              </div>
            </div>
          </div>

          {/* Bottom line content */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 py-5">
            {/* Left side: cool sh*t */}
            <div className="hidden md:flex items-center gap-1 text-stone-700">
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

            {/* Right side text */}
            <div className="w-full md:w-[25rem]">
              <span className="block text-center md:text-right font-primary font-semibold text-xl tracking-tight text-stone-700">
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
