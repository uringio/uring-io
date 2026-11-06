import * as styles from './dialog.css';
import { SearchField } from './SearchField';

// zero-dependency control: a `<dialog>` opened and closed by invoker commands (`commandfor` + `command`), so the browser alone supplies modality, focus containment, Esc, light dismiss (`closedby="any"`) and focus return. a server component: nothing here hydrates.
export function NativeSearchDialog({
  id,
  triggerLabel,
  focusInput,
}: {
  id: string;
  triggerLabel: string;
  focusInput?: boolean;
}) {
  return (
    <>
      <button
        type="button"
        commandfor={id}
        command="show-modal"
        className={styles.textButton}
      >
        {triggerLabel}
      </button>
      <dialog
        id={id}
        closedby="any"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        className={`${styles.surface} ${styles.nativeDialog}`}
      >
        <div className={styles.header}>
          <h2 id={`${id}-title`} className={styles.headline}>
            搜索文章
          </h2>
          <button
            type="button"
            commandfor={id}
            command="close"
            className={styles.iconButton}
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        <p id={`${id}-desc`} className={styles.supporting}>
          输入关键词，按回车搜索。
        </p>
        <SearchField id={`${id}-query`} autoFocus={focusInput} />
        <div className={styles.actions}>
          <button
            type="button"
            commandfor={id}
            command="close"
            className={styles.textButton}
          >
            取消
          </button>
        </div>
      </dialog>
    </>
  );
}
