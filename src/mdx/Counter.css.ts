import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const counter = style({
  font: 'inherit',
  padding: '8px 20px',
  border: 'none',
  borderRadius: 999,
  background: vars.color.primary,
  color: vars.color.onPrimary,
  cursor: 'pointer',
});
