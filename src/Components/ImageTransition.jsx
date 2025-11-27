import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BgImage from "/images/transition-image.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ImageTransition() {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: "-5%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-screen z-[-1] mt-[-100vh]">
      <div className="h-[100vh] w-full"></div>
      <div className="h-[100vh] w-full overflow-hidden sticky bottom-0">
        <img
          ref={imageRef}
          className="h-[120vh] w-full object-cover bottom-0"
          style={{ transform: "translateY(5%)" }}
          src={BgImage}
          alt="transition-image"
        />
      </div>
    </section>
  );
}
