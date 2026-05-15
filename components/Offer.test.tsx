import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Offer from './Offer'

vi.mock('@/components/Reveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Offer', () => {
  afterEach(cleanup)

  it('renders the section heading', () => {
    render(<Offer />)
    expect(
      screen.getByRole('heading', { name: /fönsterputs för/i })
    ).toBeInTheDocument()
  })

  it('renders the 299 kr price', () => {
    render(<Offer />)
    expect(screen.getAllByText(/299/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders all three eligibility items', () => {
    render(<Offer />)
    expect(screen.getByText('Upp till 30 vanliga fönster')).toBeInTheDocument()
    expect(screen.getByText('Eller 20 fönster med spröjs')).toBeInTheDocument()
    expect(screen.getByText('Endast bottenvåning')).toBeInTheDocument()
  })

  it('renders the CTA link pointing to #kontakt', () => {
    render(<Offer />)
    const cta = screen.getByRole('link', { name: /boka nu/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#kontakt')
  })

  it('renders the terms note', () => {
    render(<Offer />)
    expect(screen.getByText(/gäller en gång per hushåll/i)).toBeInTheDocument()
  })
})
