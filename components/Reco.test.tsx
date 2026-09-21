import { render, screen, act, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Reco from './Reco'
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY } from '@/lib/consent'

function setConsent(value: string | null) {
  if (value === null) {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
  } else {
    localStorage.setItem(CONSENT_STORAGE_KEY, value)
  }
}

const widget = () => screen.queryByTitle(/omdömen på reco/i)

describe('Reco', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('does not request the iframe when no consent is stored', () => {
    render(<Reco />)
    expect(widget()).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /visa omdömen/i })
    ).toBeInTheDocument()
  })

  it('does not request the iframe when consent is dismissed', () => {
    setConsent('dismissed')
    render(<Reco />)
    expect(widget()).not.toBeInTheDocument()
  })

  it('renders the iframe when consent is accepted', () => {
    setConsent('accepted')
    render(<Reco />)
    const frame = widget()
    expect(frame).toHaveAttribute(
      'src',
      expect.stringContaining('widget.reco.se/v2/venues/6089819/')
    )
    expect(frame).toHaveAttribute('loading', 'lazy')
  })

  it('renders the iframe after consent-change event when user accepts', () => {
    render(<Reco />)
    expect(widget()).not.toBeInTheDocument()

    setConsent('accepted')
    act(() => {
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
    })

    expect(widget()).toBeInTheDocument()
  })

  it('renders the iframe when the visitor opts in to just this embed', () => {
    render(<Reco />)
    fireEvent.click(screen.getByRole('button', { name: /visa omdömen/i }))

    expect(widget()).toBeInTheDocument()
    // Opting in to the embed must not grant site-wide consent
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull()
  })
})
