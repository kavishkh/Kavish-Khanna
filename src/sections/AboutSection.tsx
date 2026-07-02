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
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative 3D objects */}

      {/* Top-left: Moon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D moon decoration"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D object decoration"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D lego decoration"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D group decoration"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Central content */}
      <div className="relative z-10 max-w-4xl w-full flex-1 flex-col items-center gap-16 sm:gap-20 md:gap-24">
        {/* Group 1: Heading + Portrait + Animated Text */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          {/* Heading */}
          <FadeIn delay={0} y={40} duration={0.7}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

           {/* Animated paragraph */}
           <AnimatedText
             text={ABOUT_TEXT}
             className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
             style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
           />

            <FadeIn delay={0.3} y={20} duration={0.7}>
              <ContactButton />
            </FadeIn>
          </div>
        </div>
    </section>
  );
};

export default AboutSection;
