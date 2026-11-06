'use client';

import type { ReactNode } from 'react';
import { Switch, type SwitchProps } from 'react-aria-components';
import * as styles from './switch.css';

type RacSwitchProps = Pick<
  SwitchProps,
  'isSelected' | 'defaultSelected' | 'onChange' | 'isDisabled' | 'name'
> & { children: ReactNode };

// React Aria Components renders the `<label>` with the visually hidden `<input role="switch">` itself and marks its state on that label, so the track reads state from the root (`rootStateTrack`). `'use client'` is required: the package imports `client-only` and carries no directive of its own, so a server component may not import it directly.
export function RacSwitch({ children, ...props }: RacSwitchProps) {
  return (
    <Switch {...props} className={styles.root}>
      <span className={styles.rootStateTrack} aria-hidden>
        <span className={styles.thumb} />
      </span>
      {children}
    </Switch>
  );
}
