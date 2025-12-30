'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Expense {
  id: string;
  amount: number;
  note: string;
  description: string;
  paidBy: string;
  paidByName: string;
  createdBy: string;
  createdAt: any;
}

interface RSVPData {
  attendanceStatus: 'sure' | 'maybe' | 'not-coming';
}

export default function ExpenseTrackerPage() {
  const { user, userRole } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [rsvpCount, setRsvpCount] = useState(0);
  const [users, setUsers] = useState<Array<{ uid: string; displayName: string | null; email: string | null }>>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('');

  useEffect(() => {
    if (user) {
      loadExpenses();
      loadRSVPCount();
      loadUsers();
      // Set default paidBy to current user
      setPaidBy(user.uid);
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      const usersList: Array<{ uid: string; displayName: string | null; email: string | null }> = [];
      
      usersSnap.forEach((doc) => {
        const data = doc.data();
        usersList.push({
          uid: doc.id,
          email: data.email || null,
          displayName: data.displayName || null,
        });
      });
      
      setUsers(usersList);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadRSVPCount = async () => {
    try {
      const rsvpsRef = collection(db, 'rsvps');
      const rsvpsSnap = await getDocs(rsvpsRef);
      
      // Count RSVPs where attendanceStatus is not 'not-coming'
      let count = 0;
      rsvpsSnap.forEach((doc) => {
        const data = doc.data() as RSVPData;
        if (data.attendanceStatus !== 'not-coming') {
          count++;
        }
      });
      
      setRsvpCount(count || 1); // Default to 1 to avoid division by zero
    } catch (error) {
      console.error('Error loading RSVP count:', error);
      setRsvpCount(1); // Default to 1 to avoid division by zero
    }
  };

  const loadExpenses = async () => {
    if (!user) return;
    
    try {
      const expensesRef = collection(db, 'expenses');
      let querySnapshot;
      
      try {
        // Try to order by createdAt descending
        const q = query(expensesRef, orderBy('createdAt', 'desc'));
        querySnapshot = await getDocs(q);
      } catch (error: any) {
        // If ordering fails, get all without ordering
        console.warn('Could not order by createdAt, loading all expenses:', error);
        querySnapshot = await getDocs(expensesRef);
      }
      
      const expensesList: Expense[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        expensesList.push({
          id: doc.id,
          amount: data.amount || 0,
          note: data.note || '',
          description: data.description || '',
          paidBy: data.paidBy || '',
          paidByName: data.paidByName || 'Unknown',
          createdBy: data.createdBy || '',
          createdAt: data.createdAt,
        });
      });
      
      // Sort manually if we couldn't use orderBy
      expensesList.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        }
        return 0;
      });
      
      setExpenses(expensesList);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }
    if (!note.trim()) {
      alert('Please enter a note');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!paidBy) {
      alert('Please select who paid for this expense');
      return;
    }

    setSubmitting(true);
    try {
      // Find the user who paid
      const paidByUser = users.find(u => u.uid === paidBy);
      const paidByName = paidByUser?.displayName || paidByUser?.email || 'Unknown';

      const expenseData = {
        amount: amountNum,
        note: note.trim(),
        description: description.trim(),
        paidBy: paidBy,
        paidByName: paidByName,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'expenses'), expenseData);
      
      // Reset form
      setAmount('');
      setNote('');
      setDescription('');
      setPaidBy(user.uid); // Reset to current user
      
      // Reload expenses
      await loadExpenses();
    } catch (error: any) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (expenseId: string) => {
    if (!user) return;
    
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'expenses', expenseId));
      await loadExpenses();
    } catch (error: any) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense: ' + error.message);
    }
  };

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const perShare = rsvpCount > 0 ? totalExpense / rsvpCount : 0;

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Expense Tracker
          </h1>

          {/* Dashboard */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Total Expense
              </h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Per Share
              </h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{perShare.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                ({rsvpCount} {rsvpCount === 1 ? 'person' : 'people'} RSVP'd)
              </p>
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Add Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Paid By <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {users.map((u) => (
                      <option key={u.uid} value={u.uid}>
                        {u.displayName || u.email || u.uid}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Note <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Groceries, Drinks, Food"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Add more details about this expense..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
              >
                {submitting ? 'Adding...' : 'Add Expense'}
              </button>
            </form>
          </div>

          {/* Expenses List */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              All Expenses
            </h2>
            {expenses.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No expenses added yet. Add your first expense above!
              </p>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense) => {
                  const canDelete = expense.createdBy === user?.uid || userRole === 'admin';
                  const createdAt = expense.createdAt?.toDate 
                    ? expense.createdAt.toDate() 
                    : null;
                  
                  return (
                    <div
                      key={expense.id}
                      className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {expense.note}
                            </h3>
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              ₹{expense.amount.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {expense.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>
                              Paid by: <strong>{expense.paidByName}</strong>
                            </span>
                            {createdAt && (
                              <span>
                                {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                        </div>
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(expense.id)}
                            className="ml-4 rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
