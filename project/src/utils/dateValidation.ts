interface ValidationError {
  message: string;
}

interface FieldValidation {
  isValid: boolean;
  errors: ValidationError[];
}

interface DateValidation {
  day: FieldValidation;
  month: FieldValidation;
  year: FieldValidation;
  general?: ValidationError[];
}

export function validateDate(day: string, month: string, year: string): DateValidation {
  const result: DateValidation = {
    day: { isValid: true, errors: [] },
    month: { isValid: true, errors: [] },
    year: { isValid: true, errors: [] },
    general: []
  };

  // Empty field validation
  if (!day) result.day.errors.push({ message: 'This field is required' });
  if (!month) result.month.errors.push({ message: 'This field is required' });
  if (!year) result.year.errors.push({ message: 'This field is required' });

  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  const currentYear = new Date().getFullYear();

  // Range validation
  if (day && (isNaN(dayNum) || dayNum < 1 || dayNum > 31)) {
    result.day.errors.push({ message: 'Must be a valid day' });
  }

  if (month && (isNaN(monthNum) || monthNum < 1 || monthNum > 12)) {
    result.month.errors.push({ message: 'Must be a valid month' });
  }

  if (year && (isNaN(yearNum) || yearNum < 1 || yearNum > currentYear)) {
    result.year.errors.push({ message: 'Must be a valid year' });
  }

  // Valid date check
  if (dayNum && monthNum && yearNum) {
    const date = new Date(yearNum, monthNum - 1, dayNum);
    const isValidDate = date.getDate() === dayNum && 
                       date.getMonth() === monthNum - 1 && 
                       date.getFullYear() === yearNum;

    if (!isValidDate) {
      result.general?.push({ message: 'Please enter a valid date' });
    } else {
      // Future date check
      const today = new Date();
      if (date > today) {
        result.general?.push({ message: 'Date cannot be in the future' });
      }
    }
  }

  // Update isValid flags
  result.day.isValid = result.day.errors.length === 0;
  result.month.isValid = result.month.errors.length === 0;
  result.year.isValid = result.year.errors.length === 0;

  return result;
}