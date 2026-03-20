import type { Page } from '@playwright/test';

export const CSRF_TOKEN = 'test-csrf-token';

// ---------------------------------------------------------------------------
// Route mock helpers — register before page.goto() so intercepts are active
// when the page makes its own network requests.
// ---------------------------------------------------------------------------

/** Mock GET /api/auth/csrf — required for every signIn() call. */
export async function mockCsrf(page: Page): Promise<void> {
  await page.route('/api/auth/csrf', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ csrfToken: CSRF_TOKEN }),
    })
  );
}

/** Mock POST /api/auth/callback/credentials to simulate bad credentials. */
export async function mockCredentialsFailure(page: Page): Promise<void> {
  await page.route('/api/auth/callback/credentials', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ url: 'http://localhost:3000/api/auth/signin?error=CredentialsSignin' }),
    })
  );
}

/** Mock POST /api/auth/callback/credentials to simulate successful sign-in. */
export async function mockCredentialsSuccess(page: Page): Promise<void> {
  await page.route('/api/auth/callback/credentials', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ url: 'http://localhost:3000/campaigns' }),
    })
  );
}

/**
 * Mock GET /api/auth/session to return an authenticated session.
 * Only needed for the "already authenticated" redirect test — most tests
 * rely on the default unauthenticated {} response from the dev server.
 */
export async function mockAuthenticatedSession(page: Page): Promise<void> {
  await page.route('/api/auth/session', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { name: 'Alice', email: 'gm@example.com' },
        expires: '2099-01-01T00:00:00.000Z',
      }),
    })
  );
}

/**
 * Mock GET /campaigns (and sub-paths) to return a bare 200 HTML response.
 * Required for success-navigation tests — the real middleware would redirect
 * unauthenticated requests back to sign-in.
 */
export async function mockCampaignsPage(page: Page): Promise<void> {
  await page.route('/campaigns**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<html><body><h1>Campaigns</h1></body></html>',
    })
  );
}

/** Mock POST /api/auth/register to simulate a failure response. */
export async function mockRegisterFailure(
  page: Page,
  options: { status?: number; errorMessage?: string } = {}
): Promise<void> {
  const { status = 409, errorMessage = 'Email already in use.' } = options;
  await page.route('/api/auth/register', (route) =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ error: errorMessage }),
    })
  );
}

/** Mock POST /api/auth/register to return 201 Created. */
export async function mockRegisterSuccess(page: Page): Promise<void> {
  await page.route('/api/auth/register', (route) =>
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ id: 'user-1' }),
    })
  );
}
