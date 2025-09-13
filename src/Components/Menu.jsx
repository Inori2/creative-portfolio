import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useState, useEffect, useRef, forwardRef } from "react";
gsap.registerPlugin(SplitText);

const Menu = forwardRef((props, ref) => {
  const menuContainerRef = useRef(null);
  const linkRef = useRef([]);
  const buttonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const menuContainer = menuContainerRef.current;
    if (!menuContainer) return;

    const tl = gsap.timeline();

    if (isMenuOpen) {
      tl.to(menuContainer, {
        height: "auto",
        padding: "1rem",
        duration: 0.3,
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      });
      tl.fromTo(
        linkRef.current,
        { autoAlpha: 0, y: -20 }, // start invisible and slightly above
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.1, // <--- staggered timing
        },
        "-=0.1" // start just before menu fully opens
      );
      tl.fromTo(
        buttonRef.current,
        {
          autoAlpha: 0,
          scale: 0.9,
          y: 10,
          transformOrigin: "center bottom",
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "expo.out",
        },
        "-=0.5"
      );
    } else {
      // Capture the current height and animate from there to 0
      tl.to(menuContainer, {
        height: 0,
        padding: 0,
        duration: 0.3,
        border: "0px solid transparent",
        boxShadow: "0 0px 0px rgba(0,0,0,0)",
      });
    }
  }, [isMenuOpen]);

  // Runs when user hovers a link
  function onLinkHover(e) {
    gsap.to(e.currentTarget.querySelector(".menu-item"), {
      yPercent: -50,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  // Runs when user stops hovering
  function onLinkLeave(e) {
    gsap.to(e.currentTarget.querySelector(".menu-item"), {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }
  return (
    <nav
      className="menu relative p-4 border border-stone-100 bg-white rounded-md min-w-xs h-fit shadow-sm w-full col-span-full lg:col-span-3"
      ref={ref}
    >
      <div className="logo-container flex justify-between">
        <a
          href="/"
          className="logo text-right font-primary font-bold text-stone-950 leading-none"
        >
          Made by© <br /> Sang
        </a>
        <div
          className={`menu-toggle cursor-pointer p-1 flex flex-col justify-center items-center`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`w-6 h-0.5 bg-stone-950 my-1 transition-all origin-center duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-stone-950 my-1 transition-all origin-center duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          ></div>
        </div>
      </div>
      <div
        className="overflow-hidden absolute left-0 top-full mt-4 w-full border border-stone-100 bg-white rounded-md flex flex-col justify-between gap-20"
        ref={menuContainerRef}
      >
        <div className="flex flex-col h-fit">
          {["Index", "Works", "Process", "Services"].map((item, i) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={i}
              ref={(el) => (linkRef.current[i] = el)}
              onMouseEnter={onLinkHover}
              onMouseLeave={onLinkLeave}
              className="block"
            >
              <div className="overflow-hidden h-[2.5rem] mb-4">
                <div className="menu-item flex flex-col w-full">
                  <span className="font-primary font-bold text-[2rem]">
                    {item.toUpperCase()}
                  </span>
                  <span className="font-primary font-bold text-[2rem]">
                    {item.toUpperCase()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <a href="mailto:trannhatsang2000@gmail.com">
          <button
            ref={buttonRef}
            className="mt-auto py-4 border bg-stone-950 rounded-md font-primary font-medium text-stone-50 hover:bg-stone-800 hover:text-stone-50 transition-colors duration-300 w-full text-center text-xl cursor-pointer"
            onMouseDown={(e) =>
              gsap.to(e.currentTarget, {
                scale: 0.95,
                duration: 0.15,
                ease: "power3.out",
              })
            }
            onMouseUp={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.15,
                ease: "power3.inOut",
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.15,
                ease: "power3.inOut",
              })
            }
          >
            Get in touch
          </button>
        </a>
      </div>
    </nav>
  );
});

export default Menu;
