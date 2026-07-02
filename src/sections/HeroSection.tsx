import React from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import Magnet from '../components/Magnet';

const HeroSection: React.FC = () => {
  const navLinks = ['About', 'Skill', 'Projects', 'Contact'];

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} duration={0.7}>
        <nav className="flex justify-between items-center px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8 gap-2 sm:gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              id={`nav-${link.toLowerCase()}`}
              className="
                text-[#D7E2EA] font-medium uppercase tracking-wider
                text-[0.65rem] xs:text-xs sm:text-sm md:text-lg lg:text-[1.4rem]
                transition-opacity duration-200 hover:opacity-70
              "
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} duration={0.7}>
        <div className="overflow-hidden mt-8 sm:mt-6 md:mt-2 px-6 sm:px-10 md:px-16">
          <h1
            className="
              hero-heading font-black uppercase tracking-tight leading-none
              whitespace-nowrap w-full text-center
              text-[9vw] xs:text-[10vw] sm:text-[11vw] md:text-[12vw] lg:text-[13vw]
            "
          >
            Hi, i&apos;m kavish
          </h1>
        </div>
      </FadeIn>

      {/* Portrait — absolutely centered with padding from bottom and right */}
      <FadeIn
        delay={0.6}
        y={30}
        duration={0.7}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 pb-6 pr-6 sm:pb-10 sm:pr-10 md:pb-16 md:pr-14"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Kavish Khanna portrait"
            className="w-[180px] xs:w-[220px] sm:w-[300px] md:w-[400px] lg:w-[480px] xl:w-[520px] object-contain max-w-[90vw]"
            loading="lazy"
          />
        </Magnet>
      </FadeIn>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end gap-3 px-4 sm:px-6 md:px-10 pb-5 sm:pb-7 md:pb-10">
        {/* Left text */}
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="
              text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
              max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[260px]
            "
            style={{ fontSize: 'clamp(0.6rem, 1.2vw, 1.4rem)' }}
          >
            developer • creator • cosmic explorer
          </p>
        </FadeIn>

        {/* Right: Contact Button */}
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
