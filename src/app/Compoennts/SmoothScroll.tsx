"use client";
import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollingProps {
  children: ReactNode;
}

interface LenisOptions {
  lerp?: number;
  duration?: number;
  smoothTouch?: boolean;
}

function SmoothScrolling({ children }: SmoothScrollingProps) {
  const options: LenisOptions = {
    lerp: 0.1,
    duration: 1,
    smoothTouch: true,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
