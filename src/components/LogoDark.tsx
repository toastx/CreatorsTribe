import React from 'react';
import { cn } from '@/lib/utils';

interface LogoDarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  showText?: boolean;
}

const LogoDark: React.FC<LogoDarkProps> = ({ 
  className, 
  size = 'md', 
  variant = 'full',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const LogoIcon = () => (
    <div className={cn('relative', sizeClasses[size])}>
      <img
        src="/logo.jpg"
        alt="Creators Tribe Logo"
        className="w-full h-full object-contain rounded-sm"
      />
    </div>
  );

  const LogoText = () => (
    <div className={cn('flex flex-col', textSizeClasses[size])}>
      <span className="text-gray-800 dark:text-gray-200 font-medium leading-none">creators</span>
      <span className="text-gray-800 dark:text-gray-200 font-medium leading-none">tribe</span>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <LogoIcon />
      {showText && <LogoText />}
    </div>
  );
};

export default LogoDark;
