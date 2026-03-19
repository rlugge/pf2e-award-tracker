import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

export async function authorizeUser(
  credentials: { email?: string; password?: string } | undefined
) {
  if (!credentials?.email || !credentials?.password) return null;

  const user = await prisma.user.findUnique({ where: { email: credentials.email } });
  if (!user) return null;

  const passwordMatch = await compare(credentials.password, user.password);
  if (!passwordMatch) return null;

  return { id: user.id, email: user.email, name: user.name };
}
