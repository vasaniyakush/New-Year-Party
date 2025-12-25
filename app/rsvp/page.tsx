'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface RSVPData {
  name: string;
  email: string;
  phone: string;
  attendanceStatus: 'sure' | 'maybe' | 'not-coming';
  arrivalTime: string;
  newYearResolution: string;
  aboutYourself: string;
}

interface RSVPWithId extends RSVPData {
  id: string;
  userId: string;
  submittedAt: string;
}

export default function RSVPPage() {
  const { user } = useAuth();
  const [rsvpData, setRsvpData] = useState<RSVPData>({
    name: '',
    email: '',
    phone: '',
    attendanceStatus: 'sure',
    arrivalTime: '',
    newYearResolution: '',
    aboutYourself: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [allRSVPs, setAllRSVPs] = useState<RSVPWithId[]>([]);
  const [showAllRSVPs, setShowAllRSVPs] = useState(false);

  useEffect(() => {
    if (user) {
      loadRSVP();
      loadAllRSVPs();
    }
  }, [user]);

  // Reload RSVPs when switching to view all
  useEffect(() => {
    if (showAllRSVPs && user) {
      loadAllRSVPs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllRSVPs]);

  const loadRSVP = async () => {
    if (!user) return;
    
    try {
      const rsvpRef = doc(db, 'rsvps', user.uid);
      const rsvpSnap = await getDoc(rsvpRef);
      
      if (rsvpSnap.exists()) {
        const data = rsvpSnap.data();
        setRsvpData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          attendanceStatus: (data.attendanceStatus || 'maybe') as 'sure' | 'maybe' | 'not-coming',
          arrivalTime: data.arrivalTime || '',
          newYearResolution: data.newYearResolution || '',
          aboutYourself: data.aboutYourself || '',
        });
        setSubmitted(true);
      } else {
        // Pre-fill with user info if available
        setRsvpData(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || '',
        }));
      }
    } catch (error) {
      console.error('Error loading RSVP:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllRSVPs = async () => {
    try {
      const rsvpsRef = collection(db, 'rsvps');
      let querySnapshot;
      try {
        // Try to order by submittedAt
        const q = query(rsvpsRef, orderBy('submittedAt', 'desc'));
        querySnapshot = await getDocs(q);
        console.log('Loaded RSVPs with ordering, count:', querySnapshot.size);
      } catch (error: any) {
        // If ordering fails (e.g., missing index or field), get all without ordering
        console.warn('Could not order by submittedAt, loading all RSVPs:', error);
        if (error.code === 'failed-precondition') {
          console.error('Firestore index required. Error:', error.message);
          alert('Firestore index required. Please create the index or check console for link.');
        }
        querySnapshot = await getDocs(rsvpsRef);
        console.log('Loaded RSVPs without ordering, count:', querySnapshot.size);
      }
      
      const rsvps: RSVPWithId[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Processing RSVP:', doc.id, data.name);
        rsvps.push({
          id: doc.id,
          userId: data.userId || doc.id,
          submittedAt: data.submittedAt || '',
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          attendanceStatus: (data.attendanceStatus || 'maybe') as 'sure' | 'maybe' | 'not-coming',
          arrivalTime: data.arrivalTime || '',
          newYearResolution: data.newYearResolution || '',
          aboutYourself: data.aboutYourself || '',
        });
      });
      
      // Sort manually if we couldn't use orderBy
      rsvps.sort((a, b) => {
        if (a.submittedAt && b.submittedAt) {
          return b.submittedAt.localeCompare(a.submittedAt);
        }
        return 0;
      });
      
      console.log('Total RSVPs to display:', rsvps.length);
      setAllRSVPs(rsvps);
    } catch (error: any) {
      console.error('Error loading all RSVPs:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore rules.');
      } else {
        alert('Error loading RSVPs: ' + error.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    if (!rsvpData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!rsvpData.email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (rsvpData.attendanceStatus !== 'not-coming' && !rsvpData.newYearResolution.trim()) {
      alert('Please enter at least one New Year Resolution');
      return;
    }

    setSubmitting(true);
    try {
      const rsvpRef = doc(db, 'rsvps', user.uid);
      const rsvpDataToSave = {
        ...rsvpData,
        userId: user.uid,
        submittedAt: new Date().toISOString(),
      };
      console.log('Submitting RSVP:', rsvpDataToSave);
      await setDoc(rsvpRef, rsvpDataToSave);
      console.log('RSVP submitted successfully');
      setSubmitted(true);
      // Wait a moment for Firestore to update, then refresh
      setTimeout(async () => {
        await loadAllRSVPs();
      }, 500);
    } catch (error: any) {
      console.error('Error submitting RSVP:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore rules.');
      } else {
        alert('Failed to submit RSVP: ' + error.message);
      }
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
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              RSVP
            </h1>
            <button
              onClick={() => setShowAllRSVPs(!showAllRSVPs)}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              {showAllRSVPs ? 'Show Form' : `View All RSVPs (${allRSVPs.length})`}
            </button>
          </div>

          {showAllRSVPs ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  All RSVPs
                </h2>
                <button
                  onClick={loadAllRSVPs}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
              {allRSVPs.length === 0 ? (
                <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400">No RSVPs yet. Be the first to RSVP!</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {allRSVPs.map((rsvp) => (
                    <div key={rsvp.id} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                      <div className="mb-4 border-b border-gray-200 pb-3 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {rsvp.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{rsvp.email}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong className="text-gray-700 dark:text-gray-300">Phone:</strong> {rsvp.phone || 'Not provided'}</p>
                        <p>
                          <strong className="text-gray-700 dark:text-gray-300">Status:</strong>{' '}
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                            rsvp.attendanceStatus === 'sure' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                              : rsvp.attendanceStatus === 'maybe'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {rsvp.attendanceStatus === 'sure' ? 'Sure' : rsvp.attendanceStatus === 'maybe' ? 'Maybe' : 'Not coming'}
                          </span>
                          {rsvp.attendanceStatus === 'not-coming' && (
                            <span className="ml-2 text-red-500 font-medium">ED hai ??</span>
                          )}
                        </p>
                        {rsvp.attendanceStatus !== 'not-coming' && (
                          <>
                            {rsvp.arrivalTime && (
                              <p><strong className="text-gray-700 dark:text-gray-300">Arrival:</strong> {rsvp.arrivalTime}</p>
                            )}
                            {rsvp.newYearResolution && (
                              <div>
                                <strong className="text-gray-700 dark:text-gray-300">New Year Resolution:</strong>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">{rsvp.newYearResolution}</p>
                              </div>
                            )}
                            {rsvp.aboutYourself && (
                              <div>
                                <strong className="text-gray-700 dark:text-gray-300">About:</strong>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">{rsvp.aboutYourself}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Please fill out the form below to RSVP for the New Year Party
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
                    <p><strong>Name:</strong> {rsvpData.name}</p>
                    <p><strong>Email:</strong> {rsvpData.email}</p>
                    <p><strong>Status:</strong> {rsvpData.attendanceStatus === 'sure' ? 'Sure' : 'Maybe'}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                    >
                      Update RSVP
                    </button>
                    <button
                      onClick={() => setShowAllRSVPs(true)}
                      className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                      View All RSVPs
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={rsvpData.phone}
                      onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="+91 9192 baki teri.."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Attendance Status <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={rsvpData.attendanceStatus === 'sure'}
                          onChange={() => setRsvpData({ ...rsvpData, attendanceStatus: 'sure' })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Sure</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={rsvpData.attendanceStatus === 'maybe'}
                          onChange={() => setRsvpData({ ...rsvpData, attendanceStatus: 'maybe' })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Maybe</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={rsvpData.attendanceStatus === 'not-coming'}
                          onChange={() => setRsvpData({ ...rsvpData, attendanceStatus: 'not-coming' })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          Not coming
                          {rsvpData.attendanceStatus === 'not-coming' && (
                            <span className="ml-2 text-red-500 font-medium">ED hai ??</span>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>

                  {rsvpData.attendanceStatus !== 'not-coming' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          When will you arrive?
                        </label>
                        <input
                          type="text"
                          value={rsvpData.arrivalTime}
                          onChange={(e) => setRsvpData({ ...rsvpData, arrivalTime: e.target.value })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., 8:00 PM, 9:30 PM"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Year Resolution <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={rsvpData.newYearResolution}
                          onChange={(e) => setRsvpData({ ...rsvpData, newYearResolution: e.target.value })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="Share at least one New Year resolution..."
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          At least one resolution is required
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          About Yourself
                        </label>
                        <textarea
                          value={rsvpData.aboutYourself}
                          onChange={(e) => setRsvpData({ ...rsvpData, aboutYourself: e.target.value })}
                          rows={4}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="Tell us a bit about yourself..."
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

