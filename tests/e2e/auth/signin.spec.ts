import { test, expect } from '@playwright/test';
import {
  mockCsrf,
  mockCredentialsFailure,
  mockCredentialsSuccess,
  mockAuthenticatedSession,
  mockCampaignsPage,
} from '../helpers/auth';

test.describe('Sign-in page', () => {
  test('renders the sign-in form', async ({ page }) => {
    await page.goto('/auth/signin');

    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('has a link to the register page', async ({ page }) => {
    await page.goto('/auth/signin');

    const link = page.getByRole('link', { name: 'Create one' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/auth/register');
  });

  test('has a back-to-home link', async ({ page }) => {
    await page.goto('/auth/signin');

    const link = page.getByRole('link', { name: /back to home/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/');
  });

  test('shows an error message on bad credentials', async ({ page }) => {
    await mockCsrf(page);
    await mockCredentialsFailure(page);

    await page.goto('/auth/signin');
    await page.getByLabel('Email').fill('gm@example.com');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Invalid email or password.')).toBeVisible();
  });

  test('disables button and shows "Signing in…" while waiting', async ({ page }) => {
    await mockCsrf(page);
    // Hang the request so we can observe the loading state before it resolves.
    await page.route('/api/auth/callback/credentials', () => {
      /* intentionally never fulfilled */
    });

    await page.goto('/auth/signin');
    await page.getByLabel('Email').fill('gm@example.com');
    await page.getByLabel('Password').fill('any-password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('button', { name: 'Signing in…' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
  });

  test('navigates to /campaigns on successful sign-in', async ({ page }) => {
    await mockCsrf(page);
    await mockCredentialsSuccess(page);
    await mockCampaignsPage(page);

    await page.goto('/auth/signin');
    await page.getByLabel('Email').fill('gm@example.com');
    await page.getByLabel('Password').fill('correct-password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL('/campaigns');
  });

  test('redirects to /campaigns when already authenticated', async ({ page }) => {
    await mockAuthenticatedSession(page);
    await mockCampaignsPage(page);

    await page.goto('/auth/signin');

    await expect(page).toHaveURL('/campaigns');
  });
});
