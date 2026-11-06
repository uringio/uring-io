import type { ReactNode } from 'react';
import * as styles from './SpikeFrame.css';

// shared shell for the primitive comparison pages, which render the same rows through different behavior libraries. spike-only: removed with the comparison.
export function SpikeFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className={styles.main}>
      <h1>{title}</h1>
      <div className={styles.stack}>{children}</div>
    </main>
  );
}
