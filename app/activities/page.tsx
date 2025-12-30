'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Activity {
  id: string;
  name: string;
  description: string;
  href: string;
  emoji: string;
  available: boolean;
}

const activities: Activity[] = [
  {
    id: 'truth-and-dare',
    name: 'Truth and Dare',
    description: 'Get random truth questions and dares to spice up the party!',
    href: '/activities/truth-and-dare',
    emoji: '🎯',
    available: true,
  },
  {
    id: 'random-user',
    name: 'Get Random User',
    description: 'Get a random person from all RSVP\'d attendees!',
    href: '/activities/random-user',
    emoji: '🎲',
    available: true,
  },
  {
    id: 'countdown',
    name: 'New Year Countdown',
    description: 'Watch the synchronized countdown to New Year!',
    href: '/activities/countdown',
    emoji: '⏰',
    available: true,
  },
  // Add more activities here as they are developed
  // {
  //   id: 'activity-2',
  //   name: 'Activity Name',
  //   description: 'Activity description',
  //   href: '/activities/activity-2',
  //   emoji: '🎮',
  //   available: false,
  // },
];

export default function ActivitiesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Activities 🎉
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Fun activities to keep the party going!
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={activity.href}
                className={`group relative rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 ${
                  activity.available
                    ? 'cursor-pointer hover:scale-105'
                    : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activity.emoji}</span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {activity.name}
                      </h3>
                    </div>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                </div>
                {!activity.available && (
                  <div className="mt-4 rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    Coming Soon
                  </div>
                )}
                {activity.available && (
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                    <span className="text-sm font-medium">Play Now</span>
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {activities.filter((a) => !a.available).length > 0 && (
            <div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
                📝 More Activities Coming Soon!
              </h2>
              <p className="mt-2 text-blue-800 dark:text-blue-300">
                We're working on adding more fun activities to make your party even better. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

