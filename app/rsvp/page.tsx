'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface RSVPData {
  attending: boolean;
  guests: number;
  dietaryRestrictions: string;
  notes: string;
}

export default function RSVPPage() {
  const { user } = useAuth();
  const [rsvpData, setRsvpData] = useState<RSVPData>({
    attending: true,
    guests: 1,
    dietaryRestrictions: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      loadRSVP();
    }
  }, [user]);

  const loadRSVP = async () => {
    if (!user) return;
    
    try {
      const rsvpRef = doc(db, 'rsvps', user.uid);
      const rsvpSnap = await getDoc(rsvpRef);
      
      if (rsvpSnap.exists()) {
        setRsvpData(rsvpSnap.data() as RSVPData);
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error loading RSVP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const rsvpRef = doc(db, 'rsvps', user.uid);
      await setDoc(rsvpRef, {
        ...rsvpData,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email,
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              RSVP
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Please let us know if you'll be attending the New Year Party
            </p>

            {submitted ? (
              <div className="mt-8 rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                <h2 className="text-xl font-semibold text-green-800 dark:text-green-200">
                  ✓ RSVP Submitted!
                </h2>
                <p className="mt-2 text-green-700 dark:text-green-300">
                  Thank you for your RSVP. We've received your response.
                </p>
                <div className="mt-4 space-y-2 text-sm text-green-700 dark:text-green-300">
                  <p><strong>Attending:</strong> {rsvpData.attending ? 'Yes' : 'No'}</p>
                  {rsvpData.attending && (
                    <>
                      <p><strong>Number of Guests:</strong> {rsvpData.guests}</p>
                      {rsvpData.dietaryRestrictions && (
                        <p><strong>Dietary Restrictions:</strong> {rsvpData.dietaryRestrictions}</p>
                      )}
                      {rsvpData.notes && (
                        <p><strong>Notes:</strong> {rsvpData.notes}</p>
                      )}
                    </>
                  )}
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                >
                  Update RSVP
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Will you be attending?
                  </label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={rsvpData.attending}
                        onChange={() => setRsvpData({ ...rsvpData, attending: true })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Yes, I'll be there!</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!rsvpData.attending}
                        onChange={() => setRsvpData({ ...rsvpData, attending: false })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Sorry, can't make it</span>
                    </label>
                  </div>
                </div>

                {rsvpData.attending && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Number of Guests (including yourself)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value) || 1 })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dietary Restrictions or Allergies
                      </label>
                      <textarea
                        value={rsvpData.dietaryRestrictions}
                        onChange={(e) => setRsvpData({ ...rsvpData, dietaryRestrictions: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Please let us know about any dietary restrictions or allergies..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Additional Notes
                      </label>
                      <textarea
                        value={rsvpData.notes}
                        onChange={(e) => setRsvpData({ ...rsvpData, notes: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {submitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

