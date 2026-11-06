import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const article = style({
  maxWidth: 720,
  margin: '0 auto',
  padding: '48px 16px',
});

export const meta = style({
  color: vars.color.onSurfaceVariant,
  fontSize: 14,
});
