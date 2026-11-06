import { Switch } from '@base-ui/react/switch';
import type { ComponentProps, ReactNode } from 'react';
import * as styles from './switch.css';

type BaseSwitchProps = Pick<
  ComponentProps<typeof Switch.Root>,
  'checked' | 'defaultChecked' | 'onCheckedChange' | 'disabled' | 'name'
> & { children: ReactNode };

// Base UI renders the track as a focusable `<span role="switch">` and keeps a hidden `<input>` beside it for forms; wrapping both in a `<label>` gives the switch its accessible name. no `'use client'` here: the Base UI parts already carry it, so this wrapper works from server components too.
export function BaseSwitch({ children, ...props }: BaseSwitchProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: `Switch.Root` renders the labelled `<input>`, which the rule cannot see through
    <label className={styles.root}>
      <Switch.Root className={styles.track} {...props}>
        <Switch.Thumb className={styles.thumb} />
      </Switch.Root>
      {children}
    </label>
  );
}
