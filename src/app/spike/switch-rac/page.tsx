import { RacSwitch } from '@/primitives/switch/RacSwitch';
import { SpikeFrame } from '../SpikeFrame';

export default function SwitchRacPage() {
  return (
    <SpikeFrame title="Switch · React Aria Components">
      <RacSwitch>接收通知</RacSwitch>
      <RacSwitch defaultSelected>自动保存</RacSwitch>
      <RacSwitch isDisabled>已禁用（关）</RacSwitch>
      <RacSwitch isDisabled defaultSelected>
        已禁用（开）
      </RacSwitch>
    </SpikeFrame>
  );
}
