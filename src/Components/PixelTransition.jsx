import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PixelTransition() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".square", {
                opacity: 1,
                duration: 0.5,
                stagger: {
                    amount: 1,
                    from: "random",
                    grid: [7, 12]
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "-=300px 50%",
                    end: "bottom 50%",
                    scrub: 0.5,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
       <section ref={containerRef} className="w-screen h-screen bg-neutral-50">
            <div className="square-container w-full h-full grid grid-cols-12 grid-rows-7">
                {[...Array(86)].map((_, index) => (
                    <div key={index} className="square col-span-1 row-span-1 bg-neutral-950 opacity-0"></div>
                ))}
            </div>
       </section>
    )
}