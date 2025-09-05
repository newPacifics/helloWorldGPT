import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return [] as any[];
}

export default function PostPage({ params }: any) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="prose dark:prose-invert max-w-none">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">{post.meta.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          <time dateTime={new Date(post.meta.date).toISOString()}>
            {new Date(post.meta.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </time>
          <span className="mx-2">•</span>
          <span>{post.meta.readingTime}</span>
        </p>
      </header>
      <MDXRemote source={post.content} />
    </article>
  );
}


