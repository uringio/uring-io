import type { ReactNode } from 'react';
import * as styles from '@/primitives/switch/switch.css';
import { SpikeFrame } from '../SpikeFrame';

// zero-dependency control for the NVDA comparison: the same label > hidden input + track + text topology as the React Aria variants, with no library and no client component (the switch works before and without hydration), so screen-reader behavior seen here belongs to the browser and NVDA rather than to any library's wiring.
function NativeSwitch({
  children,
  defaultChecked,
  disabled,
}: {
  children: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className={styles.root}>
      <span className={styles.visuallyHidden}>
        <input
          type="checkbox"
          // biome-ignore lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state to the switch role implicitly; a static aria-checked would go stale as soon as the box is toggled
          role="switch"
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
      </span>
      <span className={styles.nativeTrack} aria-hidden>
        <span className={styles.thumb} />
      </span>
      {children}
    </label>
  );
}

export default function SwitchNativePage() {
  return (
    <SpikeFrame title="Switch · 原生对照">
      <NativeSwitch>接收通知</NativeSwitch>
      <NativeSwitch defaultChecked>自动保存</NativeSwitch>
      <NativeSwitch disabled>已禁用（关）</NativeSwitch>
      <NativeSwitch disabled defaultChecked>
        已禁用（开）
      </NativeSwitch>
    </SpikeFrame>
  );
}
