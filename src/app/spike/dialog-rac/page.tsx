import { RacSearchDialog } from '@/primitives/dialog/RacSearchDialog';
import { DialogStage } from '../DialogStage';

export default function DialogRacPage() {
  return (
    <DialogStage title="Dialog · React Aria Components">
      <RacSearchDialog
        id="search-default"
        triggerLabel="打开搜索（默认焦点）"
      />
      <RacSearchDialog
        id="search-input"
        triggerLabel="打开搜索（焦点到输入框）"
        focusInput
      />
    </DialogStage>
  );
}
