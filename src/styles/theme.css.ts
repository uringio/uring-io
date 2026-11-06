import {
  argbFromHex,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeTonalSpot,
} from '@material/material-color-utilities';
import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from '@vanilla-extract/css';

// MD3 color tokens, computed at build time: vanilla-extract evaluates this module in Node during
// the build and emits only the resulting static CSS, so the color library never reaches a bundle.

const SEED = '#6750a4';

// The MD3 sys color roles this site exposes. Each entry must name a role method on
// `MaterialDynamicColors`, so a role the library renames or drops fails the type-check. Palette key
// colors and the 2025 spec's `*Dim` roles are left out: the former are generator inputs, not
// roles, and the latter are undefined under some scheme variants.
const ROLES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'inversePrimary',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'inverseSurface',
  'inverseOnSurface',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'surfaceTint',
] as const satisfies readonly (keyof MaterialDynamicColors)[];

type Role = (typeof ROLES)[number];

const toKebab = (camel: string) =>
  camel.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// Custom-property names follow the MD3 spec's `--md-sys-color-<role>` so values copied from
// Material's own docs and tooling apply unchanged.
export const vars = createGlobalThemeContract(
  {
    color: Object.fromEntries(ROLES.map((r) => [r, toKebab(r)])) as Record<
      Role,
      string
    >,
  },
  (value) => `md-sys-color-${value}`,
);

const source = Hct.fromInt(argbFromHex(SEED));
const light = new SchemeTonalSpot(source, false, 0, '2025');
const dark = new SchemeTonalSpot(source, true, 0, '2025');
const colors = new MaterialDynamicColors();

// One declaration per role: `light-dark()` picks its arm from the element's `color-scheme`, so the
// theme switch below only flips `color-scheme` and never re-emits the tokens.
createGlobalTheme(':root', vars, {
  color: Object.fromEntries(
    ROLES.map((role) => {
      const dc = colors[role]();
      return [
        role,
        `light-dark(${hexFromArgb(dc.getArgb(light))}, ${hexFromArgb(dc.getArgb(dark))})`,
      ];
    }),
  ) as Record<Role, string>,
});

// Unset `data-theme` follows the OS; the attribute is the user's explicit override, written
// before first paint by the inline script in the root layout.
globalStyle(':root', { colorScheme: 'light dark' });
globalStyle(':root[data-theme="light"]', { colorScheme: 'light' });
globalStyle(':root[data-theme="dark"]', { colorScheme: 'dark' });
