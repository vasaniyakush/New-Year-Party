'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ExpenseTrackerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Expense Tracker
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              This page will be built later. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

