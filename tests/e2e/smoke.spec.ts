import { expect, test } from '@playwright/test'

test('home page loads and shows hero content', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', {
      level: 1,
    })
  ).toBeVisible()
})

test('header navigation is visible', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('navigation', { name: 'Huvudnavigering' })
  ).toBeVisible()
})

test('footer links are visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: 'Sidfot' })).toBeVisible()
})

test('privacy policy page loads', async ({ page }) => {
  await page.goto('/integritetspolicy')
  await expect(
    page.getByRole('heading', { name: 'Integritetspolicy' })
  ).toBeVisible()
})

test('cookie policy page loads', async ({ page }) => {
  await page.goto('/cookies')
  await expect(
    page.getByRole('heading', { name: 'Cookiepolicy' })
  ).toBeVisible()
})

test('404 page shows for unknown routes', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(
    page.getByRole('heading', { name: 'Sidan hittades inte' })
  ).toBeVisible()
})
