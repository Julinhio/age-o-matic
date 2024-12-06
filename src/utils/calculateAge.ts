export function calculateAge(day: number, month: number, year: number) {
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return {
      years: null,
      months: null,
      days: null,
    };
  }

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      birthDate.getDate()
    );
    days = Math.floor(
      (today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return { years, months, days };
}