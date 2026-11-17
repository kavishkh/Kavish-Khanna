import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef     = useRef<number>(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Scoped GSAP context prevents StrictMode double-mount issues ──
    const ctx = gsap.context(() => {
      // Guarantee elements start invisible so the from() animation is correct
      gsap.set(".hero-label",     { opacity: 0, y: 12 });
      gsap.set(".hero-line-inner",{ y: "105%" });
      gsap.set(".hero-support",   { opacity: 0, y: 24 });
      gsap.set(".hero-cta",       { opacity: 0, y: 16 });
      gsap.set(".hero-meta-item", { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-label", {
          opacity: 1, y: 0,
          duration: 0.55,
          delay: 0.3,
          clearProps: "opacity,y",
        })
        .to(".hero-line-inner", {
          y: "0%",
          duration: 0.75,
          stagger: 0.12,
        }, "-=0.2")
        .to(".hero-support", {
          opacity: 1, y: 0,
          duration: 0.65,
          clearProps: "opacity,y",
        }, "-=0.3")
        .to(".hero-cta", {
          opacity: 1, y: 0,
          duration: 0.55,
          stagger: 0.1,
          clearProps: "opacity,y",
        }, "-=0.35")
        .to(".hero-meta-item", {
          opacity: 1, y: 0,
          duration: 0.5,
          stagger: 0.08,
          clearProps: "opacity,y",
        }, "-=0.4");
    }, section);

    // ── Magnetic effect (desktop only) ──────────────────────────────
    const mq = window.matchMedia("(pointer: coarse)");
    isTouchRef.current = mq.matches;

    if (!isTouchRef.current) {
      const buttons = Array.from(
        section.querySelectorAll<HTMLElement>(".hero-cta-magnetic")
      );
      const state = buttons.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }));

      const onMouseMove = (e: MouseEvent) => {
        buttons.forEach((btn, i) => {
          const rect = btn.getBoundingClientRect();
          state[i].tx = Math.max(-5, Math.min(5, e.clientX - rect.left - rect.width / 2));
          state[i].ty = Math.max(-5, Math.min(5, e.clientY - rect.top - rect.height / 2));
        });
      };

      buttons.forEach((btn) => {
        btn.addEventListener("mouseleave", () => {
          const i = buttons.indexOf(btn);
          if (i !== -1) { state[i].tx = 0; state[i].ty = 0; }
        });
      });

      const loop = () => {
        buttons.forEach((btn, i) => {
          const s = state[i];
          s.x += (s.tx - s.x) * 0.22;
          s.y += (s.ty - s.y) * 0.22;
          btn.style.transform = `translate(${s.x}px, ${s.y}px)`;
        });
        rafRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener("mousemove", onMouseMove);
      rafRef.current = requestAnimationFrame(loop);

      return () => {
        ctx.revert();
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafRef.current);
        buttons.forEach((btn) => { btn.style.transform = ""; });
      };
    }

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bg-white min-h-[100dvh] flex flex-col overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col lg:flex-row lg:items-center px-4 sm:px-6 lg:px-8 pt-[60px] pb-0">

        {/* ── Left column ─────────────────────────────────────── */}
        <div className="lg:flex-1 flex flex-col justify-center py-16 lg:py-24">

          {/* Label */}
          <p className="hero-label text-label text-[#777777] mb-8">
            DEVELOPER / STRATEGIST / AI AUTOMATION
          </p>

          {/* Headline — per-line clip mask */}
          <h1 className="text-hero text-[#111111] mb-10" aria-label="I don't just write code. I solve problems.">
            {["I DON'T JUST", "WRITE CODE.", "I SOLVE", "PROBLEMS."].map((line) => (
              <span key={line} className="clip-text-wrap" aria-hidden="true">
                <span className="hero-line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          {/* Supporting copy */}
          <p className="hero-support text-body max-w-lg mb-10">
            I'm Kavish Khanna. I build digital products, solve technical
            challenges, and use AI automation to turn complex business problems
            into practical solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("work")}
              className="hero-cta hero-cta-magnetic group inline-flex items-center gap-3 bg-[#111111] text-white text-label font-semibold px-7 py-4 border border-[#111111]"
              style={{ transition: "background-color 350ms cubic-bezier(0.22,1,0.36,1), color 350ms cubic-bezier(0.22,1,0.36,1)" }}
              onMouseEnter={(e) => { const b = e.currentTarget; b.style.backgroundColor = "#fff"; b.style.color = "#111"; }}
              onMouseLeave={(e) => { const b = e.currentTarget; b.style.backgroundColor = "#111"; b.style.color = "#fff"; }}
            >
              EXPLORE MY WORK
              <ArrowRight
                className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-[5px]"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                aria-hidden="true"
              />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="hero-cta hero-cta-magnetic group inline-flex items-center gap-3 bg-white text-[#111111] text-label font-semibold px-7 py-4 border border-[#111111]"
              style={{ transition: "background-color 350ms cubic-bezier(0.22,1,0.36,1), color 350ms cubic-bezier(0.22,1,0.36,1)" }}
              onMouseEnter={(e) => { const b = e.currentTarget; b.style.backgroundColor = "#111"; b.style.color = "#fff"; }}
              onMouseLeave={(e) => { const b = e.currentTarget; b.style.backgroundColor = "#fff"; b.style.color = "#111"; }}
            >
              LET'S TALK
            </button>
          </div>
        </div>

        {/* ── Right metadata (desktop) ─────────────────────── */}
        <div className="hidden lg:flex flex-col items-end justify-between self-stretch py-24 pl-16 min-w-[200px]">
          <div className="flex flex-col items-end gap-5">
            <div className="hero-meta-item flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-pulse" style={{ animationDuration: "2.5s" }} aria-hidden="true" />
              <span className="text-label text-[#777777]">AVAILABLE FOR WORK</span>
            </div>
            <div className="hero-meta-item text-label text-[#777777]">NEW DELHI, INDIA</div>
          </div>

          <button
            onClick={() => scrollTo("about")}
            className="hero-meta-item group flex items-center gap-2 text-label text-[#777777] hover:text-[#111111] transition-text"
            aria-label="Scroll down"
          >
            SCROLL
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-custom group-hover:translate-x-[5px]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Mobile bottom strip ──────────────────────────────── */}
      <div className="lg:hidden border-t border-[#E5E5E5] px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" aria-hidden="true" />
          <span className="text-label text-[#777777]">AVAILABLE FOR WORK</span>
        </div>
        <span className="text-label text-[#777777]">NEW DELHI, INDIA</span>
      </div>
    </section>
  );
}
