import { useRef } from "react";
import gsap from "gsap";

export default function Button({
  Link = "https://google.com",
  Text = "Button",
}) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const svgWrapperRef = useRef(null);

  const handleMouseEnter = () => {
    // Slide text
    gsap.to(textRef.current, {
      yPercent: -50,
      duration: 0.8,
      ease: "expo.out",
    });

    // Animate circle fill
    gsap.to(circleRef.current, {
      fill: "#fafaf9", // stone-50
      duration: 0.8,
      ease: "expo.out",
    });

    // Scale entire SVG wrapper
    gsap.to(svgWrapperRef.current, {
      scale: 0.8,
      transformOrigin: "center center",
      duration: 0.8,
      ease: "expo.out",
    });

    /*     // Scale button
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.8,
      ease: "expo.out",
    }); */
  };

  const handleMouseLeave = () => {
    // Reset text
    gsap.to(textRef.current, {
      yPercent: 0,
      duration: 0.8,
      ease: "expo.out",
    });

    // Reset circle fill
    gsap.to(circleRef.current, {
      fill: "transparent",
      duration: 0.8,
      ease: "expo.out",
    });

    // Reset SVG scale
    gsap.to(svgWrapperRef.current, {
      scale: 1,
      transformOrigin: "center center",
      duration: 0.8,
      ease: "expo.out",
    });

    /*     // Reset button
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "expo.out",
    }); */
  };

  const handleMouseClick = (e) => {
    e.preventDefault();

    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: "expo.out",
      onComplete: () => {
        // Navigate AFTER animation
        window.open(Link, "_blank", "noopener,noreferrer");
      },
    });
  };

  return (
    <a
      ref={buttonRef}
      className="flex gap-4 items-center justify-center px-6 py-5 bg-stone-950 rounded-full text-stone-50 font-primary font-bold text-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
      href={Link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Text Animation */}
      <div className="link-container h-[2rem] overflow-hidden">
        <div className="flex flex-col" ref={textRef}>
          <span>{Text}</span>
          <span>{Text}</span>
        </div>
      </div>

      {/* Circle with scale + fill animation */}
      <svg
        ref={svgWrapperRef}
        className="h-3 w-3 overflow-visible"
        viewBox="0 0 12 12"
      >
        <circle
          ref={circleRef}
          cx="6"
          cy="6"
          r="5"
          fill="transparent" // starts transparent
          stroke="#fafaf9"
          strokeWidth="1"
        />
      </svg>
    </a>
  );
}
