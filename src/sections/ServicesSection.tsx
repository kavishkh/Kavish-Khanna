import React from 'react';
import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    num: '01',
    name: 'React',
    desc: 'Building interactive, component-driven user interfaces with reusable architecture and modern hooks for dynamic web applications.',
  },
  {
    num: '02',
    name: 'TypeScript',
    desc: 'Writing type-safe, scalable code that catches errors early and improves developer experience across large codebases.',
  },
  {
    num: '03',
    name: 'Node.js',
    desc: 'Developing fast, event-driven server-side applications and RESTful APIs powered by JavaScript on the backend.',
  },
  {
    num: '04',
    name: 'Three.js',
    desc: 'Crafting immersive 3D web experiences with WebGL, custom shaders, and animated scenes that push creative boundaries.',
  },
  {
    num: '05',
    name: 'Next.js',
    desc: 'Building production-ready full-stack React apps with server-side rendering, routing, and optimized performance out of the box.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="skill"
      className="
        bg-white
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10
        py-20 sm:py-24 md:py-32
      "
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      {/* Service list */}
      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30} duration={0.7}>
            <div
              className="
                flex items-start gap-6 md:gap-10
                py-8 sm:py-10 md:py-12
              "
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === SERVICES.length - 1 ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' } : {}),
              }}
            >
              {/* Number */}
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.num}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col gap-2 pt-2 sm:pt-3 md:pt-4">
                <span
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <span
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.desc}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
