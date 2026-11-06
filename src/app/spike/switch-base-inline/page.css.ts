import { globalStyle, style } from '@vanilla-extract/css';

// single-variable control for the NVDA line split: the Base UI switch element moves from a blockified flex item to an inline-block in an inline formatting context; everything else on the page matches the regular Base UI page.
export const inlineRows = style({});

globalStyle(`${inlineRows} label`, {
  display: 'block',
  paddingBlock: 8,
});

globalStyle(`${inlineRows} label > [role=switch]`, {
  display: 'inline-block',
  verticalAlign: 'middle',
  marginInlineEnd: 16,
});
