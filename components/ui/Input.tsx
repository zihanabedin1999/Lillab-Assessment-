import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ className = '', icon, endIcon, ...props }) => {
  const baseStyles = "w-full py-3 text-sm text-gray-900 bg-gray-100 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white";
  const paddingLeft = icon ? "pl-10" : "px-4";
  const paddingRight = endIcon ? "pr-10" : "px-4";

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </span>
      )}
      <input className={`${baseStyles} ${paddingLeft} ${paddingRight} ${className}`} {...props} />
       {endIcon && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          {endIcon}
        </span>
      )}
    </div>
  );
};