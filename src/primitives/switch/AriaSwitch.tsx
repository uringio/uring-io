'use client';

import { type ReactNode, useRef } from 'react';
import {
  type AriaSwitchProps,
  mergeProps,
  useFocusRing,
  useSwitch,
  VisuallyHidden,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import * as styles from './switch.css';

type AriaSwitchWrapperProps = Pick<
  AriaSwitchProps,
  'isSelected' | 'defaultSelected' | 'onChange' | 'isDisabled' | 'name'
> & { children: ReactNode };

// React Aria keeps a real `<input type="checkbox" role="switch">`, visually hidden, as the focusable control; the track is decoration, so its state is mirrored onto the `data-*` attributes the shared styles read.
export function AriaSwitch(props: AriaSwitchWrapperProps) {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, isPressed, isDisabled } = useSwitch(
    props,
    state,
    ref,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  return (
    <label {...labelProps} className={styles.root}>
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <span
        className={styles.track}
        aria-hidden
        data-checked={state.isSelected || undefined}
        data-pressed={isPressed || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={isDisabled || undefined}
      >
        <span className={styles.thumb} />
      </span>
      {props.children}
    </label>
  );
}
