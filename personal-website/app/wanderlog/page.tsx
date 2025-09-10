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

function getWanderlogPosts() {
    const slugs = ["study-plan-nvidia-genai", "sevlog2", "sevloggggg3", "sevlog-test4"]; // explicit assignment
    return slugs
        .map((slug) => {
            const post = getPostBySlug(slug);
            if (!post) return null;
            const preview = buildTwoLinePreviewFromContent(post.content);
            return { ...post.meta, preview };
        })
        .filter((p): p is { title: string; date: string; description?: string; slug: string; readingTime: string; preview: string } => Boolean(p));
}

export default function WanderlogPage() {
    const posts = getWanderlogPosts();

    return (
        <div className="w-full flex flex-col items-center" style={{ marginTop: '5vh' }}>
            <div className="max-w-2xl w-full flex flex-col gap-6">
                <section id="site-intro" className="flex flex-col gap-4">
                    <h1 className="text-5xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
                        <span>Inside the Wanderlog</span>
                        <img src="/icons/wood-pile.svg" alt="" aria-hidden="true" className="h-12 w-12" />
                    </h1>
                    <p className="text-base leading-7 text-muted-foreground">
                        Hi there, my curious friends! Ready to drill down the rabbit hole of building, reading, and learning?
                        This is my personal log of ideas, drafts, and experiments collected along the way.
                    </p>
                    <footer className="flex items-center gap-4 text-muted-foreground">
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                            className="hover:text-foreground transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M4.984 3.5C4.984 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.484 1.12 2.484 2.5zM.262 8.25H4.74V23.5H.262V8.25zM8.25 8.25h4.33v2.067h.062c.603-1.144 2.077-2.35 4.275-2.35 4.574 0 5.415 3.01 5.415 6.923V23.5h-4.477v-6.68c0-1.594-.028-3.644-2.222-3.644-2.224 0-2.565 1.737-2.565 3.531V23.5H8.25V8.25z" />
                            </svg>
                        </a>
                        <a
                            href="https://sev.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Website"
                            title="Website"
                            className="hover:text-foreground transition-colors"
                        >
                            <img src="/globe.svg" alt="Website" className="h-5 w-5" />
                        </a>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Window"
                            title="Window"
                            className="hover:text-foreground transition-colors"
                        >
                            <img src="/window.svg" alt="Window" className="h-5 w-5" />
                        </a>
                    </footer>
                </section>

                <div className="w-full flex flex-col gap-4">
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
        </div>
    );
}


