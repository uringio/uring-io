import { BaseSwitch } from '@/primitives/switch/BaseSwitch';
import { SpikeFrame } from '../SpikeFrame';
import * as styles from './page.css';

export default function SwitchBaseInlinePage() {
  return (
    <SpikeFrame title="Switch · Base UI（行内布局）">
      <div className={styles.inlineRows}>
        <BaseSwitch>接收通知</BaseSwitch>
        <BaseSwitch defaultChecked>自动保存</BaseSwitch>
        <BaseSwitch disabled>已禁用（关）</BaseSwitch>
        <BaseSwitch disabled defaultChecked>
          已禁用（开）
        </BaseSwitch>
      </div>
    </SpikeFrame>
  );
}
