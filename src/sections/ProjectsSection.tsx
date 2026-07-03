import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

const PROJECTS = [
  {
    num: '01',
    category: 'Full Stack',
    name: 'Cartsy',
    url: 'https://cartsy-silk.vercel.app/',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    num: '02',
    category: 'Client',
    name: 'PowerLite',
    url: 'https://powerlite-heyr.vercel.app/',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    num: '03',
    category: 'Web App',
    name: 'FRXSH',
    url: 'https://frxsh.vercel.app/',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
  {
    num: '04',
    category: 'Mobile',
    name: 'SplitSmart',
    url: 'https://split-smart-ten.vercel.app/',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
];

const TOTAL_CARDS = PROJECTS.length;

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, progress }) => {
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / TOTAL_CARDS, 1], [1, targetScale]);

  return (
    <div
      className="sticky"
      style={{ top: `${80 + index * 20}px`, height: '80vh' }}
    >
      <motion.div
        style={{ scale }}
        className="
          h-full
          rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[50px]
          border-2 border-[#D7E2EA]
          bg-[#0C0C0C]
          p-3 sm:p-4 md:p-6 lg:p-8
          flex flex-col gap-3 sm:gap-4 md:gap-6
          overflow-hidden
        "
      >
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
          <div className="flex items-baseline gap-2 sm:gap-4 md:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}
            >
              {project.num}
            </span>
            <div className="flex flex-col">
              <span
                className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-60"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase tracking-wide"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.8rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <LiveProjectButton url={project.url} />
          </div>
        </div>

        {/* Bottom: image grid */}
        <div className="flex gap-2 sm:gap-3 flex-1 min-h-0">
          {/* Left column — 40% width, 2 stacked images */}
          <div className="flex flex-col gap-2 sm:gap-3 w-2/5">
            <img
              src={project.col1img1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px]"
              style={{ height: 'clamp(100px, 12vw, 180px)' }}
            />
            <img
              src={project.col1img2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px] flex-1"
            />
          </div>

          {/* Right column — 60% width, 1 tall image */}
          <div className="w-3/5">
            <img
              src={project.col2img}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="
        bg-[#0C0C0C]
        rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px] lg:rounded-t-[50px]
        -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12
        z-10 relative
        px-3 sm:px-5 md:px-8 lg:px-10
        pt-12 sm:pt-16 md:pt-20 lg:pt-24
        pb-12 sm:pb-16 md:pb-20
      "
    >
      {/* Section heading */}
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* Stacking cards container */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL_CARDS * 80}vh` }}
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
