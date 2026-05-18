export const CONSENT_STORAGE_KEY = 'cookie_consent'
export const CONSENT_CHANGE_EVENT = 'consent-change'

/** Safely read consent value from localStorage without throwing on restricted storage. */
export function getConsentValue(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY)
  } catch {
    return null
  }
}
