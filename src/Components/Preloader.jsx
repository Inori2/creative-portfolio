import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(".img-container");

      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      // Animate the reveal by expanding the container
      tl.fromTo(
        boxes,
        {
          clipPath: "inset(50% 50% 50% 50%)", // fully hidden
        },
        {
          clipPath: "inset(0% 0% 0% 0%)", // fully revealed
          duration: 1.2,
          ease: "power4.inOut",
          stagger: 0.2,
        }
      )
        .to(boxes, {
          clipPath: "inset(0% 0% 100% 0%)", // fully hidden, only top remains
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.01, // small pause before closing
        })
        .to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          pointerEvents: "none", // prevent blocking clicks while fading
        });
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="preloader w-screen h-screen bg-stone-50 flex justify-center items-center absolute top-0 left-0 z-50 select-none"
      ref={preloaderRef}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          className="img-container overflow-hidden absolute top-1/2 left-1/2 w-[40%] h-[35%] lg:w-[15%] lg:h-[35%] -translate-x-1/2 -translate-y-1/2"
          key={num}
        >
          <img
            src={`/src/assets/images/preloader-img-${num}.png`}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </section>
  );
}

export default Preloader;
