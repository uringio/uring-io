import type { ReactNode } from 'react';
import * as styles from './DialogStage.css';
import { SpikeFrame } from './SpikeFrame';

// shared page body for the dialog comparison: the triggers, then background prose with a link, which must stay unreachable (by Tab, by the accessibility tree, and by NVDA's browse-mode arrows) while a dialog is open. spike-only.
export function DialogStage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <SpikeFrame title={title}>
      <div className={styles.triggers}>{children}</div>
      <div className={styles.filler}>
        <p>
          这是背景正文。对话框打开时，这一段和下面的链接都不应该被读到或聚焦到。
        </p>
        <a href="#background">背景里的链接</a>
      </div>
    </SpikeFrame>
  );
}
