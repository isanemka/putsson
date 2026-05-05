import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { notFound } from 'next/navigation'
import OrtPage, { generateStaticParams, generateMetadata } from './page'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))
vi.mock('@/components/Reveal', () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <li className={className}>{children}</li>,
}))
vi.mock('@/components/ContactForm', () => ({
  default: () => <form aria-label="Kontaktformulär" />,
}))

describe('generateStaticParams', () => {
  it('returns 15 area params', () => {
    const params = generateStaticParams()
    expect(params).toHaveLength(15)
    expect(params[0]).toHaveProperty('ort')
  })

  it('includes expected area slugs', () => {
    const slugs = generateStaticParams().map((p) => p.ort)
    expect(slugs).toContain('molndal')
    expect(slugs).toContain('kungsbacka')
    expect(slugs).toContain('stenungsund')
  })
})

describe('generateMetadata', () => {
  it('returns correct title for a valid slug', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ ort: 'molndal' }),
    })
    expect(metadata.title).toBe('Fönsterputs i Mölndal')
  })

  it('returns empty object for an invalid slug', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ ort: 'okand-ort' }),
    })
    expect(metadata).toEqual({})
  })

  it('returns canonical URL with correct slug', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ ort: 'partille' }),
    })
    expect(
      (metadata.alternates as { canonical?: string })?.canonical
    ).toContain('/fonsterputs/partille')
  })
})

describe('OrtPage', () => {
  afterEach(cleanup)

  it('calls notFound for an unknown slug', async () => {
    await expect(
      OrtPage({ params: Promise.resolve({ ort: 'okand' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })

  it('renders the area name in the h1 for a valid slug', async () => {
    const Page = await OrtPage({
      params: Promise.resolve({ ort: 'molndal' }),
    })
    render(Page!)
    expect(
      screen.getByRole('heading', { level: 1, name: /mölndal/i })
    ).toBeInTheDocument()
  })

  it('renders the steps section', async () => {
    const Page = await OrtPage({
      params: Promise.resolve({ ort: 'partille' }),
    })
    render(Page!)
    expect(
      screen.getByRole('heading', { name: /tre steg till rena fönster/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Hör av dig')).toBeInTheDocument()
    expect(screen.getByText('Välj tid')).toBeInTheDocument()
    expect(screen.getByText('Vi putsar')).toBeInTheDocument()
  })

  it('renders contact form', async () => {
    const Page = await OrtPage({
      params: Promise.resolve({ ort: 'kungsbacka' }),
    })
    render(Page!)
    expect(
      screen.getByRole('form', { name: /kontaktformulär/i })
    ).toBeInTheDocument()
  })

  it('renders links to other areas', async () => {
    const Page = await OrtPage({
      params: Promise.resolve({ ort: 'molndal' }),
    })
    render(Page!)
    // All 14 other areas should be linked
    const areaLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href')?.startsWith('/fonsterputs/'))
    expect(areaLinks.length).toBeGreaterThanOrEqual(14)
  })
})
