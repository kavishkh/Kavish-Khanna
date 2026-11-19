import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import BIDZO from "../Images/BIDZO.png";
import FRXSH from "../Images/Frxsh.png";
import Herflow from "../Images/Herflow.png";
import Powerlite from "../Images/Powerlite.png";
import SplitSmart from "../Images/SplitSMart.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "HerFlow",
    image: Herflow,
    category: "HEALTH / WELLNESS",
    problem: "Women's health data fragmented across multiple apps with no unified tracker.",
    solution: "An app that analyses women's health and gives them suggestions.",
    tech: ["React Native", "Python", "TensorFlow"],
    demo: null as string | null,
    github: null as string | null,
  },
  {
    name: "BIDZO",
    image: BIDZO,
    category: "E-COMMERCE",
    problem: "A website where anyone can bidding.",
    solution: "A bidding website where anyone can participate.",
    tech: ["React", "Node.js", "MongoDB"],
    demo: null as string | null,
    github: null as string | null,
  },
  {
    name: "Frxsh",
    image: FRXSH,
    category: "E-COMMERCE",
    problem: "Students need a platform to sell and buy premium products at less price.",
    solution: "A startup idea where students can sell and buy premium products at very less price.",
    tech: ["Next.js", "PostgreSQL", "Stripe"],
    demo: "https://frxsh.vercel.app/",
    github: null as string | null,
  },
  {
    name: "Powerlite",
    image: Powerlite,
    category: "INDUSTRIAL / ELECTRICAL",
    problem: "Premium electrical solutions needed a professional digital presence to reach buyers.",
    solution: "A clean corporate site showcasing industrial transformers and electrical products with clear specifications.",
    tech: ["React", "Node.js", "MongoDB"],
    demo: "https://powerlite-heyr.vercel.app/",
    github: null as string | null,
  },
  {
    name: "SplitSmart",
    image: SplitSmart,
    category: "E-COMMERCE / FINTECH",
    problem: "Tracking expenses while traveling is difficult and splitting bills fairly among group members is complicated.",
    solution: "An expensive tracker app linked with UPI that automatically divides expenses equally among trip participants.",
    tech: ["React Native", "Firebase", "UPI Integration"],
    demo: null as string | null,
    github: null as string | null,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".projects-label",        { opacity: 0, y: 20 });
      gsap.set(".projects-heading-line", { y: "105%" });
      gsap.set(".project-row",           { opacity: 0, y: 40 });

      gsap.to(".projects-label", {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".projects-label", start: "top 85%", once: true },
      });

      gsap.to(".projects-heading-line", {
        y: "0%", duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-heading", start: "top 85%", once: true },
      });

      gsap.to(".project-row", {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.14,
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".projects-list", start: "top 82%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="projects-label text-label text-[#777777] mb-10">03 / SELECTED WORK</p>

        <div className="projects-heading mb-16 lg:mb-20">
          <span className="clip-text-wrap">
            <span className="projects-heading-line block text-section-heading text-[#111111]">
              PROOF OVER PROMISES.
            </span>
          </span>
        </div>

        <div className="projects-list border-t border-[#E5E5E5]">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="project-row img-hover-parent group border-b border-[#E5E5E5] py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 transition-button hover:bg-[#F7F7F7] -mx-4 px-4 sm:-mx-6 sm:px-6"
            >
              {/* Image */}
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="img-wrap w-full" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="transition-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-6">
                {/* Title row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3
                      className="font-bold text-[#111111] geo-sans group-hover:translate-x-[3px] transition-button"
                      style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-label text-[#777777] mt-2">{project.category}</p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/link flex items-center gap-1.5 text-label text-[#111111] link-underline"
                        aria-label={`Live demo of ${project.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        LIVE DEMO
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-custom group-hover/link:translate-x-[3px]" aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/link flex items-center gap-1.5 text-label text-[#111111] link-underline"
                        aria-label={`GitHub for ${project.name}`}
                      >
                        <Github className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        GITHUB
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-custom group-hover/link:translate-x-[3px]" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Problem / Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-label text-[#777777] mb-2">PROBLEM</p>
                    <p className="text-body">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#777777] mb-2">SOLUTION</p>
                    <p className="text-body">{project.solution}</p>
                  </div>
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-label text-[#777777] border border-[#E5E5E5] px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
