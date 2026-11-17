import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    title: "Independent Project Development",
    date: "2023 — PRESENT",
    description: "Building and shipping digital products from concept to production — full ownership over design, engineering, and delivery.",
  },
  {
    title: "Coding Ninjas Club",
    date: "2022 — 2024",
    description: "Collaborative coding, peer learning, and technical workshops. Contributed to the club's curriculum and community initiatives.",
  },
  {
    title: "Marketing & Logistics",
    date: "2022 — 2023",
    description: "End-to-end campaign coordination and operational logistics. Developed an understanding of business operations beyond technology.",
  },
  {
    title: "Product Experimentation",
    date: "2021 — PRESENT",
    description: "Rapid prototyping and validation of product ideas. Building to learn what works and what doesn't.",
  },
  {
    title: "Team Collaboration",
    date: "2021 — PRESENT",
    description: "Cross-functional teamwork on product and engineering initiatives. Working across design, development, and business functions.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".exp-label",        { opacity: 0, y: 20 });
      gsap.set(".exp-heading-line", { y: "105%" });
      gsap.set(".exp-item",         { opacity: 0, y: 35 });

      gsap.to(".exp-label", {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".exp-label", start: "top 85%", once: true },
      });

      gsap.to(".exp-heading-line", {
        y: "0%", duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".exp-heading", start: "top 85%", once: true },
      });

      gsap.to(".exp-item", {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".exp-timeline", start: "top 82%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[#111111] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="exp-label text-label text-[#555555] mb-10">04 / EXPERIENCE</p>

        <div className="exp-heading mb-16 lg:mb-20">
          {["EXPERIENCE ISN'T", "JUST A JOB TITLE."].map((line) => (
            <span key={line} className="clip-text-wrap">
              <span className="exp-heading-line block text-section-heading text-white">
                {line}
              </span>
            </span>
          ))}
        </div>

        <div className="exp-timeline relative">
          {/* Vertical rule */}
          <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-[#2a2a2a]" aria-hidden="true" />

          {EXPERIENCE.map((item, i) => (
            <div
              key={item.title}
              className={`exp-item relative pl-8 sm:pl-14 ${i < EXPERIENCE.length - 1 ? "pb-14 sm:pb-16" : ""}`}
            >
              {/* Dot */}
              <span
                className="absolute left-0 top-[7px] -translate-x-1/2 w-2 h-2 rounded-full bg-[#444444] border border-[#777777]"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-10">
                <time className="text-label geo-mono text-[#555555]">{item.date}</time>
                <div>
                  <h3
                    className="font-semibold text-white geo-sans mb-2"
                    style={{ fontSize: "clamp(16px, 1.4vw, 20px)", letterSpacing: "-0.02em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-body" style={{ color: "#666666" }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
