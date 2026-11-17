import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    num: "01",
    title: "TECHNOLOGY",
    desc: "Building modern digital products and applications — from architecture to production.",
  },
  {
    num: "02",
    title: "BUSINESS PROBLEM SOLVING",
    desc: "Understanding business requirements and designing practical, scalable solutions.",
  },
  {
    num: "03",
    title: "AI & AUTOMATION",
    desc: "Creating smarter workflows using AI, integrations and automation to remove friction.",
  },
] as const;

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".expertise-label",        { opacity: 0, y: 20 });
      gsap.set(".expertise-heading-line", { y: "105%" });
      gsap.set(".expertise-row",          { opacity: 0, y: 35 });

      gsap.to(".expertise-label", {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".expertise-label", start: "top 85%", once: true },
      });

      gsap.to(".expertise-heading-line", {
        y: "0%", duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".expertise-heading", start: "top 85%", once: true },
      });

      gsap.to(".expertise-row", {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".expertise-rows", start: "top 85%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="expertise-label text-label text-[#777777] mb-10">02 / EXPERTISE</p>

        <div className="expertise-heading mb-16 lg:mb-20">
          <span className="clip-text-wrap">
            <span className="expertise-heading-line block text-section-heading text-[#111111]">
              THREE WAYS I CREATE VALUE.
            </span>
          </span>
        </div>

        <div className="expertise-rows border-t border-[#E5E5E5]">
          {ITEMS.map((item) => (
            <div
              key={item.num}
              className="expertise-row group relative border-b border-[#E5E5E5] py-8 sm:py-10 grid grid-cols-[48px_1fr_auto] items-start gap-6 sm:gap-10 cursor-default transition-button hover:bg-[#F7F7F7] -mx-4 px-4 sm:-mx-6 sm:px-6"
            >
              {/* Number */}
              <span className="text-label geo-mono text-[#777777] group-hover:opacity-30 transition-text pt-0.5">
                {item.num}
              </span>

              {/* Content */}
              <div className="min-w-0">
                <h3
                  className="font-semibold text-[#111111] geo-sans group-hover:translate-x-[3px] transition-button"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h3>
                <p className="text-body mt-2 max-w-xl opacity-60 group-hover:opacity-100 transition-button">
                  {item.desc}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight
                className="w-5 h-5 text-[#111111] shrink-0 mt-0.5 transition-transform duration-350 ease-custom group-hover:translate-x-[5px]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
