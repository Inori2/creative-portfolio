import Menu from "./Menu";

export default function Navbar() {
  return (
    <>
      <div className="navbar fixed w-screen p-5 grid grid-cols-9 gap-4 lg:gap-8 justify-center items-center overflow-visible h-[106px] z-49">
        <div className="hidden lg:block col-span-3">
          <span className="block overflow-hidden">
            <div className="block font-medium text-[clamp(16px,1.2vw,20px)]">
              Freelance availability
            </div>
          </span>
          <span className="block overflow-hidden">
            <div className="block font-medium text-neutral-400 text-[clamp(16px,1.2vw,20px)]">
              September 2025
            </div>
          </span>
        </div>
        <div className="hidden lg:block col-span-3">
          <span className="block overflow-hidden">
            <div className="block font-medium text-[clamp(16px,1.2vw,20px)]">
              Freelance availability
            </div>
          </span>
          <span className="block overflow-hidden">
            <div className="block font-medium text-neutral-400 text-[clamp(16px,1.2vw,20px)]">
              September 2025
            </div>
          </span>
        </div>
        <Menu />
      </div>
    </>
  );
}
