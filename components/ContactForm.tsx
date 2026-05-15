'use client'

import { useState } from 'react'
import { sendContactEmail } from '@/app/actions/contact'

type Field = 'name' | 'email' | 'phone' | 'address' | 'message' | 'privacy'

type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error' }

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  })
  const [privacy, setPrivacy] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [state, setState] = useState<FormState>({ status: 'idle' })

  function validate() {
    const e: Partial<Record<Field, string>> = {}
    if (!form.name.trim()) e.name = 'Ange ditt namn.'
    if (!form.email.trim()) {
      e.email = 'Ange din e-postadress.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Ange en giltig e-postadress.'
    }
    if (!form.message.trim()) e.message = 'Berätta lite om dina fönster.'
    if (!privacy)
      e.privacy = 'Du måste godkänna integritetspolicyn för att skicka.'
    return e
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as Field]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setState({ status: 'submitting' })
    try {
      const result = await sendContactEmail(form)
      if (result.success) {
        setState({ status: 'success' })
      } else {
        setState({ status: 'error' })
      }
    } catch {
      setState({ status: 'error' })
    }
  }

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-3xl border border-navy/10 bg-cream px-8 py-10">
        <span className="text-3xl" aria-hidden>
          ✓
        </span>
        <h3 className="text-xl font-bold text-navy">
          Tack för ditt meddelande!
        </h3>
        <p className="text-sm text-navy/90">
          Vi återkommer inom 24 timmar med ett fast pris.
        </p>
      </div>
    )
  }

  const isSubmitting = state.status === 'submitting'
  const hasError = state.status === 'error'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Kontaktformulär"
      className="grid gap-4"
    >
      {hasError && (
        <p
          role="alert"
          className="rounded-2xl bg-coral/15 px-5 py-3 text-sm font-medium text-coral"
        >
          Något gick fel. Försök igen eller ring oss direkt.
        </p>
      )}
      {/* Name */}
      <div>
        <label
          htmlFor="cf-name"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-navy/70"
        >
          Namn{' '}
          <span aria-hidden className="text-coral">
            *
          </span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
          placeholder="Anna Andersson"
          className="w-full rounded-2xl border border-navy/15 bg-white px-5 py-3.5 text-sm text-navy placeholder:text-navy/35 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30 aria-invalid:border-coral"
        />
        {errors.name && (
          <p
            id="cf-name-error"
            role="alert"
            className="mt-1.5 text-xs text-coral"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cf-email"
            className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-navy/70"
          >
            E-post{' '}
            <span aria-hidden className="text-coral">
              *
            </span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            placeholder="anna@exempel.se"
            className="w-full rounded-2xl border border-navy/15 bg-white px-5 py-3.5 text-sm text-navy placeholder:text-navy/35 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30 aria-invalid:border-coral"
          />
          {errors.email && (
            <p
              id="cf-email-error"
              role="alert"
              className="mt-1.5 text-xs text-coral"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cf-phone"
            className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-navy/70"
          >
            Telefon
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="070-000 00 00"
            className="w-full rounded-2xl border border-navy/15 bg-white px-5 py-3.5 text-sm text-navy placeholder:text-navy/35 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="cf-address"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-navy/70"
        >
          Adress
        </label>
        <input
          id="cf-address"
          name="address"
          type="text"
          autoComplete="street-address"
          value={form.address}
          onChange={handleChange}
          placeholder="Storgatan 1, 411 01 Göteborg"
          className="w-full rounded-2xl border border-navy/15 bg-white px-5 py-3.5 text-sm text-navy placeholder:text-navy/35 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="cf-message"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-navy/70"
        >
          Meddelande{' '}
          <span aria-hidden className="text-coral">
            *
          </span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          placeholder="Berätta om dina fönster - antal, typ och hur ofta du vill ha besök."
          className="w-full resize-none rounded-2xl border border-navy/15 bg-white px-5 py-3.5 text-sm text-navy placeholder:text-navy/35 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30 aria-invalid:border-coral"
        />
        {errors.message && (
          <p
            id="cf-message-error"
            role="alert"
            className="mt-1.5 text-xs text-coral"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Privacy policy */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="cf-privacy"
            name="privacy"
            type="checkbox"
            checked={privacy}
            onChange={(e) => {
              setPrivacy(e.target.checked)
              if (errors.privacy)
                setErrors((prev) => ({ ...prev, privacy: undefined }))
            }}
            required
            aria-invalid={!!errors.privacy}
            aria-describedby={errors.privacy ? 'cf-privacy-error' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy"
          />
          <label
            htmlFor="cf-privacy"
            className="cursor-pointer text-sm text-navy/90"
          >
            Jag har läst och godkänner{' '}
            <a
              href="/integritetspolicy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition hover:text-navy"
            >
              integritetspolicyn
            </a>
            .{' '}
            <span aria-hidden className="text-coral">
              *
            </span>
          </label>
        </div>
        {errors.privacy && (
          <p
            id="cf-privacy-error"
            role="alert"
            className="mt-1.5 text-xs text-coral"
          >
            {errors.privacy}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream shadow-[0_18px_40px_-20px_rgba(24,23,76,0.5)] transition hover:-translate-y-0.5 hover:bg-blue disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? 'Skickar…' : 'Skicka förfrågan'}
        {!isSubmitting && (
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </button>
    </form>
  )
}
