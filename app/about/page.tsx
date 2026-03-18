import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>About This Project</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Tool</h2>
        <p>
          Pre-written adventure paths take care of treasure for you &mdash; the loot tables are
          baked in, and the math has already been done. Homebrew campaigns don&rsquo;t have that
          luxury. Every item, coin pouch, and magic trinket is a judgment call, and without a
          running total it&rsquo;s easy to drift too rich or too poor without noticing until it
          starts affecting the game.
        </p>
        <p>
          PF2E Reward Tracking gives homebrew GMs the same assurance. The PF2e Core
          Rulebook&rsquo;s Table&nbsp;10-9 defines expected treasure per level per player, broken
          down into coins, permanent items, and consumables. This app turns that table into a live
          dashboard: record what the party earns each session, and the tracker compares cumulative
          totals against the benchmark scaled to your party&rsquo;s actual size &mdash; so you
          always have a clear answer to <em>&ldquo;is the party too rich right now?&rdquo;</em>
        </p>

        <h3 className={styles.subheading}>Key features (planned)</h3>
        <ul className={styles.list}>
          <li>Per-session reward logging: coins, permanent items, and consumables with item levels</li>
          <li>Automatic comparison against Table&nbsp;10-9, scaled to party size</li>
          <li>Support for variable party sizes &mdash; members joining or leaving mid-campaign</li>
          <li>Level-up tracking so benchmarks always reflect current progression</li>
          <li>Multiple simultaneous campaigns for GMs running more than one table</li>
          <li>Immutable event log so the balance is always fully recomputable from history</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Meta Goals</h2>
        <p>
          Beyond being a useful tool, this project serves two broader purposes.
        </p>
        <p>
          First, it&rsquo;s a <strong>portfolio piece demonstrating AI-driven development</strong>.
          The entire codebase is being built in active collaboration with Claude, using it not just
          for boilerplate but for architecture decisions, test design, and iterative refinement.
          The goal is to show what thoughtful human&ndash;AI pair programming looks like in
          practice &mdash; where the human sets direction, makes judgment calls, and stays in the
          loop, while the AI accelerates execution and surfaces trade-offs.
        </p>
        <p>
          Second, it&rsquo;s a deliberate <strong>learning exercise in a partially new stack</strong>.
          React and TypeScript are familiar ground, and this project is an opportunity to sharpen
          both back to fluency. Next.js App Router and Prisma
          are genuinely new territory: building something real with them, including authentication,
          a relational data model, test coverage, and deployment, is a much more effective path
          than tutorials alone. The AI-assisted workflow also becomes part of what&rsquo;s being
          learned: understanding when to trust generated code, when to push back, and how to stay
          in control of a codebase you didn&rsquo;t write every line of yourself.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tech Stack</h2>
        <ul className={styles.stack}>
          <li><span className={styles.tech}>Next.js 14</span> App Router &mdash; full-stack React framework</li>
          <li><span className={styles.tech}>TypeScript</span> strict mode &mdash; end-to-end type safety</li>
          <li><span className={styles.tech}>PostgreSQL</span> via Prisma ORM &mdash; relational data with migrations</li>
          <li><span className={styles.tech}>NextAuth.js</span> &mdash; session-based authentication</li>
          <li><span className={styles.tech}>Jest + Playwright</span> &mdash; unit and end-to-end test coverage</li>
          <li><span className={styles.tech}>Docker Compose</span> &mdash; reproducible local development environment</li>
        </ul>
      </section>
    </main>
  );
}
