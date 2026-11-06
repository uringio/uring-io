import { withContentCollections } from '@content-collections/next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

// the plugin wires both bundlers from one config; its Turbopack half defaults to `off` and is still experimental upstream (`unstable_turbopack`). `auto` enables it on Next >= 16, and `next build --webpack` remains the fallback with no change to any `.css.ts` file.
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {
  // when `next dev` detects an AI coding agent, it writes a managed block into AGENTS.md that addresses the agent directly, and re-adds it if removed. that makes a dependency an instruction channel into the agent, which this repo keeps closed: agent rules here are hand-written only. with `false`, `next dev` instead strips its block from an existing AGENTS.md (deleting the file if nothing else is left) and leaves hand-written content alone. the block's one useful fact, that version-matched docs ship at `node_modules/next/dist/docs/`, belongs in the hand-written rules if wanted.
  agentRules: false,
};

// `withContentCollections` runs the content builder (and, under `next dev`, its watcher) before resolving and returns the config unchanged. it must be awaited: otherwise the bundler can try to resolve the `content-collections` import before `.content-collections/generated` has been written.
export default async function config(): Promise<NextConfig> {
  return withVanillaExtract(await withContentCollections(nextConfig));
}
