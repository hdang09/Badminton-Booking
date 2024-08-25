import React from "react";

interface SectionTitleProps {
  className?: string;
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ className, children }) => {
  return (
    <h2
      className={`font-bold text-xl pl-3 mb-2 relative before:content-[''] before:absolute before:top-[3px] before:left-0 before:w-[4px] before:h-full before:bg-[#FFD88A] inline-block ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
