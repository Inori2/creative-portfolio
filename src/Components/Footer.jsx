import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import TimezoneDisplay from "./ui/TimezoneDisplay";
import { Canvas } from "@react-three/fiber";
import DistortedText from "./ui/DistortedText";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const linksRef = useRef([]);

  // Helper to add refs
  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    let ctx;
    document.fonts.ready.then(() => {
      ctx = gsap.context(() => {
        // Select all text elements we want to animate
        const targets = linksRef.current;

        if (targets.length > 0) {
          // Create SplitText for each target to get characters
          const splits = targets.map(target => new SplitText(target, { type: "chars" }));
          const chars = splits.flatMap(split => split.chars);

          gsap.from(chars, {
            opacity: 0,
            y: 10,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top center",
              toggleActions: "play none none reverse"
            }
          });
        }
      }, footerRef);
    });

    return () => ctx && ctx.revert();
  }, []);

  function onLinkHover(e) {
    gsap.to(e.currentTarget.querySelector(".link-text"), {
      yPercent: -50,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function onLinkLeave(e) {
    gsap.to(e.currentTarget.querySelector(".link-text"), {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }

  const SocialLink = ({ href, label }) => (
    <a
      href={href}
      className="block w-fit"
      onMouseEnter={onLinkHover}
      onMouseLeave={onLinkLeave}
    >
      <div className="overflow-hidden h-6 relative">
        <div className="link-text flex flex-col">
          <span className="font-primary text-neutral-400 text-base leading-6" ref={addToLinksRef}>
            {label}
          </span>
          <span className="font-primary text-neutral-400 text-base leading-6">
            {label}
          </span>
        </div>
      </div>
    </a>
  );

  return (
    <section ref={footerRef} className="bg-neutral-950 w-screen min-h-screen flex flex-col justify-between px-5 pb-5 pt-20 lg:pt-40">
      {/* Headline */}
      <div className="w-full flex justify-center items-center flex-grow">
        <div className="w-full h-[20vw] relative">
          <Canvas>
            <ambientLight intensity={1} />
            <DistortedText />
          </Canvas>
        </div>
      </div>

      {/* Links & Info */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-5 mt-20">
        {/* Social Column */}
        <div className="lg:col-start-5 lg:col-span-2 flex flex-col gap-4">
          <h4 className="font-primary text-neutral-50 font-semibold mb-2" ref={addToLinksRef}>
            Social
          </h4>
          <SocialLink href="#" label="Instagram" />
          <SocialLink href="#" label="Linkedin" />
          <SocialLink href="#" label="Facebook" />
        </div>

        {/* Contact Column */}
        <div className="lg:col-start-9 lg:col-span-3 flex flex-col gap-4">
          <h4 className="font-primary text-neutral-50 font-semibold mb-2" ref={addToLinksRef}>
            Contact
          </h4>
          <SocialLink href="mailto:trannhatsang2000@gmail.com" label="Email" />
          <div className="font-primary text-neutral-400 text-base mt-2">
            <TimezoneDisplay />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end mt-20 pt-5 border-t border-neutral-900">
        <div className="hidden lg:block w-1/3"></div>
        <span className="font-primary text-neutral-600 text-sm uppercase tracking-wide lg:w-1/3">
          '{currentYear.toString().slice(-2)} ALL RIGHT RESERVED
        </span>
        <span className="font-primary text-neutral-600 text-sm uppercase tracking-wide lg:w-1/3">
          MADE BY SANG
        </span>
      </div>
    </section>
  );
}
