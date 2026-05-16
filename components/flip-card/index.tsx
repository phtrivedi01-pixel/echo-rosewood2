"use client";

import { useState } from "react";
import { FlipCardFront } from "./flip-card-front";
import { FlipCardBack } from "./flip-card-back";

export function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-[560px] mx-auto cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={
        flipped
          ? "Viewing passport side. Tap to see memory postcard."
          : "Viewing memory postcard. Tap to see passport."
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
    >
      <div
        className="grid w-full transition-transform duration-[600ms] ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="col-start-1 row-start-1 w-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <FlipCardFront />
        </div>

        <div
          className="col-start-1 row-start-1 w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <FlipCardBack />
        </div>
      </div>
    </div>
  );
}
