import { allPosts } from 'content-collections';
import Link from 'next/link';
import { vars } from '@/styles/theme.css';
import { ThemeToggle } from '@/theme/ThemeToggle';
import * as styles from './page.css';

type ColorKey = keyof typeof vars.color;

// spike page: renders the generated MD3 role pairs so the token pipeline and the theme switch can be checked by eye. it is not part of the eventual site.
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

// the primitive-comparison pages; removed together with them once a behavior library is chosen
const SPIKE_PAGES: [href: string, title: string][] = [
  ['/spike/switch-native', 'Switch · 原生对照'],
  ['/spike/switch-base', 'Switch · Base UI'],
  ['/spike/switch-base-inline', 'Switch · Base UI（行内布局）'],
  ['/spike/switch-aria', 'Switch · React Aria'],
  ['/spike/switch-rac', 'Switch · React Aria Components'],
  ['/spike/dialog-native', 'Dialog · 原生对照'],
  ['/spike/dialog-base', 'Dialog · Base UI'],
  ['/spike/dialog-rac', 'Dialog · React Aria Components'],
];

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>MD3 tokens</h1>
        <ThemeToggle />
      </header>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
        {SPIKE_PAGES.map(([href, title]) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
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
