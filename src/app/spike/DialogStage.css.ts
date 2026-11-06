import { style } from '@vanilla-extract/css';

export const triggers = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
});

// tall enough to scroll, so the scroll-lock check has something to lock
export const filler = style({
  minHeight: '150vh',
});
