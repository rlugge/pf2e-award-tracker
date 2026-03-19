import { authorizeUser } from '@/lib/auth/authorize';
import { prisma } from '@/lib/db/prisma';
import { compare } from 'bcryptjs';

jest.mock('@/lib/db/prisma', () => ({
  prisma: { user: { findUnique: jest.fn() } },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

const mockFindUnique = prisma.user.findUnique as jest.Mock;
const mockCompare = compare as jest.Mock;

const validUser = { id: '1', email: 'gm@example.com', name: 'Alice', password: 'hashed' };

describe('authorizeUser', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('missing credentials', () => {
    it('returns null when credentials are undefined', async () => {
      expect(await authorizeUser(undefined)).toBeNull();
    });

    it('returns null when email is empty', async () => {
      expect(await authorizeUser({ email: '', password: 'password123' })).toBeNull();
    });

    it('returns null when password is empty', async () => {
      expect(await authorizeUser({ email: 'gm@example.com', password: '' })).toBeNull();
    });
  });

  describe('unknown email', () => {
    it('returns null when user is not found', async () => {
      mockFindUnique.mockResolvedValue(null);
      expect(await authorizeUser({ email: 'nobody@example.com', password: 'password123' })).toBeNull();
    });

    it('does not call compare when user is not found', async () => {
      mockFindUnique.mockResolvedValue(null);
      await authorizeUser({ email: 'nobody@example.com', password: 'password123' });
      expect(mockCompare).not.toHaveBeenCalled();
    });
  });

  describe('wrong password', () => {
    it('returns null when password does not match', async () => {
      mockFindUnique.mockResolvedValue(validUser);
      mockCompare.mockResolvedValue(false);
      expect(await authorizeUser({ email: 'gm@example.com', password: 'wrong' })).toBeNull();
    });
  });

  describe('valid credentials', () => {
    it('returns the user object on success', async () => {
      mockFindUnique.mockResolvedValue(validUser);
      mockCompare.mockResolvedValue(true);
      const result = await authorizeUser({ email: 'gm@example.com', password: 'correct' });
      expect(result).toEqual({ id: '1', email: 'gm@example.com', name: 'Alice' });
    });

    it('does not include the password hash in the returned user', async () => {
      mockFindUnique.mockResolvedValue(validUser);
      mockCompare.mockResolvedValue(true);
      const result = await authorizeUser({ email: 'gm@example.com', password: 'correct' });
      expect(result).not.toHaveProperty('password');
    });

    it('compares against the stored hash', async () => {
      mockFindUnique.mockResolvedValue(validUser);
      mockCompare.mockResolvedValue(true);
      await authorizeUser({ email: 'gm@example.com', password: 'correct' });
      expect(mockCompare).toHaveBeenCalledWith('correct', 'hashed');
    });
  });
});
