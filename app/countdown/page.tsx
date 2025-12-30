'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target January 1st of next year at 00:00:00
      const targetDate = new Date(`January 1, ${currentYear + 1} 00:00:00`);
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsNewYear(false);
      } else {
        setIsNewYear(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 blur-lg opacity-50 rounded-lg"></div>
        <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 min-w-[120px] text-center shadow-xl">
          <div className="text-5xl font-bold text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center px-4 py-12">
          {isNewYear ? (
            <div className="space-y-8">
              <div className="text-9xl animate-bounce">🎉</div>
              <h1 className="text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
                Happy New Year!
              </h1>
              <p className="text-2xl text-gray-300 mt-4">
                Welcome to {new Date().getFullYear()}!
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4">
                New Year Countdown
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Time until {new Date().getFullYear() + 1}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12">
                <TimeUnit value={timeLeft.days} label="Days" />
                <div className="text-4xl text-white font-bold self-end pb-4">:</div>
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <div className="text-4xl text-white font-bold self-end pb-4">:</div>
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <div className="text-4xl text-white font-bold self-end pb-4">:</div>
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
              </div>

              <div className="mt-12 text-gray-400 text-sm">
                <p>Synchronized countdown • Updates every second</p>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

