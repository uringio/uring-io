import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const main = style({
  maxWidth: 960,
  margin: '0 auto',
  padding: '48px 16px',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 32,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 12,
});

export const swatch = style({
  padding: 16,
  borderRadius: 12,
  minHeight: 88,
  fontSize: 14,
  border: `1px solid ${vars.color.outlineVariant}`,
});
