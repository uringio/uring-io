import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*, *::before, *::after', { boxSizing: 'border-box' });

globalStyle('body', {
  margin: 0,
  background: vars.color.surface,
  color: vars.color.onSurface,
  fontFamily: 'system-ui, sans-serif',
  lineHeight: 1.6,
});
