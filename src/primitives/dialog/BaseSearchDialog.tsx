'use client';

import { Dialog } from '@base-ui/react/dialog';
import { useRef } from 'react';
import * as styles from './dialog.css';
import { SearchField } from './SearchField';

export function BaseSearchDialog({
  id,
  triggerLabel,
  focusInput,
}: {
  id: string;
  triggerLabel: string;
  focusInput?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.textButton}>
        {triggerLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.baseBackdrop} />
        <Dialog.Popup
          className={`${styles.surface} ${styles.basePopup}`}
          // without it Base UI focuses the first tabbable element, here the close icon
          initialFocus={focusInput ? inputRef : undefined}
        >
          <div className={styles.header}>
            <Dialog.Title className={styles.headline}>搜索文章</Dialog.Title>
            <Dialog.Close className={styles.iconButton} aria-label="关闭">
              ×
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles.supporting}>
            输入关键词，按回车搜索。
          </Dialog.Description>
          <SearchField id={`${id}-query`} inputRef={inputRef} />
          <div className={styles.actions}>
            <Dialog.Close className={styles.textButton}>取消</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
