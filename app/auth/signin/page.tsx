import styles from './page.module.css';

export default function SignInPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <p className={styles.body}>
          User authentication is not yet implemented. Check back once login is available to create
          an account and manage your campaigns.
        </p>
        <a href="/" className={styles.back}>
          &larr; Back to home
        </a>
      </div>
    </main>
  );
}
