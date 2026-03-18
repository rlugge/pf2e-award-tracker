import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.brand}>
            PF2E Reward Tracking
          </Link>
          <div className={styles.divider} aria-hidden="true" />
          <Link href="/campaigns" className={styles.navLink}>
            Campaigns
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </nav>
        <div className={styles.actions}>
          <Link href="/auth/signin" className={styles.signInBtn}>
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
