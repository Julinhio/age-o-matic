import React from 'react';
import { AgeForm } from './AgeForm';
import { AgeResult } from './AgeResult';
import { Header } from './Header';
import { calculateAge } from '../../utils/calculateAge';

export function AgeCalculator() {
  const [age, setAge] = React.useState<{
    years: number | null;
    months: number | null;
    days: number | null;
  }>({
    years: null,
    months: null,
    days: null,
  });

  const handleSubmit = (day: string, month: string, year: string) => {
    const result = calculateAge(
      parseInt(day),
      parseInt(month),
      parseInt(year)
    );
    setAge(result);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <Header />
      <AgeForm onSubmit={handleSubmit} />
      <div className="relative py-8">
        <div className="absolute left-0 right-0 h-px bg-gray-200" />
      </div>
      <AgeResult
        years={age.years}
        months={age.months}
        days={age.days}
      />
    </div>
  );
}