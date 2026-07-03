import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const ABOUT_TEXT =
  "I am a dedicated full-stack developer and software engineer driven by the belief that technology should be a catalyst for meaningful change. Combining deep technical expertise with a collaborative, creative vision, I specialize in architecting full-stack web applications and innovative mobile solutions that turn complex user challenges into seamless, elegant experiences. I am on a continuous mission to learn, adapt, and master emerging technologies, aiming to craft purposeful digital products that engage audiences, streamline workflows, and deliver long-term value.";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20"
    >
      {/* Decorative 3D objects */}

      {/* Top-left: Moon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[8%] sm:top-[6%] md:top-[4%] left-[2%] sm:left-[3%] md:left-[4%] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D moon decoration"
          className="w-[80px] sm:w-[120px] md:w-[160px] lg:w-[210px] h-auto opacity-80"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[12%] sm:bottom-[10%] md:bottom-[8%] left-[2%] sm:left-[4%] md:left-[6%] lg:left-[10%] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D object decoration"
          className="w-[70px] sm:w-[100px] md:w-[140px] lg:w-[180px] h-auto opacity-80"
          loading="lazy"
        />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[8%] sm:top-[6%] md:top-[4%] right-[2%] sm:right-[3%] md:right-[4%] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D lego decoration"
          className="w-[80px] sm:w-[120px] md:w-[160px] lg:w-[210px] h-auto opacity-80"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[12%] sm:bottom-[10%] md:bottom-[8%] right-[2%] sm:right-[4%] md:right-[6%] lg:right-[10%] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D group decoration"
          className="w-[90px] sm:w-[130px] md:w-[170px] lg:w-[220px] h-auto opacity-80"
          loading="lazy"
        />
      </FadeIn>

      {/* Central content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center justify-center min-h-[60vh] gap-8 sm:gap-12 md:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.7}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4 sm:mb-6 md:mb-8"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.4rem)', lineHeight: 'clamp(1.4, 2.8vw, 1.8)' }}
          />
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.3} y={20} duration={0.7}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
