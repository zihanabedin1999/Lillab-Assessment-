import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none';

  const variantStyles = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark focus:ring-brand-blue',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-brand-blue border border-gray-200',
    ghost: 'hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'h-10 w-10',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};