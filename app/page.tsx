'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { navigationItems } from '@/lib/navigationConfig';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Welcome to the New Year Party! 🎉
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
              Join us for an unforgettable celebration
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group rounded-lg bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
              >
                {item.emoji && <div className="text-3xl mb-2">{item.emoji}</div>}
                <h3 className="text-xl font-semibold">{item.label === 'Food Menu' ? 'Starvation' : item.label}</h3>
                {item.description && (
                  <p className="mt-2 text-sm opacity-90">{item.description}</p>
                )}
              </Link>
            ))}
          </div>

          {/* Event Details */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Event Details
              </h2>
              <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="mr-3 text-xl">📅</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Date:</strong> New Year's Eve
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">🕐</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Time:</strong> 8:00 PM onwards
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">📍</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Location:</strong> Foxtrot Farmhouse, Karolan Ka Barh, Jaipur
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">👔</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Dress Code:</strong> [Add dress code]
                  </div>
                </li>
              </ul>
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

            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                What to Expect
              </h2>
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                <li>🎵 Live Music & DJ</li>
                <li>🍽️ Delicious Food & Drinks</li>
                <li>🎮 Fun Activities & Games</li>
                <li>🎊 New Year Countdown</li>
                <li>🎉 Amazing Party Vibes</li>
              </ul>
            </div>
          </div>

          {/* About the Event */}
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
              of events throughout the evening, and explore our fun activities to keep the party going!
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Contact Information
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              For any questions or special requests, please contact:
            </p>
            <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="mr-3 text-xl">📧</span>
                <span>Email: [Add contact email]</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">📱</span>
                <span>Phone: [Add contact phone]</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
