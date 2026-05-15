'use server'

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

type ContactPayload = {
  name: string
  email: string
  phone: string
  address: string
  message: string
}

type ContactResult = { success: true } | { success: false; error: string }

function buildClient() {
  return new SESClient({
    region: process.env.AWS_SES_REGION ?? 'eu-north-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })
}

function sanitize(value: string) {
  return value.replace(/[\r\n]/g, ' ').trim()
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<ContactResult> {
  const { name, email, phone, address, message } = payload

  // Server-side validation (defence-in-depth; client also validates)
  if (!name.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: 'Obligatoriska fält saknas.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Ogiltig e-postadress.' }
  }

  const fromEmail = process.env.FROM_EMAIL
  const toEmail = process.env.CONTACT_EMAIL

  if (!fromEmail || !toEmail) {
    console.error('Missing FROM_EMAIL or CONTACT_EMAIL environment variables')
    return { success: false, error: 'Serverkonfigurationsfel.' }
  }

  const safeName = sanitize(name)
  const safeEmail = sanitize(email)
  const safePhone = sanitize(phone)
  const safeAddress = sanitize(address)

  const bodyText = [
    `Nytt meddelande från kontaktformuläret på putsson.se`,
    '',
    `Namn:     ${safeName}`,
    `E-post:   ${safeEmail}`,
    `Telefon:  ${safePhone || '–'}`,
    `Adress:   ${safeAddress || '–'}`,
    '',
    'Meddelande:',
    message.trim(),
  ].join('\n')

  const bodyHtml = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#18174c">
  <h2 style="margin-top:0">Ny förfrågan via putsson.se</h2>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Namn</td><td style="padding:6px 0">${safeName}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">E-post</td><td style="padding:6px 0"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Telefon</td><td style="padding:6px 0">${safePhone || '–'}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Adress</td><td style="padding:6px 0">${safeAddress || '–'}</td></tr>
  </table>
  <h3 style="margin-bottom:8px">Meddelande</h3>
  <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${message.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
</body>
</html>`

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: [toEmail] },
    ReplyToAddresses: [`${safeName} <${safeEmail}>`],
    Message: {
      Subject: {
        Data: `Ny förfrågan från ${safeName}`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: { Data: bodyText, Charset: 'UTF-8' },
        Html: { Data: bodyHtml, Charset: 'UTF-8' },
      },
    },
  })

  try {
    const client = buildClient()
    await client.send(command)
    return { success: true }
  } catch (err) {
    console.error('SES send error:', err)
    return { success: false, error: 'Kunde inte skicka meddelandet.' }
  }
}
