'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div className={styles.signInBtn} style={{ visibility: 'hidden' }}>Sign In</div>;

  if (session) {
    return (
      <div className={styles.userActions}>
        <span className={styles.userName}>{session.user?.name ?? session.user?.email}</span>
        <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.signOutBtn}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link href="/auth/signin" className={styles.signInBtn}>
      Sign In
    </Link>
  );
}
