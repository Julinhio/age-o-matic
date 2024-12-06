import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AgeResultProps {
  years: number | null;
  months: number | null;
  days: number | null;
}

export function AgeResult({ years, months, days }: AgeResultProps) {
  const yearsRef = useRef<HTMLSpanElement>(null);
  const monthsRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);

  const formatValue = (value: number | null) => {
    return value === null ? '--' : value;
  };

  useEffect(() => {
    if (years === null || months === null || days === null) return;

    // Reset values to 0 before animating
    if (yearsRef.current) yearsRef.current.textContent = '0';
    if (monthsRef.current) monthsRef.current.textContent = '0';
    if (daysRef.current) daysRef.current.textContent = '0';

    const timeline = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power2.out',
      },
    });

    // Animate years
    timeline.to(yearsRef.current, {
      textContent: years,
      snap: { textContent: 1 },
      duration: 1.5,
    });

    // Animate months with a slight delay
    timeline.to(
      monthsRef.current,
      {
        textContent: months,
        snap: { textContent: 1 },
        duration: 1.2,
      },
      '-=1'
    );

    // Animate days with a slight delay
    timeline.to(
      daysRef.current,
      {
        textContent: days,
        snap: { textContent: 1 },
        duration: 1,
      },
      '-=0.8'
    );

    // Add scale animation to each number
    timeline.fromTo(
      [yearsRef.current, monthsRef.current, daysRef.current],
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
      },
      0
    );

  }, [years, months, days]);

  return (
    <div className="mt-8 space-y-2">
      <p className="text-5xl font-extrabold italic">
        <span ref={yearsRef} className="text-purple-600 inline-block">
          {formatValue(years)}
        </span>{' '}
        years
      </p>
      <p className="text-5xl font-extrabold italic">
        <span ref={monthsRef} className="text-purple-600 inline-block">
          {formatValue(months)}
        </span>{' '}
        months
      </p>
      <p className="text-5xl font-extrabold italic">
        <span ref={daysRef} className="text-purple-600 inline-block">
          {formatValue(days)}
        </span>{' '}
        days
      </p>
    </div>
  );
}