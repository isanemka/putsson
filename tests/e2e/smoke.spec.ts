import { expect, test } from '@playwright/test'

test('home page loads and shows hero content', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', {
      name: 'TODO: Huvudrubrik som beskriver ert erbjudande',
    })
  ).toBeVisible()
})

test('privacy policy page loads', async ({ page }) => {
  await page.goto('/integritetspolicy')
  await expect(
    page.getByRole('heading', { name: 'Integritetspolicy' })
  ).toBeVisible()
})
