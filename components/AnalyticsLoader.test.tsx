import { render, screen, act, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import AnalyticsLoader from './AnalyticsLoader'
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY } from '@/lib/consent'

vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}))

function setConsent(value: string | null) {
  if (value === null) {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
  } else {
    localStorage.setItem(CONSENT_STORAGE_KEY, value)
  }
}

describe('AnalyticsLoader', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('does not render Analytics when no consent is stored', () => {
    render(<AnalyticsLoader />)
    expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument()
  })

  it('does not render Analytics when consent is dismissed', () => {
    setConsent('dismissed')
    render(<AnalyticsLoader />)
    expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument()
  })

  it('renders Analytics when consent is accepted', () => {
    setConsent('accepted')
    render(<AnalyticsLoader />)
    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
  })

  it('renders Analytics after consent-change event when user accepts', () => {
    render(<AnalyticsLoader />)
    expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument()

    act(() => {
      setConsent('accepted')
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
    })

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
  })

  it('hides Analytics after consent-change event when user dismisses', () => {
    setConsent('accepted')
    render(<AnalyticsLoader />)
    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()

    act(() => {
      setConsent('dismissed')
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
    })

    expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument()
  })

  it('does not throw when localStorage is unavailable', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage')
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('SecurityError')
      },
      configurable: true,
    })

    expect(() => render(<AnalyticsLoader />)).not.toThrow()

    if (original) Object.defineProperty(window, 'localStorage', original)
  })
})
