"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingAnimations() {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const mm = gsap.matchMedia();
      const singleRunTrigger = {
        start: "top 82%",
        end: "bottom 20%",
        once: true,
        invalidateOnRefresh: true,
      } as const;

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-animate]",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: "#hero",
              ...singleRunTrigger,
            },
          }
        );

        const sectionBlocks = gsap.utils.toArray<HTMLElement>("[data-animate-section]");
        sectionBlocks.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.78,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: section,
                ...singleRunTrigger,
              },
            }
          );
        });

        const staggerGroups = gsap.utils.toArray<HTMLElement>("[data-animate-stagger]");
        staggerGroups.forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-animate-item]");
          if (!items.length) {
            return;
          }

          gsap.fromTo(
            items,
            { opacity: 0, y: 24, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.09,
              duration: 0.72,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: group,
                ...singleRunTrigger,
              },
            }
          );
        });
      });

      return () => {
        mm.revert();
      };
    },
    { dependencies: [] }
  );

  return null;
}
