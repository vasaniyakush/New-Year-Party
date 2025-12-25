'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';

interface ItineraryItem {
  time: string;
  event: string;
  description: string;
  location?: string;
}

const itineraryItems: ItineraryItem[] = [
  {
    time: '8:00 PM',
    event: 'Welcome & Arrival',
    description: 'Guests arrive, welcome drinks and appetizers served',
    location: 'Main Entrance',
  },
  {
    time: '8:30 PM',
    event: 'Dinner Service',
    description: 'Buffet dinner with a variety of cuisines',
    location: 'Dining Hall',
  },
  {
    time: '10:00 PM',
    event: 'Live Music & Dancing',
    description: 'DJ set and live performances',
    location: 'Main Hall',
  },
  {
    time: '11:30 PM',
    event: 'Countdown Preparation',
    description: 'Gather for the New Year countdown',
    location: 'Main Hall',
  },
  {
    time: '12:00 AM',
    event: 'New Year Countdown',
    description: 'Celebrate the arrival of the new year with champagne toast',
    location: 'Main Hall',
  },
  {
    time: '12:30 AM',
    event: 'After Party',
    description: 'Continue the celebration with music, dancing, and desserts',
    location: 'Main Hall',
  },
];

export default function ItineraryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Event Itinerary
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Here's what we have planned for the evening
            </p>
          </div>

          <div className="mt-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>

              <div className="space-y-8">
                {itineraryItems.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                      <span className="text-xs font-semibold">{item.time}</span>
                    </div>

                    {/* Content card */}
                    <div className="ml-6 flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.event}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                      {item.location && (
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                          📍 {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
              📝 Note
            </h2>
            <p className="mt-2 text-blue-800 dark:text-blue-300">
              This itinerary is subject to change. We'll keep you updated if there are any modifications. 
              Feel free to edit this template with your actual event details.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

