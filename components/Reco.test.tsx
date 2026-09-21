import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Reco from './Reco'
import { CONSENT_STORAGE_KEY } from '@/lib/consent'

const widget = () => screen.queryByTitle(/omdömen på reco/i)
const showButton = () => screen.getByRole('button', { name: /visa omdömen/i })

describe('Reco', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('does not request the iframe on first render', () => {
    render(<Reco />)
    expect(widget()).not.toBeInTheDocument()
    expect(showButton()).toBeInTheDocument()
  })

  // The consent banner only covers the site's own necessary cookies and
  // cookieless analytics, so it cannot authorize this third-party embed.
  it('stays unloaded even when site-wide cookies are accepted', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted')
    render(<Reco />)
    expect(widget()).not.toBeInTheDocument()
    expect(showButton()).toBeInTheDocument()
  })

  it('stays unloaded when consent is dismissed', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'dismissed')
    render(<Reco />)
    expect(widget()).not.toBeInTheDocument()
  })

  it('renders the iframe once the visitor opts in', () => {
    render(<Reco />)
    fireEvent.click(showButton())

    const frame = widget()
    expect(frame).toHaveAttribute(
      'src',
      expect.stringContaining('widget.reco.se/v2/venues/6089819/')
    )
    expect(frame).toHaveAttribute('loading', 'lazy')
  })

  it('does not write site-wide consent when opting in to the embed', () => {
    render(<Reco />)
    fireEvent.click(showButton())

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull()
  })
})
