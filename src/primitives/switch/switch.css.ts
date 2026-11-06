import { createVar, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// MD3 switch, sized and colored per the @material/web component tokens (`md-comp-switch`, token set v0_192). behavior-agnostic: the visual rules are written once against a state → selector map, and each behavior library gets a track class built from the map that matches where it exposes state (see `track` and `rootStateTrack`).

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

type StateSelectors = {
  selected: string;
  hovered: string;
  focusVisible: string;
  pressed: string;
  disabled: string;
  disabledSelected: string;
  // set only where hover comes from CSS `:hover`, which sticks after a tap on touch screens: matches a hover-only state so it can be undone there
  stickyHover?: string;
};

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
    // `:has` covers libraries that mark the control inside the label (and a native disabled input); the plain attribute covers React Aria Components, which marks the label itself
    '&:has([data-disabled], input:disabled), &[data-disabled]': {
      cursor: 'default',
      color: mix(vars.color.onSurface, 38),
    },
  },
  '@media': {
    // forced colors replace the dimmed text color with CanvasText, so the disabled label must name the system color itself to stay distinguishable
    '(forced-colors: active)': {
      selectors: {
        '&:has([data-disabled], input:disabled), &[data-disabled]': {
          color: 'GrayText',
        },
      },
    },
  },
});

// rule order is load-bearing: rules are emitted in the order below, so when two entries can match at once and set the same variable (pressed's 28px handle over selected's 24px, disabled-and-selected over disabled), the later one must not have lower specificity than the earlier
function trackStyle(on: StateSelectors) {
  return style({
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
      [on.selected]: {
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
      [on.hovered]: {
        vars: { [handleColor]: handleActive, [layerOpacity]: '0.08' },
      },
      [on.focusVisible]: {
        vars: { [handleColor]: handleActive, [layerOpacity]: '0.12' },
        outline: `3px solid ${vars.color.secondary}`,
        outlineOffset: 2,
      },
      [on.pressed]: {
        vars: {
          [handleColor]: handleActive,
          [handleSize]: '28px',
          [layerOpacity]: '0.12',
        },
      },
      [on.disabled]: {
        vars: {
          [trackBg]: mix(vars.color.surfaceContainerHighest, 12),
          [trackBorder]: mix(vars.color.onSurface, 12),
          [handleRest]: mix(vars.color.onSurface, 38),
        },
      },
      [on.disabledSelected]: {
        vars: {
          [trackBg]: mix(vars.color.onSurface, 12),
          [trackBorder]: 'transparent',
          [handleRest]: vars.color.surface,
        },
      },
    },
    '@media': {
      // the undo rule must exclude pressed and focused states: this block is emitted after them and would otherwise override them too
      ...(on.stickyHover && {
        '(hover: none)': {
          selectors: {
            [on.stickyHover]: {
              vars: { [handleColor]: handleRest, [layerOpacity]: '0' },
            },
          },
        },
      }),
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
          [on.selected]: {
            vars: {
              [trackBg]: 'Highlight',
              [trackBorder]: 'Highlight',
              [handleRest]: 'HighlightText',
              [handleActive]: 'HighlightText',
              [layerColor]: 'transparent',
            },
          },
          // both disabled rules are restated so they outrank the base disabled-and-selected rule, whose non-system colors would otherwise leak through
          [`${on.disabled}, ${on.disabledSelected}`]: {
            vars: {
              [trackBg]: 'Canvas',
              [trackBorder]: 'GrayText',
              [handleRest]: 'GrayText',
            },
          },
          [on.focusVisible]: {
            outlineColor: 'CanvasText',
          },
        },
      },
    },
  });
}

const interactive = ':not([data-disabled])';

// state on the track itself: Base UI's track is the focusable `role=switch` element and sets `data-checked`/`data-disabled`, so native `:hover`/`:active`/`:focus-visible` apply directly; the React Aria hooks wrapper mirrors its state onto the same `data-*` names plus `data-pressed`/`data-focus-visible`, since its focusable element is a hidden input.
export const track = trackStyle({
  selected: '&[data-checked]',
  hovered: `&${interactive}:hover`,
  focusVisible: `&${interactive}:focus-visible, &${interactive}[data-focus-visible]`,
  pressed: `&${interactive}:active, &${interactive}[data-pressed]`,
  disabled: '&[data-disabled]',
  disabledSelected: '&[data-disabled][data-checked]',
  stickyHover: `&${interactive}:hover:not(:active):not([data-pressed]):not(:focus-visible):not([data-focus-visible])`,
});

// state on the root label: React Aria Components sets `data-selected`/`-hovered`/`-pressed`/`-focus-visible`/`-disabled` there. its `data-hovered` ignores the emulated mouse events that follow a touch, so this variant needs no sticky-hover undo.
const onRoot = (attrs: string) => `${root}${attrs} &`;
export const rootStateTrack = trackStyle({
  selected: onRoot('[data-selected]'),
  hovered: onRoot('[data-hovered]'),
  focusVisible: onRoot('[data-focus-visible]'),
  pressed: onRoot('[data-pressed]'),
  disabled: onRoot('[data-disabled]'),
  disabledSelected: onRoot('[data-disabled][data-selected]'),
});

// state from a native `<input type="checkbox" role="switch">` inside the root label, read through `:has()` alone, so the switch works with no JavaScript at all. every condition sits in `:where()` to give all entries one specificity, leaving precedence to rule order as for the other maps.
const onNative = (condition: string) => `${root}:where(${condition}) &`;
export const nativeTrack = trackStyle({
  selected: onNative(':has(input:checked)'),
  hovered: onNative(':hover:not(:has(input:disabled))'),
  focusVisible: onNative(':has(input:focus-visible)'),
  pressed: onNative(':active:not(:has(input:disabled))'),
  disabled: onNative(':has(input:disabled)'),
  disabledSelected: onNative(':has(input:disabled:checked)'),
  stickyHover: onNative(
    ':hover:not(:active):not(:has(input:focus-visible, input:disabled))',
  ),
});

// the hidden-input wrapper for the native variant, matching what React Aria's `VisuallyHidden` renders so the two topologies stay comparable
export const visuallyHidden = style({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
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
