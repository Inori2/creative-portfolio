import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

export default function Playground({ isPreloaderDone }) {
  const textRef = useRef(null);
  const textContent = "Hello World";
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isPreloaderDone) return;

    if (textRef.current) {
      const splitText = new SplitText(textRef.current, { type: "chars" });
      const chars = splitText.chars;
      const blinkingCursor = gsap.fromTo(
        cursorRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: 0.3,
        }
      );
      const tl = gsap.timeline();
      tl.from(chars, {
        autoAlpha: 0,
        duration: 1.3,
        stagger: 0.05,
      }).to(
        cursorRef.current,
        {
          x: textRef.current.offsetWidth,
          duration: 1,
          onComplete: () => {
            blinkingCursor.kill();
            gsap.to(cursorRef.current, {
              opacity: 0,
              duration: 0.5,
            });
          },
        },
        "<"
      );
    }
  }, [isPreloaderDone]);

  return (
    <section>
      <div className="w-screen h-screen bg-neutral-50 flex items-center justify-center">
        <div ref={containerRef} className="flex w-fit relative">
          <span ref={textRef} className="text-4xl">
            {textContent}
          </span>
          <div
            ref={cursorRef}
            className="cursor h-10 w-6 bg-neutral-900 absolute"
          ></div>
        </div>
      </div>
    </section>
  );
}
