import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

const PROJECTS = [
  {
    num: '01',
    category: 'Full Stack',
    name: 'Cartsy',
    url: 'https://cartsy-silk.vercel.app/',
    col1img1: '/src/Image/Cartsy/1.png',
    col1img2: '/src/Image/Cartsy/2.png',
    col2img: '/src/Image/Cartsy/3.png',
  },
  {
    num: '02',
    category: 'Client',
    name: 'PowerLite',
    url: 'https://powerlite-heyr.vercel.app/',
    col1img1: '/src/Image/PowerLite/1.png',
    col1img2: '/src/Image/PowerLite/2.png',
    col2img: '/src/Image/PowerLite/3.png',
  },
  {
    num: '03',
    category: 'Web App',
    name: 'FRXSH',
    url: 'https://frxsh.vercel.app/',
col1img1: '/src/Image/FRXSH/1.png',
    col1img2: '/src/Image/FRXSH/2.png',
    col2img: '/src/Image/FRXSH/3.png',
  },
  {
    num: '04',
    category: 'Mobile',
    name: 'SplitSmart',
    url: 'https://split-smart-ten.vercel.app/',
    col1img1: '/src/Image/SplitSmart/1.png',
    col1img2: '/src/Image/SplitSmart/2.png',
    col2img: '/src/Image/SplitSmart/3.png',
  },
];

const TOTAL_CARDS = PROJECTS.length;

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  onImageClick: (src: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, progress, onImageClick }) => {
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
            <button onClick={() => onImageClick(project.col1img1)} className="block w-full text-left p-0 border-0 bg-transparent cursor-pointer">
              <img
                src={project.col1img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px] hover:opacity-80 transition-opacity"
                style={{ height: 'clamp(100px, 12vw, 180px)' }}
              />
            </button>
            <button onClick={() => onImageClick(project.col1img2)} className="block w-full text-left p-0 border-0 bg-transparent cursor-pointer flex-1">
              <img
                src={project.col1img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px] hover:opacity-80 transition-opacity flex-1"
              />
            </button>
          </div>

          {/* Right column — 60% width, 1 tall image */}
          <div className="w-3/5">
            <button onClick={() => onImageClick(project.col2img)} className="block w-full h-full text-left p-0 border-0 bg-transparent cursor-pointer">
              <img
                src={project.col2img}
                alt={`${project.name} preview 3`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px] hover:opacity-80 transition-opacity"
              />
            </button>
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

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxSrc]);

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
            onImageClick={setLightboxSrc}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          >
            <motion.img
              key={lightboxSrc}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxSrc}
              alt=""
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-3xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
