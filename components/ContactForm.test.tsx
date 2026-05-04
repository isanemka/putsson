import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import ContactForm from './ContactForm'

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
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/namn/i), 'Anna Andersson')
    await user.type(screen.getByLabelText(/e-post/i), 'anna@exempel.se')
    await user.type(screen.getByLabelText(/meddelande/i), 'Jag har 12 fönster.')

    const button = screen.getByRole('button', { name: /skicka förfrågan/i })
    await user.click(button)

    expect(screen.getByRole('button', { name: /skickar/i })).toBeDisabled()
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
