import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".about-label",   { opacity: 0, y: 20 });
      gsap.set(".about-line",    { y: "105%" });
      gsap.set(".about-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".about-body",    { opacity: 0, y: 28 });
      gsap.set(".about-stat",    { opacity: 0, y: 24 });

      const st = (trigger: string, start = "top 85%") => ({
        trigger,
        start,
        once: true,
      });

      gsap.to(".about-label", {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,y",
        scrollTrigger: st(".about-label"),
      });

      gsap.to(".about-line", {
        y: "0%", duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: st(".about-heading"),
      });

      gsap.to(".about-divider", {
        scaleX: 1, duration: 0.9, ease: "power3.out",
        clearProps: "scaleX,transformOrigin",
        scrollTrigger: st(".about-divider", "top 90%"),
      });

      gsap.to(".about-body", {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,y",
        scrollTrigger: st(".about-body", "top 88%"),
      });

      gsap.to(".about-stat", {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        clearProps: "opacity,y",
        scrollTrigger: st(".about-stats", "top 88%"),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="about-label text-label text-[#777777] mb-10">01 / ABOUT</p>

        <div className="about-heading max-w-5xl mb-12">
          {["EARLY IN MY CAREER.", "ALREADY THINKING BEYOND CODE."].map((line) => (
            <span key={line} className="clip-text-wrap">
              <span className="about-line block text-section-heading text-[#111111] leading-tight">
                {line}
              </span>
            </span>
          ))}
        </div>

        <div className="about-divider border-t border-[#E5E5E5] mb-12" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="about-body text-body max-w-2xl">
              I'm at the beginning of my professional journey, but I've already
              spent time building products, exploring technologies, understanding
              business requirements, and turning ideas into working solutions.
            </p>
          </div>

          <div className="about-stats lg:col-span-5 grid grid-cols-2 gap-8">
            {[
              { value: "4+", label: "PRODUCTS SHIPPED" },
              { value: "3+", label: "YEARS BUILDING" },
              { value: "AI",  label: "AUTOMATION FOCUS" },
              { value: "∞",  label: "PROBLEMS SOLVED" },
            ].map((stat) => (
              <div key={stat.label} className="about-stat">
                <p
                  className="font-bold text-[#111111] geo-sans mb-1"
                  style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.04em" }}
                >
                  {stat.value}
                </p>
                <p className="text-label text-[#777777]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
