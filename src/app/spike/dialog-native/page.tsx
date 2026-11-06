import { NativeSearchDialog } from '@/primitives/dialog/NativeSearchDialog';
import { DialogStage } from '../DialogStage';

export default function DialogNativePage() {
  return (
    <DialogStage title="Dialog · 原生对照">
      <NativeSearchDialog
        id="search-default"
        triggerLabel="打开搜索（默认焦点）"
      />
      <NativeSearchDialog
        id="search-input"
        triggerLabel="打开搜索（焦点到输入框）"
        focusInput
      />
    </DialogStage>
  );
}
