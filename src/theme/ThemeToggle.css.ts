import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const toggle = style({
  font: 'inherit',
  padding: '8px 16px',
  border: `1px solid ${vars.color.outline}`,
  borderRadius: 999,
  background: vars.color.surfaceContainer,
  color: vars.color.onSurface,
  cursor: 'pointer',
});
