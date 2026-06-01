import type { NavGroup } from './types'

export const site = {
  brand: {
    name: 'Lumora Camera Co.',
    shortName: 'Lumora',
  },
  utilityLinks: [
    { label: 'Order Status', href: '#order-status' },
    { label: 'Find a Store', href: '#stores' },
    { label: 'Sign in', href: '#signin' },
  ],
  countries: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France'],
  footer: '© 2026 Lumora Camera Co. Working camera storefront with live newsletter capture.',
}

export const navGroups: NavGroup[] = [
  {
    label: 'Cameras',
    featured: 'Shop by format',
    items: [
      { label: 'New Arrivals', href: '#new-season' },
      { label: 'Best Sellers', href: '#new-season' },
      { label: 'Mirrorless', href: '#categories' },
      { label: 'Cinema', href: '#categories' },
      { label: 'Compact', href: '#categories' },
      { label: 'Weather Sealed', href: '#surf' },
    ],
  },
  {
    label: 'Featured Kits',
    featured: 'Ready-to-shoot setups',
    items: [
      { label: 'Creator Kits', href: '#new-season' },
      { label: 'Travel Kits', href: '#categories' },
      { label: 'Studio Kits', href: '#new-season' },
      { label: 'Gift Guide', href: '#newsletter' },
    ],
  },
  {
    label: 'Lenses',
    featured: 'Glass and adapters',
    items: [
      { label: 'Prime Lenses', href: '#categories' },
      { label: 'Zoom Lenses', href: '#categories' },
      { label: 'Macro Lenses', href: '#categories' },
      { label: 'Adapters', href: '#categories' },
    ],
  },
  {
    label: 'Bags',
    featured: 'Accessories',
    items: [
      { label: 'Camera Bags', href: '#categories' },
      { label: 'Tripods', href: '#categories' },
      { label: 'Lighting', href: '#categories' },
    ],
  },
]
