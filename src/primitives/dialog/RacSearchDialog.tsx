'use client';

import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import * as styles from './dialog.css';
import { SearchField } from './SearchField';

export function RacSearchDialog({
  id,
  triggerLabel,
  focusInput,
}: {
  id: string;
  triggerLabel: string;
  focusInput?: boolean;
}) {
  return (
    <DialogTrigger>
      <Button className={styles.textButton}>{triggerLabel}</Button>
      {/* `isDismissable` opts into closing on a scrim click, which Base UI does by default; the native arm gets the same through `closedby="any"` */}
      <ModalOverlay isDismissable className={styles.racOverlay}>
        <Modal className={styles.racModal}>
          {/* the description is wired by hand: `Dialog`'s `description` slot only receives an id (and so only sets aria-describedby) for `role="alertdialog"`; for a plain dialog the slot renders unconnected */}
          <Dialog className={styles.surface} aria-describedby={`${id}-desc`}>
            <div className={styles.header}>
              <Heading slot="title" className={styles.headline}>
                搜索文章
              </Heading>
              <Button
                slot="close"
                className={styles.iconButton}
                aria-label="关闭"
              >
                ×
              </Button>
            </div>
            <p id={`${id}-desc`} className={styles.supporting}>
              输入关键词，按回车搜索。
            </p>
            <SearchField id={`${id}-query`} autoFocus={focusInput} />
            <div className={styles.actions}>
              <Button slot="close" className={styles.textButton}>
                取消
              </Button>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
