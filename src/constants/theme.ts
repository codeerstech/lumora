import type { CSSProperties } from 'react'
import type { ThemeTokens } from './types'

export const theme: ThemeTokens = {
  colors: {
    background: '#f5f2eb',
    surface: '#ffffff',
    surfaceSoft: '#ebe5d9',
    text: '#282520',
    muted: '#6f6a61',
    heading: '#14120f',
    line: '#ddd6ca',
    dark: '#111111',
    darkSoft: '#24211d',
    accent: '#d7ff37',
    accentSoft: '#eff8b8',
    sale: '#be3a2f',
  },
  radii: {
    card: '8px',
    control: '8px',
    pill: '999px',
  },
  shadows: {
    card: '0 18px 50px rgba(20, 18, 15, 0.10)',
    drawer: '0 24px 70px rgba(0, 0, 0, 0.24)',
  },
  layout: {
    container: '1240px',
  },
}

export function themeStyle() {
  return {
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-surface-soft': theme.colors.surfaceSoft,
    '--color-text': theme.colors.text,
    '--color-muted': theme.colors.muted,
    '--color-heading': theme.colors.heading,
    '--color-line': theme.colors.line,
    '--color-dark': theme.colors.dark,
    '--color-dark-soft': theme.colors.darkSoft,
    '--color-accent': theme.colors.accent,
    '--color-accent-soft': theme.colors.accentSoft,
    '--color-sale': theme.colors.sale,
    '--radius-card': theme.radii.card,
    '--radius-control': theme.radii.control,
    '--radius-pill': theme.radii.pill,
    '--shadow-card': theme.shadows.card,
    '--shadow-drawer': theme.shadows.drawer,
    '--container': theme.layout.container,
  } as CSSProperties
}
