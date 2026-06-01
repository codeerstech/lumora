import { assets } from './assets'
import type { ProductCard, TemplatePage } from './types'

const mirrorlessProducts: ProductCard[] = [
  {
    id: 'nova-x1',
    title: 'Nova X1 Mirrorless',
    category: 'Full Frame',
    price: '$1,899',
    rating: '4.9 / 5',
    reviewCount: 128,
    badges: ['New', '4K'],
    imageUrl: assets.products.ocoSilver,
  },
  {
    id: 'nova-x1-kit',
    title: 'Nova X1 Creator Kit',
    category: 'Creator Bundle',
    price: '$2,249',
    rating: '4.8 / 5',
    reviewCount: 84,
    badges: ['Bundle'],
    imageUrl: assets.products.ocoBlack,
  },
  {
    id: 'pocket-cinema',
    title: 'Arc Mini Cinema',
    category: 'Cinema',
    price: '$1,499',
    rating: '4.7 / 5',
    reviewCount: 56,
    badges: ['Cinema'],
    imageUrl: assets.products.sentryGreen,
  },
  {
    id: 'street-compact',
    title: 'Street 35 Compact',
    category: 'Compact',
    price: '$899',
    rating: '4.6 / 5',
    reviewCount: 213,
    badges: ['Travel'],
    imageUrl: assets.products.chronoLeather,
  },
]

const lensProducts: ProductCard[] = [
  {
    id: 'prime-50',
    title: 'Luma Prime 50mm',
    category: 'Prime Lens',
    price: '$599',
    rating: '4.9 / 5',
    reviewCount: 331,
    badges: ['Fast Glass'],
    imageUrl: assets.products.timeTellerGold,
  },
  {
    id: 'zoom-2470',
    title: 'Luma Zoom 24-70',
    category: 'Zoom Lens',
    price: '$1,099',
    rating: '4.8 / 5',
    reviewCount: 147,
    badges: ['Pro'],
    imageUrl: assets.products.eddyBlue,
  },
]

export const page: TemplatePage = {
  meta: {
    title: 'Lumora Camera Co.',
    description: 'Original camera e-commerce storefront with working fake cart, wishlist, and checkout.',
  },
  announcements: [
    'Free camera strap with every kit',
    'Free shipping on creator bundles',
    'Sign up for early access to lens drops',
  ],
  hero: {
    eyebrow: 'Creator-ready camera kits',
    title: 'Frame the shot',
    subtitle: 'Mirrorless bodies, compact cinema tools, and glass built for travel, studio, and street work.',
    cta: { label: 'Shop Camera Kits', href: '#new-season' },
    imageUrl: assets.heroImageUrl,
  },
  quickLinks: [
    { title: 'Mirrorless Cameras', href: '#new-season', imageUrl: assets.categories.womens },
    { title: 'Cinema Cameras', href: '#categories', imageUrl: assets.categories.analog },
    { title: 'Compact Cameras', href: '#categories', imageUrl: assets.categories.digital },
    { title: 'Creator Kits', href: '#categories', imageUrl: assets.categories.custom },
    { title: 'Weather Sealed Gear', href: '#surf', imageUrl: assets.categories.surf },
    { title: 'Lenses', href: '#categories', imageUrl: assets.categories.bands },
    { title: 'Bags & Lighting', href: '#categories', imageUrl: assets.categories.headwear },
  ],
  newSeason: {
    eyebrow: 'New this season',
    title: 'Camera drops for creators and working studios',
    description: 'Tabbed rails let this storefront support bodies, lenses, kits, accessories, and seasonal drops.',
    cta: { label: 'View all', href: '#new-season' },
    items: mirrorlessProducts,
    tabs: [
      {
        label: 'Cameras',
        description: 'Shop camera bodies and bundles for travel, studio, and field production.',
        products: mirrorlessProducts,
      },
      {
        label: 'Lenses',
        description: 'Pair bodies with fast prime and versatile zoom lenses.',
        products: lensProducts,
      },
    ],
  },
  brandBanners: [
    {
      eyebrow: 'Shoot anywhere',
      title: 'Compact gear for bright ideas and rough locations.',
      description:
        'Use this editorial banner for launch films, creator stories, studio bundles, or seasonal camera campaigns.',
      cta: { label: 'Shop Best Sellers', href: '#new-season' },
      imageUrl: assets.brandVideoPosterUrl,
      dark: true,
    },
  ],
  surfRail: {
    eyebrow: 'Field ready',
    title: 'Weather-sealed essentials',
    description:
      'Collection rails can promote rugged kits, travel packs, lighting, storage, and camera accessories.',
    cta: { label: 'Shop Field Gear', href: '#surf' },
    items: [
      {
        id: 'field-pack',
        title: 'Field Pack 18L',
        category: 'Camera Bag',
        price: '$220',
        rating: '4.8 / 5',
        reviewCount: 88,
        badges: ['Water Resistant'],
        imageUrl: assets.products.heat,
      },
      {
        id: 'travel-tripod',
        title: 'Carbon Travel Tripod',
        category: 'Tripod',
        price: '$340',
        rating: '4.7 / 5',
        reviewCount: 104,
        badges: ['Lightweight'],
        imageUrl: assets.products.highTide,
      },
    ],
  },
  categoryCollections: {
    eyebrow: 'Shop by category',
    title: 'Camera retail categories that are easy to swap',
    description: 'Use the same card structure for bodies, lenses, bags, lighting, storage, and services.',
    items: [
      { title: 'Mirrorless Bodies', href: '#new-season', imageUrl: assets.categories.analog },
      { title: 'Lenses', href: '#new-season', imageUrl: assets.categories.womens },
      { title: 'Creator Kits', href: '#categories', imageUrl: assets.categories.custom },
      { title: 'Bags & Supports', href: '#categories', imageUrl: assets.categories.bands },
    ],
  },
  newsletter: {
    title: 'Get first access to new drops',
    description: 'A compact sign-up block for product launches, creator events, and kit discounts.',
    emailPlaceholder: 'you@example.com',
    submitLabel: 'Join List',
  },
}
