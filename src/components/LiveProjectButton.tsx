import React from 'react';

interface LiveProjectButtonProps {
  url?: string;
  className?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ url, className = '' }) => {
  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      id="live-project-button"
      onClick={handleClick}
      className={`
        rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
        font-medium uppercase tracking-widest
        px-4 py-2 text-xs
        sm:px-8 sm:py-3 sm:text-sm
        md:px-10 md:py-3.5 md:text-base
        transition-all duration-300 hover:bg-[#D7E2EA]/10
        shrink-0
        ${className}
      `}
    >
      Live Project
    </button>
  );
};

export default LiveProjectButton;
