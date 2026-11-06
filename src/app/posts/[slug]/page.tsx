import { MDXContent } from '@content-collections/mdx/react';
import { allPosts } from 'content-collections';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/mdx/components';
import * as styles from './page.css';

// every post is known at build time; an unknown slug is a 404, not an on-demand render.
export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className={styles.article}>
      <h1>{post.title}</h1>
      <time className={styles.meta} dateTime={post.date}>
        {post.date}
      </time>
      {/* this is a server component, so `MDXContent` resolves to the package's `react-server` build: the compiled MDX is evaluated here, at build time, and only its rendered tree reaches the client. importing it from a client component would instead ship the compiled code string and evaluate it in the browser. */}
      <MDXContent code={post.mdx} components={mdxComponents} />
    </article>
  );
}
