import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/app/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getAllPosts().map((post) => {
    // Extract the slug from the full path
    let slug = post.slug;
    
    // Remove 'posts/' prefix
    if (slug.startsWith('posts/')) {
      slug = slug.replace('posts/', '');
    }
    
    // Handle nested paths
    if (slug.startsWith('engineering/') || slug.startsWith('wanderlog/')) {
      slug = slug.split('/')[1]; // Get just the filename without the folder
    }
    
    return { slug };
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <article className="prose dark:prose-invert max-w-none">
      <header className="mb-6">
        {post.title && (
          <h1 className="text-4xl font-bold">{post.title}</h1>
        )}
        <p className="text-sm text-gray-500 mt-2">
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </time>
          <span className="mx-2">•</span>
          <span>{post.readingTime}</span>
        </p>
      </header>
      <MDXRemote source={post.body.raw} />
    </article>
  );
}


