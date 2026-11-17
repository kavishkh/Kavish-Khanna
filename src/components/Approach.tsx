import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: "01", title: "UNDERSTAND", desc: "Listening to the problem before writing a single line of code." },
  { num: "02", title: "STRATEGIZE", desc: "Mapping requirements to a practical, achievable plan." },
  { num: "03", title: "BUILD",      desc: "Shipping clean, maintainable digital products." },
  { num: "04", title: "AUTOMATE",   desc: "Applying AI and integrations to remove manual friction." },
  { num: "05", title: "DELIVER",    desc: "Handing over a product that actually solves the problem." },
] as const;

type StepState = "hidden" | "active" | "past";

export default function Approach() {
  const sectionRef  = useRef<HTMLElement>(null);
  const hasSetup    = useRef(false);
  const [states, setStates] = useState<StepState[]>(
    STEPS.map(() => "hidden")
  );
  // fills[i] = 0–100, width % of connector line after step i
  const [fills, setFills] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (hasSetup.current) return;
    hasSetup.current = true;

    const section = sectionRef.current;
    if (!section) return;

    const tweens: gsap.core.Tween[]       = [];
    const triggers: ScrollTrigger[]        = [];

    // ── Section header reveal ──────────────────────────────
    const labelEl    = section.querySelector<HTMLElement>(".ap-label");
    const headLines  = section.querySelectorAll<HTMLElement>(".ap-heading-line");

    if (labelEl) {
      gsap.set(labelEl, { opacity: 0, y: 18 });
      tweens.push(
        gsap.to(labelEl, {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          clearProps: "opacity,y",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        })
      );
    }

    if (headLines.length) {
      gsap.set(headLines, { y: "105%" });
      tweens.push(
        gsap.to(headLines, {
          y: "0%", duration: 0.85, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        })
      );
    }

    // ── Per-step sequential reveal ─────────────────────────
    // Each step fires when it enters ~85% of viewport height.
    // Sequence per step:
    //   1. Connector line draws left→right (if not step 0)
    //   2. Number + title fades up
    //   3. Description fades up slightly after
    //
    // On desktop the steps are side-by-side so we stagger them
    // from a single scroll trigger on the steps container.
    // On mobile they stack, so each fires individually.

    const stepsContainer = section.querySelector<HTMLElement>(".ap-steps");
    if (!stepsContainer) return;

    // Single trigger for the whole steps block — fires once when
    // the container reaches 70% viewport. Then we sequence everything.
    const stepEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>(".ap-step")
    );
    const numberEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>(".ap-num")
    );
    const titleEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>(".ap-title")
    );
    const descEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>(".ap-desc")
    );
    const lineWrapEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>(".ap-line-wrap")
    );
    const lineFillEls = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>(".ap-line-fill")
    );

    // Start everything invisible
    gsap.set(stepEls,     { opacity: 0 });
    gsap.set(numberEls,   { opacity: 0, y: 14 });
    gsap.set(titleEls,    { opacity: 0, y: 10 });
    gsap.set(descEls,     { opacity: 0, y: 8  });
    gsap.set(lineFillEls, { scaleX: 0, transformOrigin: "left center" });

    triggers.push(
      ScrollTrigger.create({
        trigger: stepsContainer,
        start: "top 72%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          const lineDelay  = 0.0;
          const stepOffset = 0.22; // seconds between each step's reveal

          STEPS.forEach((_, i) => {
            const base = i * stepOffset;

            // Make step visible (opacity was 0 to avoid flash before animation)
            tl.set(stepEls[i], { opacity: 1 }, base);

            if (i > 0 && lineFillEls[i - 1]) {
              // Draw connector line from previous step to this one
              tl.to(
                lineFillEls[i - 1],
                {
                  scaleX: 1,
                  duration: 0.45,
                  ease: "power2.inOut",
                  onUpdate: function () {
                    setFills((prev) => {
                      const next = [...prev];
                      next[i - 1] = this.progress() * 100;
                      return next;
                    });
                  },
                  onComplete: () => {
                    setFills((prev) => {
                      const next = [...prev];
                      next[i - 1] = 100;
                      return next;
                    });
                  },
                },
                base + lineDelay
              );
            }

            // Number appears
            tl.to(
              numberEls[i],
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out",
                clearProps: "opacity,y" },
              base + (i === 0 ? 0 : 0.3)
            );

            // Title appears
            tl.to(
              titleEls[i],
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out",
                clearProps: "opacity,y" },
              base + (i === 0 ? 0.1 : 0.4)
            );

            // Description appears
            tl.to(
              descEls[i],
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
                clearProps: "opacity,y" },
              base + (i === 0 ? 0.2 : 0.5)
            );

            // Update state to "active" then "past" for next step
            tl.call(
              () => {
                setStates((prev) => {
                  const next = [...prev] as StepState[];
                  for (let j = 0; j < i; j++) next[j] = "past";
                  next[i] = "active";
                  return next;
                });
              },
              [],
              base + (i === 0 ? 0 : 0.3)
            );
          });
        },
      })
    );

    return () => {
      hasSetup.current = false;
      tweens.forEach((t)   => t.kill());
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <p className="ap-label text-label text-[#777777] mb-10">
          05 / MY APPROACH
        </p>

        {/* Heading */}
        <div className="ap-heading mb-16 lg:mb-20">
          {["THINK CLEAR.", "BUILD SMART."].map((line) => (
            <span key={line} className="clip-text-wrap">
              <span className="ap-heading-line block text-section-heading text-[#111111]">
                {line}
              </span>
            </span>
          ))}
        </div>

        {/* Steps */}
        <div className="ap-steps grid grid-cols-1 sm:grid-cols-5 gap-0">
          {STEPS.map((step, i) => {
            const state     = states[i];
            const isActive  = state === "active";
            const isPast    = state === "past";
            const textColor = isActive || isPast ? "#111111" : "#BBBBBB";

            return (
              <div key={step.num} className="ap-step flex flex-col">

                {/* Number row + connector line */}
                <div className="flex items-center mb-5">
                  <span
                    className="ap-num geo-mono shrink-0"
                    style={{
                      fontSize: "clamp(10px, 0.8vw, 12px)",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: textColor,
                      transition: "color 350ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Connector line — drawn left→right by GSAP scaleX */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="ap-line-wrap hidden sm:block flex-1 mx-4 overflow-hidden"
                      style={{ height: "1px", backgroundColor: "#E5E5E5" }}
                    >
                      <div
                        className="ap-line-fill"
                        style={{
                          height: "100%",
                          width: "100%",
                          backgroundColor: "#111111",
                          transformOrigin: "left center",
                          transform: "scaleX(0)",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="ap-title geo-sans font-semibold mb-3"
                  style={{
                    fontSize: "clamp(11px, 1vw, 13px)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: textColor,
                    transition: "color 350ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="ap-desc text-body"
                  style={{
                    color: "#777777",
                    opacity: isActive ? 1 : isPast ? 0.5 : 0.2,
                    transition: "opacity 350ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {step.desc}
                </p>

                {/* Mobile divider */}
                {i < STEPS.length - 1 && (
                  <div
                    className="sm:hidden mt-8 mb-8 h-[1px] bg-[#E5E5E5]"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
