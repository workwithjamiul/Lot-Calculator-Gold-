import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-white 
        bg-blue-600 hover:bg-blue-700 
        focus:ring-4 focus:outline-none focus:ring-blue-800 
        font-medium rounded-lg text-sm 
        px-5 py-3 
        text-center 
        transition-all duration-300 ease-in-out
        transform hover:scale-105
        shadow-lg shadow-blue-500/50
        ${className}
      `}
    >
      {children}
    </button>
  );
};