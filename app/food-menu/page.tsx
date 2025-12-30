'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
});

export default function FoodMenuPage() {
  return (
    <ProtectedRoute>
      <div className={`${playfairDisplay.className} min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-4">
              <div className="inline-block border-t-2 border-gray-300 dark:border-gray-600 w-32"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              THE HOUSE BAR
            </h2>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              NEW YEAR SOIRÉE <span className="text-yellow-500">✨</span>
            </h1>
            <div className="mt-4">
              <div className="inline-block border-t-2 border-gray-300 dark:border-gray-600 w-32"></div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800 p-8 md:p-12">
            {/* Signature Creations */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  ✦ SIGNATURE CREATIONS ✦
                </h3>
                <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    COSMOPOLITAN
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Vodka • Cranberry • Citrus
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    LONG ISLAND ICED TEA
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Vodka • Gin • Rum • (Tequila*)
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Lemon • Cola
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 italic">
                    *Limited availability
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    SPICY GUAVA SMASH <span className="text-red-500">🌶️</span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Choice of Vodka / Gin / Rum
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Guava • Lemon • Chilli • Masala
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-8"></div>

            {/* Gin Selection */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  ✦ GIN SELECTION ✦
                </h3>
                <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GIN & TONIC
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GARDEN SPRITZ
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    BOTANICAL SUNSET
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GUAVA PICANTE <span className="text-red-500">🌶️</span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-8"></div>

            {/* Vodka Selection */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  ✦ VODKA SELECTION ✦
                </h3>
                <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    SCREWDRIVER
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    MIDNIGHT CRANBERRY SPRITZ
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    CITRUS SNOWFALL
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    WINTER MINT FIZZ
                  </h4>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-8"></div>

            {/* Rum Selection */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  ✦ RUM SELECTION ✦
                </h3>
                <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    RUM & COKE
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    ISLAND GLOW
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    SUNSET RUM PUNCH
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    CLASSIC MOJITO
                  </h4>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-8"></div>

            {/* Whisky Selection */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  ✦ WHISKY SELECTION ✦
                </h3>
                <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    SMOKED COLA HIGHBALL
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GINGER OAK
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    WHISKY CITRUS SPRITZ
                  </h4>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-8"></div>

            {/* Zero Proof */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  ✦ ZERO PROOF ✦
                </h3>
                <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    VIRGIN MOJITO
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    SPICY GUAVA SPRITZ <span className="text-red-500">🌶️</span>
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    ORANGE FIZZ
                  </h4>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    PINEAPPLE COOLER
                  </h4>
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <div className="mt-12 pt-8 border-t-2 border-gray-300 dark:border-gray-600">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  PLEASE DRINK RESPONSIBLY
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ENJOY THE NIGHT
                </p>
              </div>
              <div className="mt-6">
                <div className="border-t border-gray-300 dark:border-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

