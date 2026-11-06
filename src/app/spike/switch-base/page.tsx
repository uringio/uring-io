import { BaseSwitch } from '@/primitives/switch/BaseSwitch';
import { SpikeFrame } from '../SpikeFrame';

export default function SwitchBasePage() {
  return (
    <SpikeFrame title="Switch · Base UI">
      <BaseSwitch>接收通知</BaseSwitch>
      <BaseSwitch defaultChecked>自动保存</BaseSwitch>
      <BaseSwitch disabled>已禁用（关）</BaseSwitch>
      <BaseSwitch disabled defaultChecked>
        已禁用（开）
      </BaseSwitch>
    </SpikeFrame>
  );
}
