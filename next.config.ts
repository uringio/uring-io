import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

// The plugin wires both bundlers from one config; its Turbopack half defaults to `off` and is
// still experimental upstream (`unstable_turbopack`). `auto` enables it on Next >= 16, and
// `next build --webpack` remains the fallback with no change to any `.css.ts` file.
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {};

export default withVanillaExtract(nextConfig);
