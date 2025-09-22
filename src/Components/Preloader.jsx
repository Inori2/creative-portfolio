import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";

function Preloader({ setIsPreloaderDone }) {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef(null);

  useEffect(() => {
    // Lock body scroll when loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(".img-container");

      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          setIsPreloaderDone(true);
        },
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
        .to(
          preloaderRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            pointerEvents: "none",
            onStart: () => setIsPreloaderDone(true),
          },
          "-=0.2"
        );
    }, preloaderRef);

    return () => ctx.revert();
  }, [setIsPreloaderDone]);

  return (
    <section
      className="preloader w-screen h-screen bg-stone-50 flex justify-center items-center fixed top-0 left-0 z-50 select-none"
      ref={preloaderRef}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          className="img-container overflow-hidden absolute top-1/2 left-1/2 w-[50%] h-[35%] lg:w-[15%] lg:h-[35%] -translate-x-1/2 -translate-y-1/2"
          key={num}
        >
          <img
            src={`/images/preloader-img-${num}.avif`}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </section>
  );
}

export default Preloader;
