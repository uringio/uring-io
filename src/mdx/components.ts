import { Counter } from './Counter';

// the components every post can use without importing. passed to `MDXContent` from a server component, so only the client components among them (`'use client'` leaves) ship to the browser, each as its own island.
export const mdxComponents = { Counter };
