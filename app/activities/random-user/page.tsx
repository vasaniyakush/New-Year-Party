'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface RSVPData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  attendanceStatus: 'sure' | 'maybe' | 'not-coming';
  arrivalTime: string;
  newYearResolution: string;
  aboutYourself: string;
  submittedAt: string;
}

export default function RandomUserPage() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [randomUser, setRandomUser] = useState<RSVPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    loadRSVPs();
  }, []);

  const loadRSVPs = async () => {
    try {
      const rsvpsRef = collection(db, 'rsvps');
      let querySnapshot;
      
      try {
        // Try to order by submittedAt
        const q = query(rsvpsRef, orderBy('submittedAt', 'desc'));
        querySnapshot = await getDocs(q);
      } catch (error: any) {
        // If ordering fails, get all without ordering
        console.warn('Could not order by submittedAt, loading all RSVPs:', error);
        querySnapshot = await getDocs(rsvpsRef);
      }
      
      const rsvpsList: RSVPData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        rsvpsList.push({
          id: doc.id,
          userId: data.userId || doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          attendanceStatus: (data.attendanceStatus || 'maybe') as 'sure' | 'maybe' | 'not-coming',
          arrivalTime: data.arrivalTime || '',
          newYearResolution: data.newYearResolution || '',
          aboutYourself: data.aboutYourself || '',
          submittedAt: data.submittedAt || '',
        });
      });
      
      // Filter to only include people who RSVP'd (not 'not-coming')
      const attendingRSVPs = rsvpsList.filter(
        (rsvp) => rsvp.attendanceStatus !== 'not-coming'
      );
      
      setRsvps(attendingRSVPs);
    } catch (error) {
      console.error('Error loading RSVPs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomUser = () => {
    if (rsvps.length === 0) {
      alert('No RSVPs available. Please wait for people to RSVP!');
      return;
    }

    setIsAnimating(true);
    setRandomUser(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rsvps.length);
      setRandomUser(rsvps[randomIndex]);
      setIsAnimating(false);
    }, 500);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/activities"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Activities
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              🎲 Get Random User
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Get a random person from all RSVP'd attendees!
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {rsvps.length} {rsvps.length === 1 ? 'person' : 'people'} have RSVP'd
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={getRandomUser}
              disabled={isAnimating || rsvps.length === 0}
              className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnimating ? 'Getting Random User...' : 'Get Random User'}
            </button>
          </div>

          <div className="mt-12">
            {isAnimating ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Finding someone random...</p>
                </div>
              </div>
            ) : randomUser ? (
              <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-4xl font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {randomUser.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {randomUser.name}
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{randomUser.email}</p>
                  </div>

                  <div className="mt-6 space-y-4 text-left">
                    {randomUser.phone && (
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="mt-1 text-gray-900 dark:text-white">{randomUser.phone}</p>
                      </div>
                    )}

                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance Status</p>
                      <p className="mt-1">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                            randomUser.attendanceStatus === 'sure'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          }`}
                        >
                          {randomUser.attendanceStatus === 'sure' ? 'Sure' : 'Maybe'}
                        </span>
                      </p>
                    </div>

                    {randomUser.arrivalTime && (
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Arrival Time</p>
                        <p className="mt-1 text-gray-900 dark:text-white">{randomUser.arrivalTime}</p>
                      </div>
                    )}

                    {randomUser.newYearResolution && (
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Year Resolution</p>
                        <p className="mt-1 text-gray-900 dark:text-white">{randomUser.newYearResolution}</p>
                      </div>
                    )}

                    {randomUser.aboutYourself && (
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">About</p>
                        <p className="mt-1 text-gray-900 dark:text-white">{randomUser.aboutYourself}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {rsvps.length === 0
                    ? 'No RSVPs yet. Wait for people to RSVP!'
                    : 'Click the button above to get a random user!'}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
              📝 How it Works
            </h2>
            <ul className="mt-2 space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Only includes people who have RSVP'd (not "not coming")</li>
              <li>• Click the button to get a completely random person</li>
              <li>• Perfect for icebreakers, games, or random selections! 🎉</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

