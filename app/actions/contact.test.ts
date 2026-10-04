import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const send = vi.fn()

vi.mock('@aws-sdk/client-ses', () => ({
  SESClient: vi.fn(function () {
    return { send }
  }),
  SendEmailCommand: vi.fn(function (input: unknown) {
    return { input }
  }),
}))

const { sendContactEmail } = await import('./contact')

const validPayload = {
  name: 'Åsa Öberg',
  email: 'asa@exempel.se',
  phone: '070-000 00 00',
  address: 'Storgatan 1',
  message: 'Hej! Jag vill ha fönsterputs.',
}

function sentInput() {
  return send.mock.calls[0][0].input
}

describe('sendContactEmail', () => {
  beforeEach(() => {
    vi.stubEnv('FROM_EMAIL', 'no-reply@putsson.se')
    vi.stubEnv('CONTACT_EMAIL', 'info@putsson.se')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    send.mockReset()
    send.mockResolvedValue({})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('sends the email for a valid submission', async () => {
    const result = await sendContactEmail(validPayload)

    expect(result).toEqual({ success: true })
    expect(send).toHaveBeenCalledTimes(1)
    expect(sentInput().Destination.ToAddresses).toEqual(['info@putsson.se'])
  })

  it('uses the bare address as Reply-To so the name cannot alter it', async () => {
    await sendContactEmail({
      ...validPayload,
      name: 'Evil <attacker@evil.example>, x',
    })

    expect(sentInput().ReplyToAddresses).toEqual(['asa@exempel.se'])
  })

  it('escapes HTML in the email body', async () => {
    await sendContactEmail({
      ...validPayload,
      message: '<script>alert(1)</script>',
    })

    const html = sentInput().Message.Body.Html.Data as string
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('strips line breaks from the subject', async () => {
    await sendContactEmail({ ...validPayload, name: 'Anna\r\nBcc: x@y.se' })

    expect(sentInput().Message.Subject.Data).not.toMatch(/[\r\n]/)
  })

  it('rejects missing required fields', async () => {
    const result = await sendContactEmail({ ...validPayload, message: '  ' })

    expect(result.success).toBe(false)
    expect(send).not.toHaveBeenCalled()
  })

  it.each([
    'not-an-email',
    'a@b',
    'victim@x.se,attacker@evil.example',
    'a<b>@x.se',
  ])('rejects the invalid address %s', async (email) => {
    const result = await sendContactEmail({ ...validPayload, email })

    expect(result.success).toBe(false)
    expect(send).not.toHaveBeenCalled()
  })

  it('rejects non-string fields', async () => {
    const result = await sendContactEmail({
      ...validPayload,
      message: { toString: () => 'x' },
    } as unknown as typeof validPayload)

    expect(result.success).toBe(false)
    expect(send).not.toHaveBeenCalled()
  })

  it('rejects a payload that is not an object', async () => {
    const result = await sendContactEmail(
      null as unknown as typeof validPayload
    )

    expect(result.success).toBe(false)
  })

  it('rejects oversized fields', async () => {
    const result = await sendContactEmail({
      ...validPayload,
      message: 'a'.repeat(5001),
    })

    expect(result.success).toBe(false)
    expect(send).not.toHaveBeenCalled()
  })

  it('fails cleanly when the email environment is not configured', async () => {
    vi.stubEnv('CONTACT_EMAIL', '')

    const result = await sendContactEmail(validPayload)

    expect(result.success).toBe(false)
    expect(send).not.toHaveBeenCalled()
  })

  it('reports an error when SES fails', async () => {
    send.mockRejectedValueOnce(new Error('SES down'))

    const result = await sendContactEmail(validPayload)

    expect(result).toEqual({
      success: false,
      error: 'Kunde inte skicka meddelandet.',
    })
  })
})
