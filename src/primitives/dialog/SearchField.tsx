import type { Ref } from 'react';
import * as styles from './dialog.css';

// the dialog body shared by every behavior layer in the comparison, so only the dialog wiring differs between them. `autoFocus` is how React Aria Components and the native `<dialog>` are told where focus lands; Base UI takes the `inputRef` through `initialFocus` instead.
export function SearchField({
  id,
  autoFocus,
  inputRef,
}: {
  id: string;
  autoFocus?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        关键词
      </label>
      <input
        id={id}
        ref={inputRef}
        type="search"
        // biome-ignore lint/a11y/noAutofocus: only ever set inside a modal search dialog, where moving focus to the query field on open is the expected behavior
        autoFocus={autoFocus}
        className={styles.input}
      />
    </div>
  );
}
