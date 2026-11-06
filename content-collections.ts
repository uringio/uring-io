import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.iso.date(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => ({
    ...doc,
    slug: doc._meta.path,
    mdx: await compileMDX(ctx, doc),
  }),
});

export default defineConfig({
  content: [posts],
});
