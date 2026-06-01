import { useEffect, useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  CreditCard,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  User,
  X,
} from 'lucide-react'
import { page } from './constants/pages'
import { navGroups, site } from './constants/site'
import { themeStyle } from './constants/theme'
import type { CategoryCard, MediaBanner, ProductCard } from './constants/types'

type CartItem = {
  product: ProductCard
  quantity: number
}

function priceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

function money(value: number) {
  return `$${value.toFixed(2).replace(/\.00$/, '')}`
}

function ImageFrame({
  imageUrl,
  title,
  className = '',
  dark = false,
}: {
  imageUrl: string
  title: string
  className?: string
  dark?: boolean
}) {
  if (imageUrl) {
    return <img className={`h-full w-full object-cover ${className}`} src={imageUrl} alt={title} loading="lazy" />
  }

  return (
    <div
      className={`flex h-full min-h-48 w-full items-center justify-center p-6 text-center ${
        dark ? 'bg-[linear-gradient(135deg,var(--color-dark),var(--color-dark-soft))] text-white' : 'bg-[linear-gradient(135deg,var(--color-surface-soft),var(--color-surface))] text-[var(--color-muted)]'
      } ${className}`}
      role="img"
      aria-label={`${title} image placeholder`}
      data-empty-image="true"
    >
      <div>
        <ShoppingBag className="mx-auto mb-3" size={32} aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-[0.2em]">{title}</span>
      </div>
    </div>
  )
}

function Header({
  cartCount,
  onOpenCart,
  onOpenCountry,
  onOpenWishlist,
  wishlistCount,
}: {
  cartCount: number
  onOpenCart: () => void
  onOpenCountry: () => void
  onOpenWishlist: () => void
  wishlistCount: number
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-surface)]/96 backdrop-blur">
      <div className="flex min-h-10 items-center justify-center bg-[var(--color-dark)] px-4 text-center text-xs font-black uppercase tracking-[0.18em] text-white">
        {page.announcements[0]}
      </div>
      <div className="mx-auto flex h-20 w-[min(var(--container),calc(100%-32px))] items-center gap-3 sm:gap-5">
        <button className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)] lg:hidden" type="button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <a className="text-xl font-black uppercase tracking-[0.14em] text-[var(--color-heading)] sm:text-2xl sm:tracking-[0.22em]" href="#" aria-label={`${site.brand.name} home`}>
          {site.brand.shortName}
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="group relative" key={group.label}>
              <button className="inline-flex items-center gap-1 rounded-[var(--radius-control)] px-4 py-3 text-sm font-black uppercase text-[var(--color-heading)] hover:bg-[var(--color-surface-soft)]" type="button">
                {group.label}
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full grid w-[660px] -translate-x-1/2 translate-y-2 grid-cols-[0.8fr_1.2fr] gap-5 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 opacity-0 shadow-[var(--shadow-card)] transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-[var(--radius-card)] bg-[var(--color-dark)] p-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">{group.featured ?? 'Featured'}</p>
                  <h2 className="mt-3 text-2xl font-black">{group.label}</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <a className="rounded-[var(--radius-control)] px-3 py-2 text-sm font-bold text-[var(--color-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-heading)]" href={item.href} key={item.href}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden rounded-[var(--radius-pill)] border border-[var(--color-line)] px-4 py-2 text-sm font-black uppercase md:inline-flex" type="button" onClick={onOpenCountry}>
            United States
          </button>
          <button className="hidden h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)] sm:grid" type="button" aria-label="Search">
            <Search size={19} />
          </button>
          <button className="hidden h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)] md:grid" type="button" aria-label="Account">
            <User size={19} />
          </button>
          <button className="relative grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)]" type="button" onClick={onOpenWishlist} aria-label="Open wishlist">
            <Heart size={19} />
            {wishlistCount > 0 ? <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-accent)] text-xs font-black text-[var(--color-dark)]">{wishlistCount}</span> : null}
          </button>
          <button className="relative grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)]" type="button" onClick={onOpenCart} aria-label="Open cart">
            <ShoppingBag size={19} />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-accent)] text-xs font-black text-[var(--color-dark)]">{cartCount}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-4 lg:hidden">
          {navGroups.map((group) => (
            <details className="rounded-[var(--radius-control)] border-b border-[var(--color-line)] py-2" key={group.label}>
              <summary className="cursor-pointer list-none text-base font-black uppercase text-[var(--color-heading)]">{group.label}</summary>
              <div className="mt-2 grid gap-1">
                {group.items.map((item) => (
                  <a className="rounded-[var(--radius-control)] px-3 py-2 font-bold text-[var(--color-muted)]" href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            </details>
          ))}
          <button className="mt-4 w-full rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-5 py-3 text-sm font-black uppercase text-white" type="button" onClick={onOpenCountry}>
            Choose Region
          </button>
        </div>
      ) : null}
    </header>
  )
}

function CategoryLink({ item }: { item: CategoryCard }) {
  return (
    <a className="group min-w-[168px] flex-1 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]" href={item.href}>
      <div className="aspect-square overflow-hidden">
        <ImageFrame imageUrl={item.imageUrl} title={item.title} />
      </div>
      <span className="block px-4 py-3 text-center text-sm font-black uppercase text-[var(--color-heading)] group-hover:bg-[var(--color-dark)] group-hover:text-white">
        {item.title}
      </span>
    </a>
  )
}

function ProductCardView({
  wished,
  product,
  compared,
  onAddToCart,
  onToggleCompare,
  onToggleWishlist,
}: {
  wished: boolean
  product: ProductCard
  compared: boolean
  onAddToCart: () => void
  onToggleCompare: () => void
  onToggleWishlist: () => void
}) {
  return (
    <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
      <button className={`absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/92 ${wished ? 'text-[var(--color-sale)]' : 'text-[var(--color-heading)]'}`} type="button" onClick={onToggleWishlist} aria-label={`${wished ? 'Remove from' : 'Save to'} wishlist ${product.title}`}>
        <Heart size={18} className={wished ? 'fill-[var(--color-sale)]' : ''} />
      </button>
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
        {product.badges.map((badge) => (
          <span className="rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <div className="aspect-square">
        <ImageFrame imageUrl={product.imageUrl} title={product.title} />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-sm font-bold text-[var(--color-muted)]">
          <Star size={15} className="fill-[var(--color-heading)] text-[var(--color-heading)]" />
          {product.rating}
          <span>({product.reviewCount})</span>
        </div>
        <h3 className="mt-3 text-lg font-black text-[var(--color-heading)]">{product.title}</h3>
        <p className="mt-1 text-sm font-bold text-[var(--color-muted)]">{product.category}</p>
        <div className="mt-4 flex items-center gap-2">
          <strong className="text-lg font-black text-[var(--color-heading)]">{product.price}</strong>
          {product.compareAt ? <span className="text-sm font-bold text-[var(--color-sale)] line-through">{product.compareAt}</span> : null}
        </div>
        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-3 text-sm font-black uppercase text-white" type="button" onClick={onAddToCart}>
          <ShoppingBag size={17} />
          Add to Cart
        </button>
        <button className={`mt-3 flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] px-4 py-3 text-sm font-black uppercase ${compared ? 'bg-[var(--color-accent)] text-[var(--color-dark)]' : 'border border-[var(--color-line)] text-[var(--color-heading)]'}`} type="button" onClick={onToggleCompare}>
          {compared ? <Check size={17} /> : <Plus size={17} />}
          {compared ? 'Added to Compare' : 'Compare'}
        </button>
      </div>
    </article>
  )
}

function SectionIntro({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow?: string
  title: string
  description?: string
  cta?: { label: string; href: string }
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--color-muted)]">{eyebrow}</p> : null}
        <h2 className="text-3xl font-black leading-tight text-[var(--color-heading)] md:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-base text-[var(--color-muted)] md:text-lg">{description}</p> : null}
      </div>
      {cta ? (
        <a className="inline-flex w-fit rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-5 py-3 text-sm font-black uppercase text-white" href={cta.href}>
          {cta.label}
        </a>
      ) : null}
    </div>
  )
}

function ProductRail({
  wishlist,
  compared,
  onAddToCart,
  onToggleCompare,
  onToggleWishlist,
}: {
  wishlist: Set<string>
  compared: Set<string>
  onAddToCart: (product: ProductCard) => void
  onToggleCompare: (id: string) => void
  onToggleWishlist: (id: string) => void
}) {
  const [activeTab, setActiveTab] = useState(page.newSeason.tabs[0]?.label ?? '')
  const active = page.newSeason.tabs.find((tab) => tab.label === activeTab) ?? page.newSeason.tabs[0]

  return (
    <section id="new-season" className="mx-auto w-[min(var(--container),calc(100%-32px))] py-16">
      <SectionIntro eyebrow={page.newSeason.eyebrow} title={page.newSeason.title} description={page.newSeason.description} cta={page.newSeason.cta} />
      <div className="mb-6 flex flex-wrap gap-2">
        {page.newSeason.tabs.map((tab) => (
          <button className={`rounded-[var(--radius-pill)] px-5 py-3 text-sm font-black uppercase ${tab.label === activeTab ? 'bg-[var(--color-dark)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-heading)]'}`} type="button" onClick={() => setActiveTab(tab.label)} key={tab.label}>
            {tab.label}
          </button>
        ))}
      </div>
      <p className="mb-6 max-w-2xl text-[var(--color-muted)]">{active.description}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {active.products.map((product) => (
          <ProductCardView
            compared={compared.has(product.id)}
            key={product.id}
            product={product}
            wished={wishlist.has(product.id)}
            onAddToCart={() => onAddToCart(product)}
            onToggleCompare={() => onToggleCompare(product.id)}
            onToggleWishlist={() => onToggleWishlist(product.id)}
          />
        ))}
      </div>
    </section>
  )
}

function MediaBannerView({ banner }: { banner: MediaBanner }) {
  return (
    <section className={`${banner.dark ? 'bg-[var(--color-dark)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-heading)]'} py-16`}>
      <div className="mx-auto grid w-[min(var(--container),calc(100%-32px))] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className={`mb-3 text-xs font-black uppercase tracking-[0.22em] ${banner.dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}`}>{banner.eyebrow}</p>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">{banner.title}</h2>
          <p className={`mt-5 max-w-2xl text-lg ${banner.dark ? 'text-white/72' : 'text-[var(--color-muted)]'}`}>{banner.description}</p>
          <a className="mt-8 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-4 text-sm font-black uppercase text-[var(--color-dark)]" href={banner.cta.href}>
            {banner.cta.label}
          </a>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/15">
          <ImageFrame imageUrl={banner.imageUrl} title={banner.title} dark={banner.dark} />
        </div>
      </div>
    </section>
  )
}

function CartDrawer({
  items,
  open,
  onCheckout,
  onClose,
  onDecrement,
  onIncrement,
  onRemove,
  checkoutComplete,
}: {
  items: CartItem[]
  open: boolean
  onCheckout: () => void
  onClose: () => void
  onDecrement: (id: string) => void
  onIncrement: (product: ProductCard) => void
  onRemove: (id: string) => void
  checkoutComplete: boolean
}) {
  if (!open) return null

  const subtotal = items.reduce((total, item) => total + priceValue(item.product.price) * item.quantity, 0)
  const shipping = items.length > 0 ? 12 : 0
  const tax = subtotal * 0.0825
  const total = subtotal + shipping + tax

  return (
    <aside className="fixed inset-0 z-50 bg-black/45" aria-label="Cart drawer">
      <div className="ml-auto flex h-full w-full max-w-lg flex-col bg-[var(--color-surface)] shadow-[var(--shadow-drawer)]">
        <div className="flex items-center justify-between border-b border-[var(--color-line)] p-5">
          <strong className="text-xl font-black uppercase text-[var(--color-heading)]">Cart</strong>
          <button className="grid h-10 w-10 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)]" type="button" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <div className="flex min-h-80 items-center justify-center text-center">
              <div>
                <ShoppingBag className="mx-auto mb-4" size={42} />
                <h2 className="text-2xl font-black text-[var(--color-heading)]">Your cart is ready for products.</h2>
                <p className="mt-2 text-[var(--color-muted)]">Add items to preview quantity controls, totals, and fake payment.</p>
              </div>
            </div>
          ) : null}
          <div className="space-y-4">
            {items.map((item) => (
              <article className="grid grid-cols-[88px_1fr] gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] p-3" key={item.product.id}>
                <div className="overflow-hidden rounded-[var(--radius-control)]">
                  <ImageFrame imageUrl={item.product.imageUrl} title={item.product.title} />
                </div>
                <div>
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-black text-[var(--color-heading)]">{item.product.title}</h3>
                      <p className="text-sm font-bold text-[var(--color-muted)]">{item.product.category}</p>
                    </div>
                    <button className="grid h-9 w-9 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)] text-[var(--color-muted)]" type="button" onClick={() => onRemove(item.product.id)} aria-label={`Remove ${item.product.title}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-line)]">
                      <button className="grid h-9 w-9 place-items-center" type="button" onClick={() => onDecrement(item.product.id)} aria-label={`Decrease ${item.product.title}`}>
                        <Minus size={15} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                      <button className="grid h-9 w-9 place-items-center" type="button" onClick={() => onIncrement(item.product)} aria-label={`Increase ${item.product.title}`}>
                        <Plus size={15} />
                      </button>
                    </div>
                    <strong>{money(priceValue(item.product.price) * item.quantity)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {items.length > 0 ? (
            <div className="mt-5 rounded-[var(--radius-card)] bg-[var(--color-surface-soft)] p-4">
              <h3 className="flex items-center gap-2 font-black uppercase text-[var(--color-heading)]">
                <CreditCard size={18} />
                Fake payment
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input className="rounded-[var(--radius-control)] border border-[var(--color-line)] bg-white px-3 py-2 text-sm" placeholder="4242 4242 4242 4242" aria-label="Fake card number" />
                <input className="rounded-[var(--radius-control)] border border-[var(--color-line)] bg-white px-3 py-2 text-sm" placeholder="MM / YY" aria-label="Fake card expiry" />
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[var(--color-muted)]">
                <Truck size={16} />
                Mock shipping and payment only. No charge is made.
              </p>
              {checkoutComplete ? <p className="mt-3 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-3 py-2 text-sm font-black text-[var(--color-dark)]">Fake order placed successfully.</p> : null}
            </div>
          ) : null}
        </div>
        <div className="border-t border-[var(--color-line)] p-5">
          <div className="space-y-2 text-sm font-bold text-[var(--color-muted)]">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{money(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated tax</span>
              <span>{money(tax)}</span>
            </div>
          </div>
          <div className="my-4 flex items-center justify-between text-lg font-black">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <button className="w-full rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-5 py-4 text-sm font-black uppercase text-white disabled:cursor-not-allowed disabled:opacity-45" type="button" onClick={onCheckout} disabled={items.length === 0}>
            Pay with Fake Checkout
          </button>
        </div>
      </div>
    </aside>
  )
}

function WishlistDrawer({
  products,
  open,
  onAddToCart,
  onClose,
  onRemove,
}: {
  products: ProductCard[]
  open: boolean
  onAddToCart: (product: ProductCard) => void
  onClose: () => void
  onRemove: (id: string) => void
}) {
  if (!open) return null

  return (
    <aside className="fixed inset-0 z-50 bg-black/45" aria-label="Wishlist drawer">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-[var(--color-surface)] shadow-[var(--shadow-drawer)]">
        <div className="flex items-center justify-between border-b border-[var(--color-line)] p-5">
          <strong className="text-xl font-black uppercase text-[var(--color-heading)]">Wishlist</strong>
          <button className="grid h-10 w-10 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)]" type="button" onClick={onClose} aria-label="Close wishlist">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {products.length === 0 ? (
            <div className="flex min-h-80 items-center justify-center text-center">
              <div>
                <Heart className="mx-auto mb-4" size={42} />
                <h2 className="text-2xl font-black text-[var(--color-heading)]">Save products for later.</h2>
                <p className="mt-2 text-[var(--color-muted)]">Tap the heart on any product card to build a wishlist.</p>
              </div>
            </div>
          ) : null}
          <div className="space-y-4">
            {products.map((product) => (
              <article className="grid grid-cols-[88px_1fr] gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] p-3" key={product.id}>
                <div className="overflow-hidden rounded-[var(--radius-control)]">
                  <ImageFrame imageUrl={product.imageUrl} title={product.title} />
                </div>
                <div>
                  <h3 className="font-black text-[var(--color-heading)]">{product.title}</h3>
                  <p className="text-sm font-bold text-[var(--color-muted)]">{product.category}</p>
                  <strong className="mt-2 block">{product.price}</strong>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-3 py-2 text-xs font-black uppercase text-white" type="button" onClick={() => onAddToCart(product)}>
                      Add to Cart
                    </button>
                    <button className="grid h-9 w-9 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)] text-[var(--color-muted)]" type="button" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.title}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function CountrySelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label="Country selector">
      <div className="w-full max-w-xl rounded-[var(--radius-card)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-drawer)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-[var(--color-heading)]">Choose your region</h2>
          <button className="grid h-10 w-10 place-items-center rounded-[var(--radius-control)] border border-[var(--color-line)]" type="button" onClick={onClose} aria-label="Close country selector">
            <X size={18} />
          </button>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {site.countries.map((country) => (
            <button className="rounded-[var(--radius-control)] border border-[var(--color-line)] px-4 py-3 text-left font-bold text-[var(--color-heading)] hover:bg-[var(--color-surface-soft)]" type="button" key={country} onClick={onClose}>
              {country}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [compared, setCompared] = useState<Set<string>>(new Set())
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [cart, setCart] = useState<CartItem[]>([])
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const cssVars = useMemo(() => themeStyle(), [])
  const allProducts = useMemo(
    () => [...page.newSeason.tabs.flatMap((tab) => tab.products), ...page.surfRail.items],
    [],
  )
  const wishlistProducts = allProducts.filter((product) => wishlist.has(product.id))
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  useEffect(() => {
    document.title = page.meta.title
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = page.meta.description
  }, [])

  function toggleCompare(id: string) {
    setCompared((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleWishlist(id: string) {
    setWishlist((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function addToCart(product: ProductCard) {
    setCheckoutComplete(false)
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function decrementCart(id: string) {
    setCheckoutComplete(false)
    setCart((current) =>
      current
        .map((item) => (item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(id: string) {
    setCheckoutComplete(false)
    setCart((current) => current.filter((item) => item.product.id !== id))
  }

  return (
    <div style={cssVars} className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenCountry={() => setCountryOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main>
        <section className="relative overflow-hidden bg-[var(--color-dark)] text-white">
          <div className="absolute inset-0 opacity-40">
            <ImageFrame imageUrl={page.hero.imageUrl} title={page.hero.title} dark />
          </div>
          <div className="relative mx-auto flex min-h-[620px] w-[min(var(--container),calc(100%-32px))] items-end py-16">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">{page.hero.eyebrow}</p>
              <h1 className="text-5xl font-black uppercase leading-[0.92] md:text-8xl">{page.hero.title}</h1>
              <p className="mt-6 max-w-xl text-lg text-white/76 md:text-xl">{page.hero.subtitle}</p>
              <a className="mt-8 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-4 text-sm font-black uppercase text-[var(--color-dark)]" href={page.hero.cta.href}>
                {page.hero.cta.label}
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[min(var(--container),calc(100%-32px))] py-8">
          <div className="flex gap-4 overflow-x-auto pb-3">
            {page.quickLinks.map((item) => (
              <CategoryLink item={item} key={item.title} />
            ))}
          </div>
        </section>

        <ProductRail
          compared={compared}
          wishlist={wishlist}
          onAddToCart={addToCart}
          onToggleCompare={toggleCompare}
          onToggleWishlist={toggleWishlist}
        />

        {page.brandBanners.map((banner) => (
          <MediaBannerView banner={banner} key={banner.title} />
        ))}

        <section id="surf" className="mx-auto w-[min(var(--container),calc(100%-32px))] py-16">
          <SectionIntro eyebrow={page.surfRail.eyebrow} title={page.surfRail.title} description={page.surfRail.description} cta={page.surfRail.cta} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.surfRail.items.map((product) => (
              <ProductCardView
                compared={compared.has(product.id)}
                key={product.id}
                product={product}
                wished={wishlist.has(product.id)}
                onAddToCart={() => addToCart(product)}
                onToggleCompare={() => toggleCompare(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
              />
            ))}
          </div>
        </section>

        <section id="categories" className="bg-[var(--color-surface)] py-16">
          <div className="mx-auto w-[min(var(--container),calc(100%-32px))]">
            <SectionIntro eyebrow={page.categoryCollections.eyebrow} title={page.categoryCollections.title} description={page.categoryCollections.description} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.categoryCollections.items.map((item) => (
                <CategoryLink item={item} key={item.title} />
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="mx-auto grid w-[min(var(--container),calc(100%-32px))] items-center gap-6 py-16 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-4xl font-black uppercase text-[var(--color-heading)]">{page.newsletter.title}</h2>
            <p className="mt-3 text-[var(--color-muted)]">{page.newsletter.description}</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input className="min-h-14 flex-1 rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-white px-5 text-[var(--color-heading)] outline-none focus:border-[var(--color-dark)]" type="email" placeholder={page.newsletter.emailPlaceholder} aria-label="Email address" />
            <button className="rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-7 py-4 text-sm font-black uppercase text-white" type="submit">
              {page.newsletter.submitLabel}
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-[var(--color-line)] bg-[var(--color-dark)] text-white">
        <div className="mx-auto grid w-[min(var(--container),calc(100%-32px))] gap-8 py-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <strong className="text-2xl font-black uppercase tracking-[0.22em]">{site.brand.shortName}</strong>
            <p className="mt-4 text-white/64">{site.footer}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {navGroups.slice(0, 3).map((group) => (
              <div key={group.label}>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">{group.label}</h3>
                {group.items.slice(0, 4).map((item) => (
                  <a className="mb-2 block text-sm text-white/72" href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-5 py-3 text-sm font-black uppercase text-white shadow-[var(--shadow-drawer)]">
        <span>{compared.size} compared</span>
        <button className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10" type="button" onClick={() => setCompared(new Set())} aria-label="Clear comparison">
          <Minus size={14} />
        </button>
      </div>

      <CartDrawer
        checkoutComplete={checkoutComplete}
        items={cart}
        open={cartOpen}
        onCheckout={() => setCheckoutComplete(true)}
        onClose={() => setCartOpen(false)}
        onDecrement={decrementCart}
        onIncrement={addToCart}
        onRemove={removeFromCart}
      />
      <WishlistDrawer
        open={wishlistOpen}
        products={wishlistProducts}
        onAddToCart={addToCart}
        onClose={() => setWishlistOpen(false)}
        onRemove={toggleWishlist}
      />
      <CountrySelector open={countryOpen} onClose={() => setCountryOpen(false)} />
    </div>
  )
}
