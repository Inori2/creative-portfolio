import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { use, useEffect, useRef } from "react";
gsap.registerPlugin(SplitText);

import Menu from "./Menu";

export default function Navbar() {
  const navbarRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    
  return (
    <>
      <div className="navbar fixed w-screen p-5 grid grid-cols-9 gap-4 lg:gap-8 justify-center items-center overflow-visible h-[106px] z-49">
        <div className="hidden lg:block col-span-3">
          <span className="block overflow-hidden">
            <div className="block font-primary text-base text-stone-700 font-semibold">
              Based in Vietnam
            </div>
          </span>
          <span className="block overflow-hidden">
            <div className="block font-primary text-base text-stone-400 font-semibold">
              Working globally
            </div>
          </span>
        </div>
        <div className="hidden lg:block col-span-3">
          <span className="block overflow-hidden">
            <div className="block font-primary text-base text-stone-700 font-semibold">
              Freelance availability
            </div>
          </span>
          <span className="block overflow-hidden">
            <div className="block font-primary text-base text-stone-400 font-semibold">
              Open for collaboration
            </div>
          </span>
        </div>
        <Menu />
      </div>
    </>
  );
}
