import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useEffect } from "react";
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function Hero({ isPreloaderDone }) {
  useEffect(() => {}, [isPreloaderDone]);

  return (
    <div className="bg-stone-50 w-screen h-screen flex flex-col px-5">
      {/* Main empty space */}
      <div className="flex-1">
        <div></div>
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
  );
}
