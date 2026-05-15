import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Home from './page'

// Mock client components that use browser APIs/animations to avoid test noise
vi.mock('@/components/Hero', () => ({
  default: () => (
    <section>
      <h1>Rena fönster utan krångel</h1>
      <a href="#kontakt">Få fast pris</a>
      <a href="#tjanster">Våra tjänster</a>
    </section>
  ),
}))
vi.mock('@/components/Stats', () => ({
  default: () => (
    <section aria-label="Putsson i siffror">
      <span>Putsade fönster</span>
      <span>Glada kunder</span>
      <span>Svarstid</span>
    </section>
  ),
}))
vi.mock('@/components/Faq', () => ({
  default: () => <section aria-label="Vanliga frågor" />,
}))
vi.mock('@/components/Reveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Home page', () => {
  afterEach(cleanup)
  it('renders the main headline', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the tjänster section heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /allt som har/i })
    ).toBeInTheDocument()
  })

  it('renders all four service cards', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'Villa & radhus' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Lägenhet' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Balkonginglasning' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Butiker' })).toBeInTheDocument()
  })

  it('renders the service areas grid with area links', () => {
    render(<Home />)
    // Mölndal should have its own link
    const molndalLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href') === '/fonsterputs/molndal')
    expect(molndalLinks).toHaveLength(1)
    expect(screen.getByRole('link', { name: /partille/i })).toBeInTheDocument()
    // Should have 15 area links
    const areaLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href')?.startsWith('/fonsterputs/'))
    expect(areaLinks).toHaveLength(15)
  })

  it('renders the om oss section heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /vi gillar fönster/i })
    ).toBeInTheDocument()
  })

  it('renders the kontakt section heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /få ett fast pris idag/i })
    ).toBeInTheDocument()
  })

  it('renders phone and email contact links', () => {
    render(<Home />)
    const phoneLink = screen.getByRole('link', { name: /ring oss/i })
    const emailLink = screen.getByRole('link', { name: /mejla oss/i })
    expect(phoneLink).toBeInTheDocument()
    expect(emailLink).toBeInTheDocument()
  })

  it('renders CTA links in hero', () => {
    render(<Home />)
    expect(
      screen.getByRole('link', { name: /få fast pris/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /våra tjänster/i })
    ).toBeInTheDocument()
  })
})
