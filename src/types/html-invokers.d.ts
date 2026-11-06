import 'react';

// HTML attributes newer than the installed @types/react: invoker commands (`commandfor` + `command`, which open and close a `<dialog>` without script) and the dialog's `closedby` light-dismiss control. React passes lowercase attributes through to the DOM unchanged, so only the types are missing.
declare module 'react' {
  interface ButtonHTMLAttributes<T> {
    commandfor?: string;
    command?: 'show-modal' | 'close' | 'request-close' | `--${string}`;
  }
  interface DialogHTMLAttributes<T> {
    closedby?: 'any' | 'closerequest' | 'none';
  }
}
