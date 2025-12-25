'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, getDocs, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Wallet {
  userId: string;
  balance: number;
  updatedAt: any;
}

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export default function WalletPage() {
  const { user, userRole } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [adminAmount, setAdminAmount] = useState('');
  const [adminRecipientId, setAdminRecipientId] = useState('');
  const [addingMoney, setAddingMoney] = useState(false);

  useEffect(() => {
    if (user) {
      loadWallet();
      loadUsers();
    }
  }, [user]);

  const loadWallet = async () => {
    if (!user) return;
    
    try {
      const walletRef = doc(db, 'wallets', user.uid);
      const walletSnap = await getDoc(walletRef);
      
      if (walletSnap.exists()) {
        setWallet(walletSnap.data() as Wallet);
      } else {
        // Initialize wallet if it doesn't exist
        await setDoc(walletRef, {
          userId: user.uid,
          balance: 1000,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setWallet({ userId: user.uid, balance: 1000, updatedAt: null });
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      const usersList: User[] = [];
      
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

  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !wallet) return;

    const sendAmount = parseFloat(amount);
    
    // Validation
    if (!recipientId) {
      alert('Please select a recipient');
      return;
    }
    
    if (isNaN(sendAmount) || sendAmount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }
    
    if (sendAmount > wallet.balance) {
      alert('Insufficient balance');
      return;
    }
    
    if (recipientId === user.uid) {
      alert('You cannot send money to yourself');
      return;
    }

    setSending(true);
    try {
      const senderWalletRef = doc(db, 'wallets', user.uid);
      const recipientWalletRef = doc(db, 'wallets', recipientId);

      await runTransaction(db, async (transaction) => {
        const senderWallet = await transaction.get(senderWalletRef);
        const recipientWallet = await transaction.get(recipientWalletRef);

        if (!senderWallet.exists()) {
          throw new Error('Your wallet does not exist');
        }

        const senderBalance = senderWallet.data().balance;
        if (senderBalance < sendAmount) {
          throw new Error('Insufficient balance');
        }

        // Update sender wallet
        transaction.update(senderWalletRef, {
          balance: senderBalance - sendAmount,
          updatedAt: serverTimestamp(),
        });

        // Update or create recipient wallet
        if (recipientWallet.exists()) {
          const recipientBalance = recipientWallet.data().balance;
          transaction.update(recipientWalletRef, {
            balance: recipientBalance + sendAmount,
            updatedAt: serverTimestamp(),
          });
        } else {
          transaction.set(recipientWalletRef, {
            userId: recipientId,
            balance: sendAmount,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      });

      alert(`Successfully sent 💰${sendAmount.toFixed(2)}!`);
      setAmount('');
      setRecipientId('');
      await loadWallet();
    } catch (error: any) {
      console.error('Error sending money:', error);
      alert('Failed to send money: ' + (error.message || 'Unknown error'));
    } finally {
      setSending(false);
    }
  };

  const handleAdminAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || userRole !== 'admin') return;

    const addAmount = parseFloat(adminAmount);
    
    // Validation
    if (!adminRecipientId) {
      alert('Please select a user');
      return;
    }
    
    if (isNaN(addAmount) || addAmount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    setAddingMoney(true);
    try {
      const recipientWalletRef = doc(db, 'wallets', adminRecipientId);

      await runTransaction(db, async (transaction) => {
        const recipientWallet = await transaction.get(recipientWalletRef);

        if (recipientWallet.exists()) {
          const currentBalance = recipientWallet.data().balance || 0;
          transaction.update(recipientWalletRef, {
            balance: currentBalance + addAmount,
            updatedAt: serverTimestamp(),
          });
        } else {
          // Create new wallet for the user
          transaction.set(recipientWalletRef, {
            userId: adminRecipientId,
            balance: addAmount,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      });

      alert(`Successfully added 💰${addAmount.toFixed(2)}!`);
      setAdminAmount('');
      setAdminRecipientId('');
      if (adminRecipientId === user.uid) {
        await loadWallet();
      }
    } catch (error: any) {
      console.error('Error adding money:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore rules. Make sure you have published the updated rules.');
      } else {
        alert('Failed to add money: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setAddingMoney(false);
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
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              💰 Wallet
            </h1>
            <button
              onClick={() => {
                loadWallet();
                loadUsers();
              }}
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

          {/* Wallet Balance */}
          <div className="mt-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-lg">
            <p className="text-sm opacity-90">Your Balance</p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <svg
                className="h-14 w-14 drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <circle cx="12" cy="12" r="10" fill="url(#coinGradient)" stroke="#FFD700" strokeWidth="1.5" filter="url(#shadow)"/>
                <circle cx="12" cy="12" r="7" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.6"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.4"/>
              </svg>
              <p className="text-5xl font-bold">
                {wallet?.balance.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>

          {/* Send Money Section */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Send Money
            </h2>
            <form onSubmit={handleSendMoney} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Recipient
                </label>
                <select
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Choose a user...</option>
                  {users
                    .filter((u) => u.uid !== user?.uid)
                    .map((u) => (
                      <option key={u.uid} value={u.uid}>
                        {u.displayName || u.email || u.uid}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={wallet?.balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Available: 💰{wallet?.balance.toFixed(2) || '0.00'}
                </p>
              </div>
              <button
                type="submit"
                disabled={sending || !wallet || wallet.balance <= 0}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
              >
                {sending ? 'Sending...' : 'Send Money'}
              </button>
            </form>
          </div>

          {/* Admin Add Money Section */}
          {userRole === 'admin' && (
            <div className="mt-8 rounded-lg bg-purple-50 p-6 shadow-md dark:bg-purple-900/20">
              <h2 className="text-2xl font-semibold text-purple-900 dark:text-purple-200">
                👑 Admin: Add Money
              </h2>
              <form onSubmit={handleAdminAddMoney} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-800 dark:text-purple-300">
                    Select User
                  </label>
                  <select
                    value={adminRecipientId}
                    onChange={(e) => setAdminRecipientId(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-purple-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-purple-600 dark:bg-purple-800 dark:text-white"
                    required
                  >
                    <option value="">Choose a user...</option>
                    {users.map((u) => (
                      <option key={u.uid} value={u.uid}>
                        {u.displayName || u.email || u.uid}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-800 dark:text-purple-300">
                    Amount to Add
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={adminAmount}
                    onChange={(e) => setAdminAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-purple-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-purple-600 dark:bg-purple-800 dark:text-white"
                    placeholder="0.00"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={addingMoney}
                  className="w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-gray-400"
                >
                  {addingMoney ? 'Adding...' : 'Add Money'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

