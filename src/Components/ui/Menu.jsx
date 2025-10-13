import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useState, useEffect, useRef, forwardRef } from "react";
gsap.registerPlugin(SplitText, ScrollToPlugin);

const Menu = forwardRef((props, ref) => {
  const menuContainerRef = useRef(null);
  const linkRef = useRef([]);
  const buttonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // We'll store the timeline here so it's persistent
  const menuTimeline = useRef(null);

  useEffect(() => {
    const menuContainer = menuContainerRef.current;
    if (!menuContainer) return;

    // Setup: menu starts hidden
    gsap.set(menuContainer, { height: 0, overflow: "hidden" });
    gsap.set([...linkRef.current, buttonRef.current], { autoAlpha: 0, y: -20 });

    // Create timeline ONCE
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
    });

    const naturalHeight = menuContainer.scrollHeight;

    // Step 1: Expand container
    tl.to(
      menuContainer,
      {
        height: naturalHeight,
        duration: 0.3,
        boxShadow:
          "0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 3px 3px rgb(0 0 0 / 0.075)",
        border: "solid 1px rgb(41 37 36)",
      },
      0
    ).set(menuContainer, { height: "auto" }); // allow natural height after open

    // Step 2: Fade in links
    tl.to(
      linkRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.1,
        stagger: 0.1,
        ease: "power3.out",
      },
      0
    );

    // Step 3: Fade in button
    tl.fromTo(
      buttonRef.current,
      {
        autoAlpha: 0,
        scale: 0.95,
        y: 40,
      },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        transformOrigin: "center bottom",
        ease: "power1.out",
      },
      "-=0.1"
    );

    // Store timeline
    menuTimeline.current = tl;
  }, []);

  // Watch state change and either play or reverse
  useEffect(() => {
    if (!menuTimeline.current) return;
    if (isMenuOpen) {
      menuTimeline.current.play();
    } else {
      menuTimeline.current.reverse();
    }
  }, [isMenuOpen]);

  // Hover animation
  function onLinkHover(e) {
    gsap.to(e.currentTarget.querySelector(".menu-item"), {
      yPercent: -50,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function onLinkLeave(e) {
    gsap.to(e.currentTarget.querySelector(".menu-item"), {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }

  return (
    <>
      <nav
        className="menu relative p-4 border bg-stone-950 rounded-2xl h-fit shadow-sm w-full col-span-full md:col-span-5 md:col-end-13 lg:col-span-3 lg:col-end-13 border-stone-800"
        ref={ref}
      >
        <div className="logo-container flex justify-between">
          <a
            href="/"
            className="logo text-right font-primary font-bold text-stone-50 leading-none"
          >
            Made by© <br /> Sang
          </a>
          <div
            className="menu-toggle cursor-pointer p-1 flex flex-col justify-center items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`w-6 h-0.5 bg-stone-50 my-1 transition-all origin-center duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-stone-50 my-1 transition-all origin-center duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            ></div>
          </div>
        </div>
        <div
          className="overflow-hidden absolute left-0 top-full mt-4 w-full bg-stone-950 rounded-2xl flex flex-col justify-between gap-20 border-0 shadow-none border-stone-800"
          ref={menuContainerRef}
        >
          <div className="flex flex-col h-fit px-4 py-4">
            {["Index", "Works", "Process", "Services"].map((item, i) => (
              <a
                href={`#${item.toLowerCase()}`}
                key={i}
                ref={(el) => (linkRef.current[i] = el)}
                onClick={(e) => {
                  e.preventDefault(); // stop default jump
                  const target = document.getElementById(item.toLowerCase());
                  if (target) {
                    gsap.to(window, {
                      duration: 1.2,
                      scrollTo: target,
                      ease: "power2.inOut",
                    });
                  }
                }}
                onMouseEnter={onLinkHover}
                onMouseLeave={onLinkLeave}
                className="block"
              >
                <div className="overflow-hidden h-[2.5rem] mb-4">
                  <div className="menu-item flex flex-col w-full">
                    <span className="font-primary font-bold text-[2rem] text-stone-50">
                      {item.toUpperCase()}
                    </span>
                    <span className="font-primary font-bold text-[2rem] text-stone-50">
                      {item.toUpperCase()}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <a
            href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#116;&#114;&#97;&#110;&#110;&#104;&#97;&#116;&#115;&#97;&#110;&#103;&#50;&#48;&#48;&#48;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
            className="px-4 pb-4"
          >
            <button
              ref={buttonRef}
              className="mt-auto py-4 border bg-stone-50 rounded-xl font-primary font-semibold text-stone-700 hover:bg-stone-200 hover:text-stone-900 transition-colors duration-300 w-full text-center text-2xl cursor-pointer"
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
    </>
  );
});

export default Menu;
