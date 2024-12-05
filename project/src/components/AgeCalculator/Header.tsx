import React from 'react';
import { Cake, Timer } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
        <Cake className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
        Age-O-Matic Calculator
        <Timer className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
      </h1>
      <p className="text-lg md:text-xl text-gray-600 font-medium">
        Find out exactly how many birthdays you've survived 🎉...{' '}
        <span className="block md:inline">
          and how many candles you've dodged! 🕯️🔥
        </span>
      </p>
    </div>
  );
}