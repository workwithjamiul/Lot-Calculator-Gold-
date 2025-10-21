import React from 'react';

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            bg-white/10 
            border border-white/20 
            text-white text-sm 
            rounded-lg 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400
            block w-full 
            ${icon ? 'pl-10' : 'pl-4'} p-2.5 
            placeholder-white/60
            transition duration-150 ease-in-out
            appearance-none
          `}
          // For number inputs, hide the default spinners
          style={{ MozAppearance: 'textfield' }}
        />
      </div>
    </div>
  );
};