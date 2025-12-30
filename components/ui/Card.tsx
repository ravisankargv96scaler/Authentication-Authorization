import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-cyber-800 border border-cyber-700 rounded-xl shadow-xl overflow-hidden ${className}`}>
      <div className="p-6 border-b border-cyber-700 bg-cyber-800/50">
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-8 last:mb-0">
    <h3 className="text-lg font-semibold text-cyber-accent mb-3 uppercase tracking-wider text-xs">{title}</h3>
    {children}
  </div>
);