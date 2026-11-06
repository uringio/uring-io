import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// MD3 basic dialog, per the @material/web component tokens (`md-comp-dialog`, token set v0_192) and the motion in its dialog animations: the container slides down 50px on enter (500ms, emphasized) and back up on exit (150ms, emphasized-accelerate) while the scrim fades to 32%. the visual classes are shared; each behavior layer gets its own motion class, because each exposes enter/exit state differently (see `basePopup`, `racModal`, `nativeDialog`).

const emphasized = 'cubic-bezier(0.3, 0, 0, 1)';
const emphasizedAccelerate = 'cubic-bezier(0.3, 0, 0.8, 0.15)';
const scrimColor = `color-mix(in srgb, ${vars.color.scrim} 32%, transparent)`;
const mix = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-50px)' },
});
const slideOut = keyframes({
  to: { opacity: 0, transform: 'translateY(-50px)' },
});
const fadeIn = keyframes({ from: { opacity: 0 } });
const fadeOut = keyframes({ to: { opacity: 0 } });

const reducedMotion = {
  '(prefers-reduced-motion: reduce)': {
    animation: 'none',
    transition: 'none',
  },
};

export const surface = style({
  boxSizing: 'border-box',
  width: 'min(560px, calc(100vw - 48px))',
  padding: 24,
  border: 'none',
  borderRadius: 28,
  background: vars.color.surfaceContainerHigh,
  color: vars.color.onSurface,
  // MD3 elevation level 3
  boxShadow: '0 4px 8px 3px rgb(0 0 0 / 0.15), 0 1px 3px rgb(0 0 0 / 0.3)',
  outline: 'none',
});

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
});

export const headline = style({
  margin: 0,
  fontSize: 24,
  lineHeight: '32px',
  fontWeight: 400,
});

export const supporting = style({
  margin: '16px 0 0',
  fontSize: 14,
  lineHeight: '20px',
  color: vars.color.onSurfaceVariant,
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginTop: 16,
});

export const fieldLabel = style({
  fontSize: 12,
  lineHeight: '16px',
  color: vars.color.onSurfaceVariant,
});

export const input = style({
  font: 'inherit',
  fontSize: 16,
  padding: '12px 16px',
  borderRadius: 4,
  border: `1px solid ${vars.color.outline}`,
  background: 'transparent',
  color: vars.color.onSurface,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: vars.color.primary,
      boxShadow: `inset 0 0 0 1px ${vars.color.primary}`,
    },
  },
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
  marginTop: 24,
});

const focusRing = {
  outline: `3px solid ${vars.color.secondary}`,
  outlineOffset: 2,
};

export const textButton = style({
  font: 'inherit',
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  letterSpacing: '0.1px',
  minHeight: 40,
  padding: '10px 12px',
  border: 'none',
  borderRadius: 20,
  background: 'transparent',
  color: vars.color.primary,
  cursor: 'pointer',
  outline: 'none',
  selectors: {
    '&:hover': { background: mix(vars.color.primary, 8) },
    '&:active': { background: mix(vars.color.primary, 12) },
    '&:focus-visible': focusRing,
  },
});

export const iconButton = style({
  flexShrink: 0,
  width: 40,
  height: 40,
  marginTop: -4,
  marginInlineEnd: -8,
  border: 'none',
  borderRadius: '50%',
  background: 'transparent',
  color: vars.color.onSurfaceVariant,
  fontSize: 24,
  lineHeight: 1,
  cursor: 'pointer',
  outline: 'none',
  selectors: {
    '&:hover': { background: mix(vars.color.onSurfaceVariant, 8) },
    '&:active': { background: mix(vars.color.onSurfaceVariant, 12) },
    '&:focus-visible': focusRing,
  },
});

// Base UI keeps the popup mounted through its transitions and marks the first and last frames with `data-starting-style` / `data-ending-style`, so plain CSS transitions toward and away from those states are enough; it waits for them before unmounting.
export const baseBackdrop = style({
  position: 'fixed',
  inset: 0,
  background: scrimColor,
  transition: 'opacity 500ms linear',
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
    '&[data-ending-style]': { transitionDuration: '150ms' },
  },
  '@media': reducedMotion,
});

export const basePopup = style({
  position: 'fixed',
  inset: 0,
  height: 'fit-content',
  margin: 'auto',
  transition: `opacity 250ms linear, transform 500ms ${emphasized}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: 'translateY(-50px)',
    },
    '&[data-ending-style]': {
      transition: `opacity 100ms linear, transform 150ms ${emphasizedAccelerate}`,
    },
  },
  '@media': reducedMotion,
});

// React Aria Components sets `data-entering` / `data-exiting` on the overlay and the modal and keeps them mounted until the CSS animations it finds on them finish.
export const racOverlay = style({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: scrimColor,
  selectors: {
    '&[data-entering]': { animation: `${fadeIn} 500ms linear` },
    '&[data-exiting]': { animation: `${fadeOut} 150ms linear forwards` },
  },
  '@media': reducedMotion,
});

export const racModal = style({
  outline: 'none',
  selectors: {
    '&[data-entering]': { animation: `${slideIn} 500ms ${emphasized}` },
    '&[data-exiting]': {
      animation: `${slideOut} 150ms ${emphasizedAccelerate} forwards`,
    },
  },
  '@media': reducedMotion,
});

// native `<dialog>`: the enter is a keyframe animation on `[open]`, which needs no starting style; the exit transitions back to the closed values, with `display` and `overlay` transitioned discretely so the element stays rendered in the top layer until the fade ends.
export const nativeDialog = style({
  transition: [
    'opacity 100ms linear',
    `transform 150ms ${emphasizedAccelerate}`,
    'overlay 150ms allow-discrete',
    'display 150ms allow-discrete',
  ].join(', '),
  selectors: {
    '&:not([open])': { opacity: 0, transform: 'translateY(-50px)' },
    '&[open]': { animation: `${slideIn} 500ms ${emphasized}` },
    '&::backdrop': {
      background: scrimColor,
      transition:
        'opacity 150ms linear, overlay 150ms allow-discrete, display 150ms allow-discrete',
    },
    '&:not([open])::backdrop': { opacity: 0 },
    '&[open]::backdrop': { animation: `${fadeIn} 500ms linear` },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: {
        '&[open], &[open]::backdrop': { animation: 'none' },
        '&::backdrop': { transition: 'none' },
      },
    },
  },
});
