import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-bold text-[#111111] geo-sans tracking-tight text-sm" style={{ letterSpacing: "-0.01em" }}>
              KAVISH KHANNA
            </p>
            <p className="text-label text-[#777777] mt-1">DEVELOPER / PROBLEM SOLVER</p>
          </div>

          {/* Copyright */}
          <p className="text-label text-[#777777]">© 2026</p>

          {/* Back to top */}
          <button
            type="button"
            onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-flex items-center gap-2 text-label text-[#111111] link-underline pb-0.5"
            aria-label="Back to top"
          >
            BACK TO TOP
            <ArrowUp
              className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-custom group-hover:-translate-y-[3px]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
