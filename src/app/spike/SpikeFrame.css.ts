import { style } from '@vanilla-extract/css';

export const main = style({
  maxWidth: 720,
  margin: '0 auto',
  padding: '48px 16px',
});

export const stack = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
});
