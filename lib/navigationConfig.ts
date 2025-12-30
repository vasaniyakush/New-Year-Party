export interface NavigationItem {
  href: string;
  label: string;
  emoji?: string;
  gradientFrom?: string;
  gradientTo?: string;
  description?: string;
  adminOnly?: boolean;
}

// Single source of truth for navigation order
// Change the order here to update both navbar and home page
export const navigationItems: NavigationItem[] = [
  {
    href: '/rsvp',
    label: 'RSVP',
    emoji: '📝',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
    description: 'Confirm your attendance',
  },
  {
      href: '/food-menu',
      label: 'Food Menu',
      emoji: '🍽️',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-orange-600',
      description: 'View our delicious menu',
    },
    {
        href: '/activities',
        label: 'Activities',
        emoji: '🎮',
        gradientFrom: 'from-pink-500',
        gradientTo: 'to-pink-600',
        description: 'Fun games & activities',
    },
    {
        href: '/wallet',
        label: 'Wallet',
        emoji: '💰',
        gradientFrom: 'from-yellow-500',
        gradientTo: 'to-yellow-600',
        description: 'Manage your coins',
    },
    {
        href: '/expense-tracker',
        label: 'Expense Tracker',
        emoji: '💳',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-green-600',
        description: 'Track expenses',
    },
    {
      href: '/itinerary',
      label: 'Itinerary',
      emoji: '📅',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
      description: 'View event schedule',
    },
    {
      href: '/cocktail-recipes',
      label: 'Cocktail Recipes',
      emoji: '🍸',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-amber-600',
      description: 'House bar recipe list',
      adminOnly: true,
    },
];

// Navigation items for navbar (includes Home)
export const navbarItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  ...navigationItems,
];

