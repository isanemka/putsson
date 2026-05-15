import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'

vi.mock('@/app/actions/contact', () => ({
  sendContactEmail: vi.fn().mockResolvedValue({ success: true }),
}))

afterEach(cleanup)

describe('ContactForm', () => {
  it('renders all fields and the submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/namn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/adress/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/meddelande/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /skicka förfrågan/i })
    ).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /skicka förfrågan/i }))

    expect(await screen.findByText('Ange ditt namn.')).toBeInTheDocument()
    expect(screen.getByText('Ange din e-postadress.')).toBeInTheDocument()
    expect(
      screen.getByText('Berätta lite om dina fönster.')
    ).toBeInTheDocument()
  })

  it('shows invalid email error when email format is wrong', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/namn/i), 'Anna')
    await user.type(screen.getByLabelText(/e-post/i), 'inte-en-epost')
    await user.type(screen.getByLabelText(/meddelande/i), 'Test')
    await user.click(screen.getByRole('button', { name: /skicka förfrågan/i }))

    expect(
      await screen.findByText('Ange en giltig e-postadress.')
    ).toBeInTheDocument()
  })

  it('clears a field error when the user starts correcting it', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /skicka förfrågan/i }))
    expect(await screen.findByText('Ange ditt namn.')).toBeInTheDocument()

    await user.type(screen.getByLabelText(/namn/i), 'A')
    expect(screen.queryByText('Ange ditt namn.')).not.toBeInTheDocument()
  })

  it('shows success message after valid submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/namn/i), 'Anna Andersson')
    await user.type(screen.getByLabelText(/e-post/i), 'anna@exempel.se')
    await user.type(screen.getByLabelText(/meddelande/i), 'Jag har 12 fönster.')
    await user.click(screen.getByRole('button', { name: /skicka förfrågan/i }))

    await waitFor(() =>
      expect(screen.getByText('Tack för ditt meddelande!')).toBeInTheDocument()
    )
  })

  it('disables the submit button while submitting', async () => {
    const { sendContactEmail } = await import('@/app/actions/contact')
    // Use a deferred promise so the component stays in "submitting" state
    let resolveSubmit!: (v: { success: true }) => void
    vi.mocked(sendContactEmail).mockImplementationOnce(
      () =>
        new Promise((res) => {
          resolveSubmit = res
        })
    )

    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/namn/i), 'Anna Andersson')
    await user.type(screen.getByLabelText(/e-post/i), 'anna@exempel.se')
    await user.type(screen.getByLabelText(/meddelande/i), 'Jag har 12 fönster.')

    // Don't await click — we want to inspect the in-flight state
    const clickPromise = user.click(
      screen.getByRole('button', { name: /skicka förfrågan/i })
    )

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /skickar/i })).toBeDisabled()
    )

    // Resolve and await the click promise so React settles before test ends
    resolveSubmit({ success: true })
    await clickPromise
  })

  it('shows an error banner when submission fails', async () => {
    const { sendContactEmail } = await import('@/app/actions/contact')
    vi.mocked(sendContactEmail).mockResolvedValueOnce({
      success: false,
      error: 'Kunde inte skicka meddelandet.',
    })

    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/namn/i), 'Anna Andersson')
    await user.type(screen.getByLabelText(/e-post/i), 'anna@exempel.se')
    await user.type(screen.getByLabelText(/meddelande/i), 'Jag har 12 fönster.')
    await user.click(screen.getByRole('button', { name: /skicka förfrågan/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.getByRole('alert')).toHaveTextContent(/något gick fel/i)
  })

  it('shows an error banner when the action throws', async () => {
    const { sendContactEmail } = await import('@/app/actions/contact')
    vi.mocked(sendContactEmail).mockRejectedValueOnce(
      new Error('Network error')
    )

    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/namn/i), 'Anna Andersson')
    await user.type(screen.getByLabelText(/e-post/i), 'anna@exempel.se')
    await user.type(screen.getByLabelText(/meddelande/i), 'Jag har 12 fönster.')
    await user.click(screen.getByRole('button', { name: /skicka förfrågan/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })

  it('required fields have the required attribute', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/namn/i)).toBeRequired()
    expect(screen.getByLabelText(/e-post/i)).toBeRequired()
    expect(screen.getByLabelText(/meddelande/i)).toBeRequired()
  })

  it('optional fields do not have the required attribute', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/telefon/i)).not.toBeRequired()
    expect(screen.getByLabelText(/adress/i)).not.toBeRequired()
  })
})
