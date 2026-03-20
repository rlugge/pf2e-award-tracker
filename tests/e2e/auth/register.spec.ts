import { test, expect } from '@playwright/test';
import {
  mockCsrf,
  mockCredentialsSuccess,
  mockCampaignsPage,
  mockRegisterFailure,
  mockRegisterSuccess,
} from '../helpers/auth';

test.describe('Register page', () => {
  test('renders the registration form', async ({ page }) => {
    await page.goto('/auth/register');

    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('has a link to the sign-in page', async ({ page }) => {
    await page.goto('/auth/register');

    const link = page.getByRole('link', { name: 'Sign in' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/auth/signin');
  });

  test('shows the error message from the API on failure', async ({ page }) => {
    await mockRegisterFailure(page, {
      status: 409,
      errorMessage: 'Email already in use.',
    });

    await page.goto('/auth/register');
    await page.getByLabel('Email').fill('taken@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page.getByText('Email already in use.')).toBeVisible();
  });

  test('shows fallback error message when API response has no error field', async ({ page }) => {
    await page.route('/api/auth/register', (route) =>
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({}),
      })
    );

    await page.goto('/auth/register');
    await page.getByLabel('Email').fill('bad@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page.getByText('Registration failed. Please try again.')).toBeVisible();
  });

  test('disables button and shows "Creating account…" while waiting', async ({ page }) => {
    // Hang the request so we can observe the loading state before it resolves.
    await page.route('/api/auth/register', () => {
      /* intentionally never fulfilled */
    });

    await page.goto('/auth/register');
    await page.getByLabel('Email').fill('new@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page.getByRole('button', { name: 'Creating account…' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Creating account…' })).toBeDisabled();
  });

  test('navigates to /campaigns after successful registration', async ({ page }) => {
    await mockRegisterSuccess(page);
    await mockCsrf(page);
    await mockCredentialsSuccess(page);
    await mockCampaignsPage(page);

    await page.goto('/auth/register');
    await page.getByLabel('Email').fill('new@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page).toHaveURL('/campaigns');
  });
});
