'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';

interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  method: string;
  glass: string;
  special?: string;
}

const recipes: Recipe[] = [
  // SIGNATURE CREATIONS
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan (Budget Version)',
    category: '⭐ SIGNATURE CREATIONS',
    ingredients: ['Vodka – 45 ml', 'Cranberry juice – 30 ml', 'Orange juice – 15 ml', 'Lemon juice – 10 ml', 'Ice'],
    method: 'Build over ice, stir',
    glass: 'Martini / Coupe / Small tumbler',
  },
  {
    id: 'long-island',
    name: 'Long Island Iced Tea (Limit 1 per person)',
    category: '⭐ SIGNATURE CREATIONS',
    ingredients: [
      'Vodka – 15 ml',
      'Gin – 15 ml',
      'White Rum – 15 ml',
      'Tequila – 15 ml (optional)',
      'Lemon juice – 20 ml',
      'Sugar syrup – 15 ml',
      'Cola – top',
    ],
    method: 'Build over ice, top with cola',
    glass: 'Tall glass',
    special: 'Limit 1 per person',
  },
  {
    id: 'spicy-guava-smash',
    name: '🌶️ Spicy Guava Smash (Hero Drink)',
    category: '⭐ SIGNATURE CREATIONS',
    ingredients: [
      'Vodka / Gin / White Rum – 45 ml',
      'Guava juice – 120 ml',
      'Lemon juice – 10 ml',
      'Pinch of salt',
      'Pinch of chaat masala',
      'Chilli (muddled or powder)',
      'Optional: Chilli-salt rim',
    ],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  // GIN SELECTION
  {
    id: 'gin-tonic',
    name: 'Gin & Tonic',
    category: '🍸 GIN SELECTION',
    ingredients: ['Gin – 45 ml', 'Tonic – top', 'Lemon wedge'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'garden-spritz',
    name: 'Garden Spritz',
    category: '🍸 GIN SELECTION',
    ingredients: ['Gin – 45 ml', 'Lemon juice – 10 ml', 'Soda – top', 'Mint'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'botanical-sunset',
    name: 'Botanical Sunset',
    category: '🍸 GIN SELECTION',
    ingredients: ['Gin – 45 ml', 'Orange juice – 90 ml', 'Tonic – splash'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'guava-picante',
    name: 'Guava Picante 🌶️',
    category: '🍸 GIN SELECTION',
    ingredients: ['Gin – 45 ml', 'Guava juice – 120 ml', 'Lemon juice – 10 ml', 'Chilli + salt'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  // VODKA SELECTION
  {
    id: 'screwdriver',
    name: 'Screwdriver',
    category: '🍸 VODKA SELECTION',
    ingredients: ['Vodka – 45 ml', 'Orange juice – top'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'midnight-cranberry',
    name: 'Midnight Cranberry Spritz',
    category: '🍸 VODKA SELECTION',
    ingredients: ['Vodka – 45 ml', 'Cranberry juice – 60 ml', 'Soda – top', 'Lemon peel'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'citrus-snowfall',
    name: 'Citrus Snowfall',
    category: '🍸 VODKA SELECTION',
    ingredients: ['Vodka – 45 ml', 'Orange juice – 60 ml', 'Lemon juice – 10 ml', 'Soda – top'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'winter-mint-fizz',
    name: 'Winter Mint Fizz',
    category: '🍸 VODKA SELECTION',
    ingredients: [
      'Vodka – 45 ml',
      'Mint – muddled',
      'Lemon juice – 10 ml',
      'Sugar syrup – 15 ml',
      'Soda – top',
    ],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  // RUM SELECTION
  {
    id: 'rum-coke',
    name: 'Rum & Coke',
    category: '🍹 RUM SELECTION',
    ingredients: ['White Rum – 45 ml', 'Cola – top', 'Lemon wedge'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'island-glow',
    name: 'Island Glow',
    category: '🍹 RUM SELECTION',
    ingredients: ['White Rum – 45 ml', 'Pineapple juice – 90 ml', 'Lemon juice – 10 ml'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'sunset-rum-punch',
    name: 'Sunset Rum Punch',
    category: '🍹 RUM SELECTION',
    ingredients: ['White Rum – 45 ml', 'Orange juice – 60 ml', 'Pineapple juice – 60 ml'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'classic-mojito',
    name: 'Classic Mojito (Budget)',
    category: '🍹 RUM SELECTION',
    ingredients: [
      'White Rum – 45 ml',
      'Mint – muddled',
      'Lemon juice – 20 ml',
      'Sugar – 2 tsp',
      'Soda – top',
    ],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  // WHISKY SELECTION
  {
    id: 'smoked-cola',
    name: 'Smoked Cola Highball',
    category: '🥃 WHISKY SELECTION',
    ingredients: ['Whisky – 45 ml', 'Cola – top', 'Lemon peel'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'ginger-oak',
    name: 'Ginger Oak',
    category: '🥃 WHISKY SELECTION',
    ingredients: ['Whisky – 45 ml', 'Ginger ale – top', 'Lemon wedge'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'whisky-citrus',
    name: 'Whisky Citrus Spritz',
    category: '🥃 WHISKY SELECTION',
    ingredients: ['Whisky – 45 ml', 'Orange juice – 45 ml', 'Soda – top'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  // ZERO-PROOF
  {
    id: 'virgin-mojito',
    name: 'Virgin Mojito',
    category: '🥤 ZERO-PROOF (NON-ALCOHOLIC)',
    ingredients: ['Mint – muddled', 'Lemon juice – 20 ml', 'Sugar – 2 tsp', 'Soda – top'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'spicy-guava-spritz',
    name: '🌶️ Spicy Guava Spritz',
    category: '🥤 ZERO-PROOF (NON-ALCOHOLIC)',
    ingredients: ['Guava juice – 120 ml', 'Lemon juice – 10 ml', 'Soda – top', 'Salt + chilli'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'orange-fizz',
    name: 'Orange Fizz',
    category: '🥤 ZERO-PROOF (NON-ALCOHOLIC)',
    ingredients: ['Orange juice – 90 ml', 'Soda – top'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
  {
    id: 'pineapple-cooler',
    name: 'Pineapple Cooler',
    category: '🥤 ZERO-PROOF (NON-ALCOHOLIC)',
    ingredients: ['Pineapple juice – 90 ml', 'Soda – top'],
    method: 'Build over ice',
    glass: 'Tall glass',
  },
];

export default function CocktailRecipesPage() {
  const { userRole } = useAuth();
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-close all accordions after 5 minutes
  useEffect(() => {
    // Only set timer if user is admin
    if (userRole !== 'admin') return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer to close all accordions after 5 minutes
    timerRef.current = setTimeout(() => {
      setOpenAccordions(new Set());
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [openAccordions, userRole]); // Reset timer whenever accordions change

  // Redirect if not admin
  if (userRole !== 'admin') {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              This page is only available to administrators.
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
        // Reset timer when opening an accordion
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          setOpenAccordions(new Set());
        }, 5 * 60 * 1000);
      }
      return newSet;
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              🍸 HOUSE BAR – RECIPE LIST
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Auto-closes in 5 minutes • Tap to expand recipe
            </p>
          </div>

          {/* Standard Bar Rules */}
          <div className="mb-4 rounded-lg bg-white p-5 shadow-md dark:bg-gray-800">
            <button
              onClick={() => toggleAccordion('bar-rules')}
              className="flex w-full items-center justify-between text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                🧊 STANDARD BAR RULES
              </h2>
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  openAccordions.has('bar-rules') ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordions.has('bar-rules') && (
              <div className="mt-4 space-y-2 text-base text-gray-700 dark:text-gray-300">
                <p><strong className="text-gray-900 dark:text-white">Strong pour:</strong> 45 ml spirit</p>
                <p><strong className="text-gray-900 dark:text-white">Light pour:</strong> 30 ml spirit</p>
                <p><strong className="text-gray-900 dark:text-white">Build order:</strong> Ice → Spirit → Mixer → Stir</p>
                <p><strong className="text-gray-900 dark:text-white">Glass:</strong> Tall glass for most drinks</p>
              </div>
            )}
          </div>

          {/* All Recipes - Direct by Name */}
          <div className="space-y-3">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="rounded-lg bg-white shadow-md dark:bg-gray-800">
                <button
                  onClick={() => toggleAccordion(recipe.id)}
                  className="flex w-full items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {recipe.name}
                    </h2>
                    {recipe.special && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 whitespace-nowrap">
                        {recipe.special}
                      </span>
                    )}
                  </div>
                  <svg
                    className={`h-6 w-6 flex-shrink-0 transform transition-transform text-gray-400 ${
                      openAccordions.has(recipe.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordions.has(recipe.id) && (
                  <div className="border-t border-gray-200 px-5 pb-5 pt-4 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">Ingredients:</p>
                        <ul className="space-y-1.5 text-base text-gray-700 dark:text-gray-300">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 text-gray-500">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Method:</p>
                          <p className="text-base text-gray-900 dark:text-white">{recipe.method}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Glass:</p>
                          <p className="text-base text-gray-900 dark:text-white">{recipe.glass}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Host Pro Tips */}
          <div className="mt-6 rounded-lg bg-blue-50 p-5 shadow-md dark:bg-blue-900/20">
            <button
              onClick={() => toggleAccordion('pro-tips')}
              className="flex w-full items-center justify-between text-left"
            >
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200">
                🧠 HOST PRO TIPS (VERY IMPORTANT)
              </h2>
              <svg
                className={`h-5 w-5 transform transition-transform text-blue-900 dark:text-blue-200 ${
                  openAccordions.has('pro-tips') ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordions.has('pro-tips') && (
              <div className="mt-4 space-y-3 text-base text-blue-800 dark:text-blue-300">
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">Pre-mix:</p>
                  <ul className="ml-4 mt-1 list-disc space-y-1">
                    <li>Spicy Guava base</li>
                    <li>Citrus base (lemon + sugar)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">Tips:</p>
                  <ul className="ml-4 mt-1 list-disc space-y-1">
                    <li>Keep LIT marked as "Limited"</li>
                    <li>Beer out first → cocktails later</li>
                    <li>One garnish only (lemon or mint) = faster service</li>
                    <li>Hide one backup bottle 😄</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

