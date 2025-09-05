import Postcard from "../components/ui/postcard";
import { getPostBySlug } from "../lib/posts";

function stripMarkdownMdx(input: string): string {
  // remove code fences
  let text = input.replace(/```[\s\S]*?```/g, " ");
  // remove inline code
  text = text.replace(/`[^`]*`/g, " ");
  // images ![alt](url)
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  // links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  // headings and blockquotes
  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/^>\s?/gm, "");
  // emphasis and stray md symbols
  text = text.replace(/[\*_~#>]/g, "");
  // HTML tags
  text = text.replace(/<[^>]+>/g, " ");
  // collapse whitespace
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

function buildTwoLinePreviewFromContent(content: string, maxWords = 40, maxChars = 220): string {
  const plain = stripMarkdownMdx(content);
  const words = plain.split(/\s+/);
  let result = "";
  for (let i = 0; i < words.length && i < maxWords; i++) {
    const next = result ? result + " " + words[i] : words[i];
    if (next.length > maxChars) break;
    result = next;
  }
  return result || words.slice(0, Math.min(words.length, maxWords)).join(" ");
}

function getSevlogPosts() {
  const slugs = ["study-plan-nvidia-genai.mdx1", "sevlog2", "sevloggggg3", "sevlog-test4"]; // explicit assignment
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const preview = buildTwoLinePreviewFromContent(post.content);
      return { ...post.meta, preview };
    })
    .filter((p): p is { title: string; date: string; description?: string; slug: string; readingTime: string; preview: string } => Boolean(p));
}

export default function SevlogPage() {
  const posts = getSevlogPosts();

  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '10vh' }}>
      <h1 className="text-6xl font-extrabold mb-8">Sev'Log</h1>

      <div className="max-w-2xl w-full flex flex-col gap-4">
        {posts.map((post) => (
          <Postcard
            key={post.slug}
            title={post.title}
            preview={post.preview}
            date={post.date}
            readingTime={post.readingTime}
            href={`/posts/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
}


