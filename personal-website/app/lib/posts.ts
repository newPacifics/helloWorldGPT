import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
  slug: string;
  readingTime: string;
};

const CONTENT_DIR = path.join(process.cwd(), "app", "content", "posts");

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(file);
    const stats = readingTime(content);

    const slug = filename.replace(/\.mdx$/, "");
    const title = (data.title as string) ?? slug;
    const date = (data.date as string) ?? new Date().toISOString();
    const description = (data.description as string) ?? content.slice(0, 140);

    return {
      title,
      date,
      description,
      slug,
      readingTime: `${Math.max(1, Math.round(stats.minutes))} min`,
    } satisfies PostMeta;
  });

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(file);
  const stats = readingTime(content);

  const title = (data.title as string) ?? slug;
  const date = (data.date as string) ?? new Date().toISOString();
  const description = (data.description as string) ?? content.slice(0, 140);

  return {
    meta: {
      title,
      date,
      description,
      slug,
      readingTime: `${Math.max(1, Math.round(stats.minutes))} min`,
    },
    content,
  };
}

export function getPostsByPrefix(prefix: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.slug.startsWith(prefix));
}

export function getPostsExcludingPrefix(prefix: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => !p.slug.startsWith(prefix));
}

export function getPostsBySlugs(slugs: string[]): PostMeta[] {
  const allowed = new Set(slugs);
  const metas = getAllPostsMeta().filter((p) => allowed.has(p.slug));
  // Preserve the order provided in slugs
  const order = new Map(slugs.map((s, i) => [s, i] as const));
  return metas.sort((a, b) => (order.get(a.slug)! - order.get(b.slug)!));
}


