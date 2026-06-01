import { chromium } from 'playwright'

const baseUrl = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173'
const viewports = [
  { width: 1440, height: 1000, name: 'desktop' },
  { width: 390, height: 900, name: 'mobile' },
]

const failures = []
const browser = await chromium.launch({ headless: true })

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport })
  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(error.message))

  const response = await page.goto(baseUrl, { waitUntil: 'networkidle' })
  const metrics = await page.evaluate(() => ({
    bodyLength: document.body.innerText.length,
    clientWidth: document.documentElement.clientWidth,
    h1: document.querySelector('h1')?.textContent ?? '',
    placeholders: document.querySelectorAll('[data-empty-image="true"]').length,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
  }))

  if (!response?.ok()) failures.push(`${viewport.name}: HTTP ${response?.status()}`)
  if (consoleErrors.length > 0) failures.push(`${viewport.name}: ${consoleErrors.join(' | ')}`)
  if (metrics.scrollWidth > metrics.clientWidth + 2) {
    failures.push(`${viewport.name}: horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`)
  }
  if (!metrics.h1 || metrics.bodyLength < 500) failures.push(`${viewport.name}: sparse render`)
  if (!metrics.title || !metrics.description) failures.push(`${viewport.name}: missing route metadata`)
  if (metrics.placeholders < 8) failures.push(`${viewport.name}: expected empty-image placeholders to render`)

  if (viewport.name === 'mobile') {
    await page.getByLabel('Open navigation').click()
    const mobileLinkVisible = await page.locator('a[href="#new-season"]', { hasText: 'New Arrivals' }).last().isVisible()
    if (!mobileLinkVisible) failures.push('mobile nav: new arrivals link not visible after menu open')
  }

  await page.close()
}

const interactivePage = await browser.newPage({ viewport: { width: 1280, height: 1000 } })
await interactivePage.goto(baseUrl, { waitUntil: 'networkidle' })
await interactivePage.getByLabel('Open cart').click()
const cartVisible = await interactivePage.getByText('Your cart is ready for products.').isVisible()
if (!cartVisible) failures.push('cart: drawer did not open')
await interactivePage.getByLabel('Close cart').click()
await interactivePage.getByLabel(/Save to wishlist/).first().click()
await interactivePage.getByLabel('Open wishlist').click()
const wishlistVisible = await interactivePage.getByText('Wishlist').isVisible()
const wishlistProductVisible = await interactivePage.locator('aside[aria-label="Wishlist drawer"] article').first().isVisible()
if (!wishlistVisible || !wishlistProductVisible) failures.push('wishlist: saved product did not appear')
await interactivePage.getByLabel('Close wishlist').click()
await interactivePage.getByText('Add to Cart').first().click()
const cartProductVisible = await interactivePage.locator('aside[aria-label="Cart drawer"] article').first().isVisible()
const subtotalVisible = await interactivePage.getByText('Estimated tax').isVisible()
if (!cartProductVisible || !subtotalVisible) failures.push('cart: added product or totals did not appear')
await interactivePage.getByText('Pay with Fake Checkout').click()
const paymentVisible = await interactivePage.getByText('Fake order placed successfully.').isVisible()
if (!paymentVisible) failures.push('payment: fake checkout success did not appear')
await interactivePage.getByLabel('Close cart').click()
await interactivePage.getByText('United States').first().click()
const countryVisible = await interactivePage.getByText('Choose your region').isVisible()
if (!countryVisible) failures.push('country: selector did not open')
await interactivePage.getByLabel('Close country selector').click()
await interactivePage.getByText('Compare').first().click()
const comparedVisible = await interactivePage.getByText('Added to Compare').first().isVisible()
if (!comparedVisible) failures.push('compare: product compare state did not toggle')
await interactivePage.close()

await browser.close()

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('Browser QA passed')
