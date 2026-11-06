import { BaseSearchDialog } from '@/primitives/dialog/BaseSearchDialog';
import { DialogStage } from '../DialogStage';

export default function DialogBasePage() {
  return (
    <DialogStage title="Dialog · Base UI">
      <BaseSearchDialog
        id="search-default"
        triggerLabel="打开搜索（默认焦点）"
      />
      <BaseSearchDialog
        id="search-input"
        triggerLabel="打开搜索（焦点到输入框）"
        focusInput
      />
    </DialogStage>
  );
}
