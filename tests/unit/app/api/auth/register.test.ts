import { POST } from '@/app/api/auth/register/route';
import { prisma } from '@/lib/db/prisma';
import { hash } from 'bcryptjs';

jest.mock('@/lib/db/prisma', () => ({
  prisma: { user: { findUnique: jest.fn(), create: jest.fn() } },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

const mockFindUnique = prisma.user.findUnique as jest.Mock;
const mockCreate = prisma.user.create as jest.Mock;

function makeRequest(body: object) {
  return new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/auth/register', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('validation', () => {
    it('returns 400 when email is missing', async () => {
      const res = await POST(makeRequest({ password: 'password123' }));
      expect(res.status).toBe(400);
    });

    it('returns 400 when password is missing', async () => {
      const res = await POST(makeRequest({ email: 'gm@example.com' }));
      expect(res.status).toBe(400);
    });

    it('returns 400 when password is shorter than 8 characters', async () => {
      const res = await POST(makeRequest({ email: 'gm@example.com', password: 'short' }));
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toMatch(/8 characters/);
    });
  });

  describe('duplicate email', () => {
    it('returns 409 when email is already registered', async () => {
      mockFindUnique.mockResolvedValue({ id: '1', email: 'gm@example.com' });
      const res = await POST(makeRequest({ email: 'gm@example.com', password: 'password123' }));
      expect(res.status).toBe(409);
    });
  });

  describe('successful registration', () => {
    beforeEach(() => {
      mockFindUnique.mockResolvedValue(null);
      mockCreate.mockResolvedValue({});
    });

    it('returns 201 on success', async () => {
      const res = await POST(makeRequest({ email: 'gm@example.com', password: 'password123' }));
      expect(res.status).toBe(201);
    });

    it('hashes the password with cost 12 before storing', async () => {
      await POST(makeRequest({ email: 'gm@example.com', password: 'password123' }));
      expect(hash).toHaveBeenCalledWith('password123', 12);
    });

    it('stores the hashed password, not the plaintext', async () => {
      await POST(makeRequest({ email: 'gm@example.com', password: 'password123' }));
      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({ password: 'hashed_password' }),
      });
    });

    it('stores name when provided', async () => {
      await POST(makeRequest({ email: 'gm@example.com', password: 'password123', name: 'Alice' }));
      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({ name: 'Alice' }),
      });
    });

    it('stores name as null when not provided', async () => {
      await POST(makeRequest({ email: 'gm@example.com', password: 'password123' }));
      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({ name: null }),
      });
    });
  });
});
