'use client';

import { useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, type ThemePreference } from './preference';
import * as styles from './ThemeToggle.css';

const NEXT: Record<ThemePreference, ThemePreference> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// The <html> attribute, not localStorage, is the source of truth at runtime: the inline script
// has already copied any stored override onto it before hydration.
function getSnapshot(): ThemePreference {
  const t = document.documentElement.dataset.theme;
  return t === 'light' || t === 'dark' ? t : 'system';
}

// The server cannot know the preference; `null` renders a neutral label during hydration, and
// React re-renders with the real snapshot right after, without a mismatch.
function getServerSnapshot() {
  return null;
}

function setPreference(pref: ThemePreference) {
  const root = document.documentElement;
  if (pref === 'system') delete root.dataset.theme;
  else root.dataset.theme = pref;
  try {
    if (pref === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // Storage unavailable (privacy mode): the choice still applies for this page view.
  }
  for (const listener of listeners) listener();
}

export function ThemeToggle() {
  const pref = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <button
      type="button"
      className={styles.toggle}
      disabled={pref === null}
      onClick={() => pref && setPreference(NEXT[pref])}
    >
      主题：{pref ?? '…'}
    </button>
  );
}
