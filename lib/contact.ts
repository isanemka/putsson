// Shared by the contact form and its server action so both enforce the same
// rules. The server action is a public endpoint, so it must not rely on the
// client having validated anything.

export const contactFieldMaxLength = {
  name: 100,
  email: 254,
  phone: 30,
  address: 200,
  message: 5000,
} as const

export type ContactField = keyof typeof contactFieldMaxLength

// Rejects characters that are special in address headers (<, >, comma, quotes,
// etc.) so a submitted address can never expand into extra recipients.
export const contactEmailPattern =
  /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/
