import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Linkedin, Github, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Btn = { label: string; href: string; Icon: LucideIcon; primary?: boolean };

const BUTTONS: Btn[] = [
  { label: "EMAIL ME",  href: "mailto:kavishkhanna06@gmail.com",          Icon: ArrowRight, primary: true },
  { label: "LINKEDIN",  href: "https://www.linkedin.com/in/kavishkhanna/", Icon: Linkedin },
  { label: "GITHUB",    href: "https://github.com/kavishkh",               Icon: Github },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRefs    = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".contact-heading-line", { y: "105%" });
      gsap.set(".contact-body",         { opacity: 0, y: 30 });
      gsap.set(".contact-buttons",      { opacity: 0, y: 24 });

      gsap.to(".contact-heading-line", {
        y: "0%", duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".contact-heading", start: "top 80%", once: true },
      });

      gsap.to([".contact-body", ".contact-buttons"], {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
        clearProps: "opacity,y",
        scrollTrigger: { trigger: ".contact-body", start: "top 85%", once: true },
      });
    }, section);

    // Magnetic hover — desktop only
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const cleanups: (() => void)[] = [];

    if (!isTouch) {
      btnRefs.current.forEach((btn) => {
        if (!btn) return;
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = Math.max(-5, Math.min(5, e.clientX - rect.left - rect.width / 2));
          const y = Math.max(-5, Math.min(5, e.clientY - rect.top - rect.height / 2));
          gsap.to(btn, { x, y, duration: 0.45, ease: "power3.out" });
        };
        const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => { ctx.revert(); cleanups.forEach((fn) => fn()); };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#111111] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="contact-heading mb-10">
          {["HAVE A PROBLEM?", "LET'S SOLVE IT."].map((line) => (
            <span key={line} className="clip-text-wrap">
              <span className="contact-heading-line block text-hero text-white">{line}</span>
            </span>
          ))}
        </div>

        {/* Body */}
        <p className="contact-body text-body max-w-xl mb-12" style={{ color: "#666666" }}>
          Let's build something meaningful. Whether it's a product, a business
          solution, or an intelligent automation, I'm ready to explore the challenge.
        </p>

        {/* Buttons */}
        <div className="contact-buttons flex flex-wrap gap-4">
          {BUTTONS.map((btn, i) => (
            <a
              key={btn.label}
              ref={(el) => { btnRefs.current[i] = el; }}
              href={btn.href}
              target={btn.href.startsWith("mailto") ? undefined : "_blank"}
              rel={btn.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className={[
                "group relative inline-flex items-center gap-3",
                "text-label font-semibold px-7 py-4 border transition-button",
                btn.primary
                  ? "bg-white text-[#111111] border-white hover:bg-transparent hover:text-white"
                  : "bg-transparent text-white border-[#333333] hover:border-white hover:bg-white hover:text-[#111111]",
              ].join(" ")}
              style={{ willChange: "transform" }}
            >
              <btn.Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              {btn.label}
              {btn.primary && (
                <ArrowRight
                  className="w-4 h-4 shrink-0 transition-transform duration-300 ease-custom group-hover:translate-x-[5px]"
                  aria-hidden="true"
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
