import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

const isMobileAtom = atom(false);
const isTabletAtom = atom(false);
const isDesktopAtom = atom(false);

export const useInitDeviceSize = () => {
  const setIsMobile = useSetAtom(isMobileAtom);
  const setIsTablet = useSetAtom(isTabletAtom);
  const setIsDesktop = useSetAtom(isDesktopAtom);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768);
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile, setIsTablet, setIsDesktop]);
};

export const useIsMobile = () => {
  return useAtomValue(isMobileAtom);
};

export const useIsTablet = () => {
  return useAtomValue(isTabletAtom);
};

export const useIsDesktop = () => {
  return useAtomValue(isDesktopAtom);
};
