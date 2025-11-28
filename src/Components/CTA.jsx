import Button from "./ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function CTA() {
  const textRef = useRef(null);
  const ctaRef = useRef([]);
  const buttonRef = useRef(null);
  const svgWrapperRef = useRef(null);
  const circleRef = useRef(null);
  const containerRef = useRef(null);

  const sectionRef = useRef(null);

  useGSAP(() => {
    //Circle Blinking animation
    gsap.to(circleRef.current, {
      autoAlpha: 0,
      duration: 1,
      repeat: -1,
      delay: 0.5,
      yoyo: true,
    });

    // Marquee Animation
    const marquee = gsap
      .to(containerRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "linear",
      })
      .totalProgress(0.5);
  });

  return (
    <section
      ref={sectionRef}
      className="CTA w-screen min-h-screen flex items-center justify-center bg-neutral-50 pt-20 p-5"
    >
      <div className="CTA-container bg-neutral-950 w-[70vw] h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="top-container w-full h-full flex flex-col items-center justify-center gap-10">
          <div className="content w-full flex flex-col items-center justify-center gap-0">
            <span
              ref={textRef}
              className="font-secondary text-neutral-300 text-2xl"
            >
              Don't be shy
            </span>
            <div
              ref={containerRef}
              className="text-container font-primary font-bold text-neutral-50 uppercase flex text-8xl overflow-visible w-fit self-start"
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="block text-nowrap pr-4">
                  reach out
                </div>
              ))}
            </div>
          </div>
          <Button
            ref={buttonRef}
            className="flex gap-4 items-center justify-center px-6 py-3 bg-neutral-50 rounded-full text-neutral-950 font-primary font-bold text-xl mix-blend-difference grow-0 w-fit"
            Text="Say Hi"
            Link="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#116;&#114;&#97;&#110;&#110;&#104;&#97;&#116;&#115;&#97;&#110;&#103;&#50;&#48;&#48;&#48;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
          />
        </div>
        <div className="bot-container w-full h-full max-h-20 flex gap-0 text-base uppercase font-primary font-light text-neutral-50">
          <div className="items border border-neutral-500 flex p-3 items-center justify-center w-full">
            web design
          </div>
          <div className="items border border-neutral-500 flex p-3 items-center justify-center w-full">
            branding
          </div>
          <div className="items border border-neutral-500 flex p-3 items-center justify-center w-full">
            interaction
          </div>
          <div className="items border border-neutral-500 flex p-3 items-center justify-center w-full">
            <div className="circle-container p-px rounded-full border border-neutral-50 flex justify-center items-center mr-2 h-2 w-2">
              <svg
                ref={svgWrapperRef}
                className="h-3 w-3 overflow-visible mix-blend-difference"
                viewBox="0 0 24 24"
              >
                <circle
                  ref={circleRef}
                  cx="12"
                  cy="12"
                  r="6"
                  fill="#ffffff" // starts transparent
                  stroke="#fafaf9"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <span>available for work</span>
          </div>
        </div>
      </div>
    </section>
  );
}
