import { createVar, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// MD3 switch, sized and colored per the @material/web component tokens (`md-comp-switch`, token set v0_192). behavior-agnostic: the same classes style the Base UI and the React Aria implementations, so every state is read from attributes both can produce — `data-checked`/`data-disabled` (Base UI sets them itself; the React Aria wrapper mirrors its hook state onto them), and native `:hover`/`:active`/`:focus-visible` with `data-pressed`/`data-focus-visible` as the hook-driven equivalents.

// state is resolved once on the track into these variables; the thumb and its pseudo-elements only consume them, so no selector has to combine state with structure.
const trackBg = createVar();
const trackBorder = createVar();
const handleRest = createVar();
const handleActive = createVar();
const handleColor = createVar();
const handleSize = createVar();
const layerColor = createVar();
const layerOpacity = createVar();
const thumbX = createVar();

const mix = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const interactive = ':not([data-disabled])';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 16,
  // MD3's 48dp minimum touch target, carried by the row since the track itself is 32px tall
  minHeight: 48,
  color: vars.color.onSurface,
  cursor: 'pointer',
  userSelect: 'none',
  selectors: {
    '&:has([data-disabled])': {
      cursor: 'default',
      color: mix(vars.color.onSurface, 38),
    },
  },
  '@media': {
    // forced colors replace the dimmed text color with CanvasText, so the disabled label must name the system color itself to stay distinguishable
    '(forced-colors: active)': {
      selectors: {
        '&:has([data-disabled])': { color: 'GrayText' },
      },
    },
  },
});

export const track = style({
  vars: {
    [trackBg]: vars.color.surfaceContainerHighest,
    [trackBorder]: vars.color.outline,
    [handleRest]: vars.color.outline,
    [handleActive]: vars.color.onSurfaceVariant,
    [handleColor]: handleRest,
    [handleSize]: '16px',
    [layerColor]: vars.color.onSurface,
    [layerOpacity]: '0',
    [thumbX]: '0px',
  },
  position: 'relative',
  flexShrink: 0,
  boxSizing: 'border-box',
  width: 52,
  height: 32,
  borderRadius: 16,
  border: `2px solid ${trackBorder}`,
  background: trackBg,
  outline: 'none',
  transition: 'background-color 67ms linear, border-color 67ms linear',
  selectors: {
    '&[data-checked]': {
      vars: {
        [trackBg]: vars.color.primary,
        [trackBorder]: vars.color.primary,
        [handleRest]: vars.color.onPrimary,
        [handleActive]: vars.color.primaryContainer,
        [handleSize]: '24px',
        [layerColor]: vars.color.primary,
        // padding-box travel from the start circle's center (14px) to the end circle's (34px)
        [thumbX]: '20px',
      },
    },
    [`&${interactive}:hover`]: {
      vars: { [handleColor]: handleActive, [layerOpacity]: '0.08' },
    },
    [`&${interactive}:focus-visible, &${interactive}[data-focus-visible]`]: {
      vars: { [handleColor]: handleActive, [layerOpacity]: '0.12' },
      outline: `3px solid ${vars.color.secondary}`,
      outlineOffset: 2,
    },
    [`&${interactive}:active, &${interactive}[data-pressed]`]: {
      vars: {
        [handleColor]: handleActive,
        [handleSize]: '28px',
        [layerOpacity]: '0.12',
      },
    },
    '&[data-disabled]': {
      vars: {
        [trackBg]: mix(vars.color.surfaceContainerHighest, 12),
        [trackBorder]: mix(vars.color.onSurface, 12),
        [handleRest]: mix(vars.color.onSurface, 38),
      },
    },
    '&[data-disabled][data-checked]': {
      vars: {
        [trackBg]: mix(vars.color.onSurface, 12),
        [trackBorder]: 'transparent',
        [handleRest]: vars.color.surface,
      },
    },
  },
  '@media': {
    // `:hover` sticks after a tap on touch screens, so a hover-only state is undone there. the selector excludes pressed and focused states because this block is emitted after them and would otherwise override them too.
    '(hover: none)': {
      selectors: {
        [`&${interactive}:hover:not(:active):not([data-pressed]):not(:focus-visible):not([data-focus-visible])`]:
          {
            vars: { [handleColor]: handleRest, [layerOpacity]: '0' },
          },
      },
    },
    // Windows high-contrast themes force backgrounds to Canvas, which would erase a handle drawn with `background`. opting the control out and mapping it onto system colors keeps both states legible under any theme.
    '(forced-colors: active)': {
      forcedColorAdjust: 'none',
      vars: {
        [trackBg]: 'Canvas',
        [trackBorder]: 'CanvasText',
        [handleRest]: 'CanvasText',
        [handleActive]: 'CanvasText',
        [layerColor]: 'transparent',
      },
      selectors: {
        '&[data-checked]': {
          vars: {
            [trackBg]: 'Highlight',
            [trackBorder]: 'Highlight',
            [handleRest]: 'HighlightText',
            [handleActive]: 'HighlightText',
            [layerColor]: 'transparent',
          },
        },
        // both disabled rules are restated so they outrank the base `[data-disabled][data-checked]` rule, whose non-system colors would otherwise leak through
        '&[data-disabled], &[data-disabled][data-checked]': {
          vars: {
            [trackBg]: 'Canvas',
            [trackBorder]: 'GrayText',
            [handleRest]: 'GrayText',
          },
        },
        '&:focus-visible, &[data-focus-visible]': {
          outlineColor: 'CanvasText',
        },
      },
    },
  },
});

// a 40px box centered on the handle: `::before` paints the state layer behind, `::after` the handle itself, so both move with the thumb and the handle can resize without shifting the layer.
export const thumb = style({
  position: 'absolute',
  top: -6,
  left: -6,
  width: 40,
  height: 40,
  pointerEvents: 'none',
  transform: `translateX(${thumbX})`,
  // the overshoot curve is @material/web's own, not a sys-motion token
  transition: 'transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: layerColor,
      opacity: layerOpacity,
      transition: 'opacity 100ms linear',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: handleSize,
      height: handleSize,
      borderRadius: '50%',
      background: handleColor,
      transform: 'translate(-50%, -50%)',
      transition:
        'width 250ms cubic-bezier(0.2, 0, 0, 1), height 250ms cubic-bezier(0.2, 0, 0, 1), background-color 67ms linear',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: {
        '&::before, &::after': { transition: 'none' },
      },
    },
  },
});
