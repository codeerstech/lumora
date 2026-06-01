import { images } from './images'
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
    imageUrl: images.products.novaX1Mirrorless,
  },
  {
    id: 'nova-x1-kit',
    title: 'Nova X1 Creator Kit',
    category: 'Creator Bundle',
    price: '$2,249',
    rating: '4.8 / 5',
    reviewCount: 84,
    badges: ['Bundle'],
    imageUrl: images.products.novaX1CreatorKit,
  },
  {
    id: 'pocket-cinema',
    title: 'Arc Mini Cinema',
    category: 'Cinema',
    price: '$1,499',
    rating: '4.7 / 5',
    reviewCount: 56,
    badges: ['Cinema'],
    imageUrl: images.products.arcMiniCinema,
  },
  {
    id: 'street-compact',
    title: 'Street 35 Compact',
    category: 'Compact',
    price: '$899',
    rating: '4.6 / 5',
    reviewCount: 213,
    badges: ['Travel'],
    imageUrl: images.products.street35Compact,
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
    imageUrl: images.products.primeLens,
  },
  {
    id: 'zoom-2470',
    title: 'Luma Zoom 24-70',
    category: 'Zoom Lens',
    price: '$1,099',
    rating: '4.8 / 5',
    reviewCount: 147,
    badges: ['Pro'],
    imageUrl: images.products.zoomLens,
  },
]

export const page: TemplatePage = {
  meta: {
    title: 'Lumora Camera Co.',
    description: 'Camera e-commerce storefront with working cart, wishlist, checkout, and live newsletter capture.',
  },
  announcements: [
    'Free camera strap with every kit',
    'Free gifts with every purchase',
    'New products launching soon',
  ],
  hero: {
    eyebrow: 'Creator-ready camera kits',
    title: 'Frame the shot',
    subtitle: 'Mirrorless bodies, compact cinema tools, and glass built for travel, studio, and street work.',
    cta: { label: 'Shop Camera Kits', href: '#new-season' },
    imageUrl: images.home.hero,
  },
  quickLinks: [
    { title: 'Mirrorless Cameras', href: '#new-season', imageUrl: images.quickLinks.mirrorlessCameras },
    { title: 'Cinema Cameras', href: '#categories', imageUrl: images.quickLinks.cinemaCameras },
    { title: 'Compact Cameras', href: '#categories', imageUrl: images.quickLinks.compactCameras },
    { title: 'Creator Kits', href: '#categories', imageUrl: images.quickLinks.creatorKits },
    { title: 'Weather Sealed Gear', href: '#surf', imageUrl: images.quickLinks.weatherSealedGear },
    { title: 'Lenses', href: '#categories', imageUrl: images.quickLinks.lenses },
    { title: 'Bags', href: '#categories', imageUrl: images.quickLinks.bags },
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
        'Weather-ready bodies, padded packs, and compact support gear for long days on location.',
      cta: { label: 'Shop Best Sellers', href: '#new-season' },
      imageUrl: images.banners.roughLocations,
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
        imageUrl: images.products.fieldPack,
      },
      {
        id: 'travel-tripod',
        title: 'Carbon Travel Tripod',
        category: 'Tripod',
        price: '$340',
        rating: '4.7 / 5',
        reviewCount: 104,
        badges: ['Lightweight'],
        imageUrl: images.products.carbonTripod,
      },
    ],
  },
  categoryCollections: {
    eyebrow: 'Shop by category',
    title: 'Bodies, lenses, bags, and support',
    description: 'Find the core pieces for everyday shoots, studio builds, and field production.',
    items: [
      { title: 'Mirrorless Bodies', href: '#new-season', imageUrl: images.collections.mirrorlessBodies },
      { title: 'Camera Lenses', href: '#new-season', imageUrl: images.collections.lensCloseUp },
      { title: 'Lens Kits', href: '#new-season', imageUrl: images.collections.lensKit },
      { title: 'Lens Details', href: '#new-season', imageUrl: images.collections.lensDetail },
      { title: 'Camera Supports', href: '#surf', imageUrl: images.collections.cameraSupport },
      { title: 'Gimbal Supports', href: '#surf', imageUrl: images.collections.waterGimbal },
      { title: 'Support Rigs', href: '#surf', imageUrl: images.collections.supportRig },
      { title: 'Camera Bags', href: '#surf', imageUrl: images.collections.cameraBags },
    ],
  },
  newsletter: {
    title: 'Get first access to new drops',
    description: 'A compact sign-up block for product launches, creator events, and kit discounts.',
    emailPlaceholder: 'you@example.com',
    submitLabel: 'Join List',
  },
}
