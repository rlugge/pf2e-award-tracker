import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>PF2E Reward Tracking</h1>
        <p className={styles.tagline}>
          Keep your party&rsquo;s treasure on track with the Pathfinder 2E wealth-by-level
          benchmarks.
        </p>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Session Logging</h2>
          <p>
            Record rewards earned each session &mdash; coins, permanent items, and consumables
            &mdash; against each campaign as you play.
          </p>
        </div>

        <div className={styles.feature}>
          <h2>Wealth Benchmarks</h2>
          <p>
            Automatically compare cumulative rewards against Table&nbsp;10-9 from the PF2e Core
            Rulebook, scaled to your exact party size.
          </p>
        </div>

        <div className={styles.feature}>
          <h2>Campaign Management</h2>
          <p>
            Manage multiple campaigns, track level progression, and adjust party size as your table
            changes over time.
          </p>
        </div>
      </section>

      <p className={styles.cta}>
        Sign in to get started, or{' '}
        <a href="/about" className={styles.ctaLink}>
          learn more
        </a>{' '}
        about how it works.
      </p>
    </main>
  );
}
