// shared by the inline pre-paint script and the client toggle, so both read and write the same storage slot and attribute.
export const THEME_STORAGE_KEY = 'theme';

export type ThemePreference = 'light' | 'dark' | 'system';

// runs inline in <head> before first paint, so a stored override applies without a flash. it is a string, not a function, because it executes before any bundle loads. localStorage access is guarded because it throws in some privacy modes; the page then simply follows the OS.
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
