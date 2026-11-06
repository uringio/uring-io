import { AriaSwitch } from '@/primitives/switch/AriaSwitch';
import { SpikeFrame } from '../SpikeFrame';

export default function SwitchAriaPage() {
  return (
    <SpikeFrame title="Switch · React Aria">
      <AriaSwitch>接收通知</AriaSwitch>
      <AriaSwitch defaultSelected>自动保存</AriaSwitch>
      <AriaSwitch isDisabled>已禁用（关）</AriaSwitch>
      <AriaSwitch isDisabled defaultSelected>
        已禁用（开）
      </AriaSwitch>
    </SpikeFrame>
  );
}
