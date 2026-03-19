// NOTE: Email-based features (password recovery, registration confirmation) are
// deliberately deferred — email sending is outside the current project scope.
// Accounts are trusted immediately on creation. Revisit when an email service
// is available.
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters.' },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'An account with that email already exists.' }, { status: 409 });
  }

  const hashed = await hash(password, 12);
  await prisma.user.create({ data: { name: name || null, email, password: hashed } });

  return NextResponse.json({}, { status: 201 });
}
