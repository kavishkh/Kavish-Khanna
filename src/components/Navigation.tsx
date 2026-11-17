import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const NAV_SECTION_IDS = ["hero","about","expertise","work","experience","approach","contact"] as const;

const navItems = [
  { label: "ABOUT",     href: "#about",    id: "about"     },
  { label: "WORK",      href: "#work",     id: "work"      },
  { label: "EXPERTISE", href: "#expertise",id: "expertise" },
  { label: "CONTACT",   href: "#contact",  id: "contact"   },
] as const;

export default function Navigation() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [menuClosing,   setMenuClosing]   = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef      = useRef<HTMLElement>(null);
  const mobileItems = useRef<(HTMLDivElement | null)[]>([]);

  // ── Entrance (fires once) ──────────────────────────────────
  useEffect(() => {
    if (!navRef.current) return;
    gsap.set(navRef.current, { opacity: 0, y: -16 });
    gsap.to(navRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1,
      clearProps: "opacity,y",
    });
  }, []);

  // ── Scroll state ───────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section tracker ─────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) => b.intersectionRatio >= a.intersectionRatio ? b : a);
        setActiveSection(best.target.id);
      },
      { rootMargin: "-15% 0% -65% 0%", threshold: 0 }
    );
    NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Body scroll lock ───────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = (menuOpen || menuClosing) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, menuClosing]);

  // ── Mobile menu stagger entrance ──────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const items = mobileItems.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 24 });
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
      stagger: 0.07, delay: 0.12,
      clearProps: "opacity,y",
    });
  }, [menuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 320);
  }, []);

  const handleLinkClick = useCallback(
    (href: string, e?: MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();
      document.getElementById(href.replace(/^#/, ""))?.scrollIntoView({ behavior: "smooth" });
      if (menuOpen) closeMobileMenu();
    },
    [menuOpen, closeMobileMenu]
  );

  const isMenuMounted = menuOpen || menuClosing;

  return (
    <>
      {/* ── Desktop nav ──────────────────────────────────────── */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-nav",
          scrolled ? "bg-white/90 backdrop-blur-md border-b border-[#E5E5E5]" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between">
            {/* Brand */}
            <button
              type="button"
              onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#111111] font-bold text-sm tracking-[0.08em] geo-sans"
              aria-label="Go to top"
            >
              KAVISH KHANNA
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-x-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => handleLinkClick(item.href, e)}
                    className="nav-link-root relative inline-flex items-center gap-1.5 py-1"
                  >
                    <span className={cn("text-label transition-text", isActive ? "text-[#111111]" : "text-[#777777] hover:text-[#111111]")}>
                      {item.label}
                    </span>
                    {isActive && <span className="w-1 h-1 rounded-full bg-[#111111] shrink-0" aria-hidden="true" />}
                    <span className="nav-underline" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden p-2 -mr-2"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => menuOpen ? closeMobileMenu() : (setMenuOpen(true), setMenuClosing(false))}
            >
              <Menu className="w-5 h-5 text-[#111111]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ────────────────────────────────────── */}
      {isMenuMounted && (
        <>
          <div
            className={cn(
              "fixed inset-0 z-[60] bg-white transition-opacity duration-300 ease-custom",
              menuOpen && !menuClosing ? "opacity-100" : "opacity-0"
            )}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div
            className={cn(
              "fixed inset-0 z-[70] flex flex-col px-6 pt-6 pb-10",
              menuOpen && !menuClosing ? "pointer-events-auto" : "pointer-events-none"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-16">
              <span className="text-[#111111] font-bold text-sm tracking-[0.08em] geo-sans">KAVISH KHANNA</span>
              <button type="button" onClick={closeMobileMenu} aria-label="Close menu" className="p-2 -mr-2">
                <X className="w-5 h-5 text-[#111111]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 flex flex-col justify-center gap-8">
              {navItems.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => { mobileItems.current[i] = el; }}
                >
                  <a
                    href={item.href}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    onClick={(e) => handleLinkClick(item.href, e)}
                    className="block text-[#111111] geo-sans font-bold leading-none"
                    style={{ fontSize: "clamp(36px, 6vw, 56px)", letterSpacing: "-0.04em" }}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>

            <div className="text-label text-[#777777] mt-auto">NEW DELHI, INDIA</div>
          </div>
        </>
      )}
    </>
  );
}
