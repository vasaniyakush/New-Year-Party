'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useState } from 'react';
import Link from 'next/link';

type ChallengeType = 'truth' | 'dare' | 'any';

const truthQuestions = [
  'What is the most embarrassing thing that has ever happened to you?',
  'Who was your first crush?',
  'What is the biggest lie you have ever told?',
  'What is your most embarrassing childhood memory?',
  'What is the worst thing you have ever done to a friend?',
  'What is your biggest fear?',
  'What is the most childish thing you still do?',
  'What is the most trouble you have ever gotten into?',
  'What is something you hope your family never finds out about you?',
  'What is the most embarrassing thing in your room?',
  'What is the worst date you have ever been on?',
  'What is the most embarrassing thing you have ever posted on social media?',
  'What is something you have never told your best friend?',
  'What is the meanest thing you have ever said to someone?',
  'What is the worst thing you have ever done at a party?',
  'What is your biggest pet peeve?',
  'What is something you are self-conscious about?',
  'What is the most embarrassing thing your parents have caught you doing?',
  'What is the worst grade you have ever gotten?',
  'What is something you hope never happens to you?',
];

const dares = [
  'Do your best impression of someone in the room.',
  'Sing a song chosen by the group.',
  'Dance with no music for 1 minute.',
  'Let the group go through your phone for 1 minute.',
  'Eat a spoonful of a condiment.',
  'Call your crush and confess your feelings.',
  'Do 20 push-ups.',
  'Let someone else post a status on your social media.',
  'Wear your clothes inside out for the rest of the game.',
  'Do your best celebrity impression.',
  'Let the group look through your photos for 2 minutes.',
  'Call your mom and tell her you love her.',
  'Do a cartwheel.',
  'Let someone read your last text message out loud.',
  'Do your best impression of a baby.',
  'Sing the alphabet backwards.',
  'Let the group give you a new hairstyle.',
  'Do 10 squats.',
  'Call a random number and sing happy birthday.',
  'Let someone go through your browser history.',
  'Do your best impression of an animal.',
  'Eat a piece of food without using your hands.',
  'Let the group look through your phone contacts.',
  'Do a handstand for as long as you can.',
  'Call your best friend and tell them a joke.',
];

export default function TruthAndDarePage() {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [challengeType, setChallengeType] = useState<ChallengeType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomTruth = () => {
    return truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
  };

  const getRandomDare = () => {
    return dares[Math.floor(Math.random() * dares.length)];
  };

  const getRandomAny = () => {
    const isTruth = Math.random() < 0.5;
    return {
      type: isTruth ? 'truth' : 'dare',
      challenge: isTruth ? getRandomTruth() : getRandomDare(),
    };
  };

  const handleGetChallenge = (type: ChallengeType) => {
    setIsAnimating(true);
    setChallengeType(null);
    setCurrentChallenge(null);

    setTimeout(() => {
      let challenge: string;
      let finalType: ChallengeType;

      if (type === 'truth') {
        challenge = getRandomTruth();
        finalType = 'truth';
      } else if (type === 'dare') {
        challenge = getRandomDare();
        finalType = 'dare';
      } else {
        const result = getRandomAny();
        challenge = result.challenge;
        finalType = result.type;
      }

      setChallengeType(finalType);
      setCurrentChallenge(challenge);
      setIsAnimating(false);
    }, 300);
  };

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
              🎯 Truth and Dare
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Get ready for some fun challenges!
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => handleGetChallenge('truth')}
              disabled={isAnimating}
              className="w-full rounded-lg bg-pink-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-pink-700 hover:shadow-lg disabled:opacity-50 sm:w-auto"
            >
              Get Truth
            </button>
            <button
              onClick={() => handleGetChallenge('dare')}
              disabled={isAnimating}
              className="w-full rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg disabled:opacity-50 sm:w-auto"
            >
              Get Dare
            </button>
            <button
              onClick={() => handleGetChallenge('any')}
              disabled={isAnimating}
              className="w-full rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg disabled:opacity-50 sm:w-auto"
            >
              Get Any
            </button>
          </div>

          <div className="mt-12">
            {isAnimating ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Getting your challenge...</p>
                </div>
              </div>
            ) : currentChallenge ? (
              <div
                className={`rounded-lg p-8 shadow-lg ${
                  challengeType === 'truth'
                    ? 'bg-pink-50 dark:bg-pink-900/20'
                    : 'bg-purple-50 dark:bg-purple-900/20'
                }`}
              >
                <div className="mb-4 text-center">
                  <span
                    className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                      challengeType === 'truth'
                        ? 'bg-pink-600 text-white'
                        : 'bg-purple-600 text-white'
                    }`}
                  >
                    {challengeType === 'truth' ? 'TRUTH' : 'DARE'}
                  </span>
                </div>
                <p
                  className={`text-center text-2xl font-medium ${
                    challengeType === 'truth'
                      ? 'text-pink-900 dark:text-pink-200'
                      : 'text-purple-900 dark:text-purple-200'
                  }`}
                >
                  {currentChallenge}
                </p>
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Click a button above to get your challenge!
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
              📝 How to Play
            </h2>
            <ul className="mt-2 space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Click "Get Truth" for a truth question you must answer honestly</li>
              <li>• Click "Get Dare" for a dare you must complete</li>
              <li>• Click "Get Any" for a random truth or dare</li>
              <li>• Have fun and be respectful! 🎉</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

