import React from 'react';
import { Tooltip } from './Tooltip';

interface ValidationError {
  message: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength: number;
  errors?: ValidationError[];
  isValid?: boolean;
  tooltip: string;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  errors = [],
  isValid = true,
  tooltip,
}: InputFieldProps) {
  return (
    <div className="flex-1">
      <Tooltip label={tooltip}>
        <label className={`block text-sm font-bold uppercase tracking-widest mb-1 
          ${isValid ? 'text-gray-500' : 'text-red-500'}`}>
          {label}
        </label>
      </Tooltip>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border-2 rounded-lg 
                   text-xl font-bold placeholder-gray-300
                   transition-colors
                   ${isValid 
                     ? 'border-gray-200 focus:border-purple-500' 
                     : 'border-red-500 focus:border-red-600'
                   }
                   focus:outline-none`}
      />
      {errors.map((error, index) => (
        <p key={index} className="mt-1 text-red-500 text-sm italic">
          {error.message}
        </p>
      ))}
    </div>
  );
}