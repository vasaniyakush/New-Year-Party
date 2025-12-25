'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Welcome to the New Year Party! 🎉
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Join us for an unforgettable celebration
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Event Details
              </h2>
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                <li>📅 <strong>Date:</strong> New Year's Eve</li>
                <li>🕐 <strong>Time:</strong> 8:00 PM onwards</li>
                <li>📍 <strong>Location:</strong> Foxtrot Farmhouse, Karolan Ka Barh, Jaipur</li>
                <li>👔 <strong>Dress Code:</strong> [Add dress code]</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Quick Links
              </h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/rsvp"
                  className="block rounded-md bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
                >
                  RSVP Now
                </Link>
                <Link
                  href="/itinerary"
                  className="block rounded-md bg-gray-200 px-4 py-2 text-center text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  View Itinerary
                </Link>
                <Link
                  href="/expense-tracker"
                  className="block rounded-md bg-gray-200 px-4 py-2 text-center text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Expense Tracker
                </Link>
              </div>
            </div>
          </div>

          {/* Venue Location Section */}
          <div className="mt-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📍 Venue Location
            </h2>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Foxtrox Farmhouse, Karolan Ka Barh, Jaipur, Rajasthan 302017
              </p>
            </div>
            <div
              className="w-full overflow-hidden rounded-lg"
              style={{ height: "400px" }}
            >
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1137.9544550764626!2d75.88861706205427!3d26.808783436558773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc900652db075%3A0x266265455c0aed18!2sYour%20flat!5e0!3m2!1sen!2sin!4v1766677249066!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>

          <div className="mt-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              About the Event
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Join us for an amazing New Year celebration filled with music, food, drinks, and great company! 
              We're excited to ring in the new year together with all of you.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Don't forget to RSVP so we can plan accordingly. Check out the itinerary for the full schedule 
              of events throughout the evening.
            </p>
          </div>

          <div className="mt-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Contact Information
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              For any questions or special requests, please contact:
            </p>
            <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>📧 Email: [Add contact email]</li>
              <li>📱 Phone: [Add contact phone]</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
