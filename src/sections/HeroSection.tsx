import React from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import Magnet from '../components/Magnet';
import heroImage from '../Image/1.png';

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const navLinks = ['About', 'Skill', 'Projects'];

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} duration={0.7}>
        <nav className="flex justify-between items-center px-3 sm:px-4 md:px-6 lg:px-10 pt-3 sm:pt-4 md:pt-6 lg:pt-8 gap-1 sm:gap-2 md:gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              id={`nav-${link.toLowerCase()}`}
              className="
                text-[#D7E2EA] font-medium uppercase tracking-wider
                text-[0.6rem] xs:text-[0.65rem] sm:text-xs md:text-sm lg:text-base xl:text-lg
                transition-opacity duration-200 hover:opacity-70
                flex-1 text-center sm:flex-initial
              "
            >
              {link}
            </a>
          ))}
          <button
            onClick={onContactClick}
            className="
              text-[#D7E2EA] font-medium uppercase tracking-wider
              text-[0.6rem] xs:text-[0.65rem] sm:text-xs md:text-sm lg:text-base xl:text-lg
              transition-opacity duration-200 hover:opacity-70
              flex-1 text-center sm:flex-initial bg-transparent border-none cursor-pointer
            "
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* Hero Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-6">
        {/* Hero Heading */}
        <FadeIn delay={0.15} y={40} duration={0.7}>
          <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
            <h1
              className="
                hero-heading font-black uppercase tracking-tight leading-none
                text-center break-words
                text-[12vw] xs:text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[8vw] xl:text-[7vw] 2xl:text-[6vw]
                max-w-full
              "
            >
              Hi, i&apos;m kavish
            </h1>
          </div>
        </FadeIn>

        {/* Portrait — centered below heading */}
        <FadeIn
          delay={0.6}
          y={30}
          duration={0.7}
          className="flex-shrink-0"
        >
          <Magnet
            padding={100}
            strength={2}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={heroImage}
              alt="Kavish Khanna portrait"
              className="
                w-[140px] h-[140px] 
                xs:w-[160px] xs:h-[160px]
                sm:w-[200px] sm:h-[200px] 
                md:w-[280px] md:h-[280px] 
                lg:w-[350px] lg:h-[350px] 
                xl:w-[400px] xl:h-[400px]
                object-cover rounded-lg
                max-w-[80vw] max-h-[40vh]
              "
              loading="lazy"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-3 px-4 sm:px-6 md:px-10 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
        {/* Left text */}
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="
              text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-center sm:text-left
              max-w-[200px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[260px]
              text-[0.7rem] sm:text-[0.75rem] md:text-[0.85rem] lg:text-[1rem]
            "
          >
            developer • creator
          </p>
        </FadeIn>

        {/* Right: Contact Button */}
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton className="flex-shrink-0" onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
