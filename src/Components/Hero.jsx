import HeroMobile from "./ui/Hero-mobile.jsx";
import HeroDesktop from "./ui/Hero-desktop.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.jsx";

export default function Hero({ isPreloaderDone }) {
  // ✅ Detect if it's mobile
  const isMobile = useMediaQuery("(max-width: 767px)"); // Tailwind's `md` breakpoint

  return (
    <>
      {isMobile ? (
        <HeroMobile isPreloaderDone={isPreloaderDone} />
      ) : (
        <HeroDesktop isPreloaderDone={isPreloaderDone} />
      )}
    </>
  );
}
