import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <img
        src="/logo.jpg"
        alt="Creators Tribe Logo"
        className="w-full h-full object-contain rounded-sm"
      />
    </div>
  );
};

export default Logo;
