import React from 'react';
import { RefreshCw } from 'lucide-react';

interface FormButtonsProps {
  onClear: () => void;
}

export function FormButtons({ onClear }: FormButtonsProps) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={onClear}
        className="w-full md:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 
                 text-gray-700 rounded-full font-bold transition-colors 
                 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Clear
      </button>
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 
                 text-white rounded-full font-bold transition-colors 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Calculate
      </button>
    </div>
  );
}