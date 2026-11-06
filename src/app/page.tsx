import { vars } from '@/styles/theme.css';
import { ThemeToggle } from '@/theme/ThemeToggle';
import * as styles from './page.css';

type ColorKey = keyof typeof vars.color;

// Spike page: renders the generated MD3 role pairs so the token pipeline and the theme switch can
// be checked by eye. Not part of the eventual site.
const PAIRS: [bg: ColorKey, fg: ColorKey][] = [
  ['primary', 'onPrimary'],
  ['primaryContainer', 'onPrimaryContainer'],
  ['secondary', 'onSecondary'],
  ['secondaryContainer', 'onSecondaryContainer'],
  ['tertiary', 'onTertiary'],
  ['tertiaryContainer', 'onTertiaryContainer'],
  ['error', 'onError'],
  ['errorContainer', 'onErrorContainer'],
  ['surfaceContainerLowest', 'onSurface'],
  ['surfaceContainerLow', 'onSurface'],
  ['surfaceContainer', 'onSurface'],
  ['surfaceContainerHigh', 'onSurface'],
  ['surfaceContainerHighest', 'onSurface'],
  ['inverseSurface', 'inverseOnSurface'],
];

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>MD3 tokens</h1>
        <ThemeToggle />
      </header>
      <div className={styles.grid}>
        {PAIRS.map(([bg, fg]) => (
          <div
            key={bg}
            className={styles.swatch}
            style={{ background: vars.color[bg], color: vars.color[fg] }}
          >
            {bg}
            <br />
            on: {fg}
          </div>
        ))}
      </div>
    </main>
  );
}
