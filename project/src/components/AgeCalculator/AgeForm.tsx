import React from 'react';
import { InputField } from './InputField';
import { FormButtons } from './FormButtons';
import { validateDate } from '../../utils/dateValidation';

interface AgeFormProps {
  onSubmit: (day: string, month: string, year: string) => void;
}

export function AgeForm({ onSubmit }: AgeFormProps) {
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [validation, setValidation] = React.useState<ReturnType<typeof validateDate> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = validateDate(day, month, year);
    setValidation(validationResult);

    const hasErrors = !validationResult.day.isValid || 
                     !validationResult.month.isValid || 
                     !validationResult.year.isValid ||
                     (validationResult.general?.length ?? 0) > 0;

    if (!hasErrors) {
      onSubmit(day, month, year);
    }
  };

  const handleClear = () => {
    setDay('');
    setMonth('');
    setYear('');
    setValidation(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4 md:items-start">
        <div className="flex gap-4 flex-col sm:flex-row flex-1">
          <InputField
            label="Day"
            value={day}
            onChange={setDay}
            placeholder="DD"
            maxLength={2}
            errors={validation?.day.errors}
            isValid={validation ? validation.day.isValid : true}
            tooltip="Enter a day between 1 and 31"
          />
          <InputField
            label="Month"
            value={month}
            onChange={setMonth}
            placeholder="MM"
            maxLength={2}
            errors={validation?.month.errors}
            isValid={validation ? validation.month.isValid : true}
            tooltip="Enter a month between 1 and 12"
          />
          <InputField
            label="Year"
            value={year}
            onChange={setYear}
            placeholder="YYYY"
            maxLength={4}
            errors={validation?.year.errors}
            isValid={validation ? validation.year.isValid : true}
            tooltip="Enter a year between 1 and current year"
          />
        </div>
      </div>

      {validation?.general && validation.general.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          {validation.general.map((error, index) => (
            <p key={index} className="text-red-600 text-sm">
              {error.message}
            </p>
          ))}
        </div>
      )}

      <FormButtons onClear={handleClear} />
    </form>
  );
}