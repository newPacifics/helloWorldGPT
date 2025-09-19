import Postcard from "../components/ui/postcard";
import PageLayout from "../components/layout/page-layout";
import { getAllWanderlogPosts } from "../lib/content";
import type { Content } from "../lib/content";

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

export default function WanderlogPage() {
    const posts = getAllWanderlogPosts();

    const titleAdornment = (
        <img src="/icons/wood-pile.svg" alt="" aria-hidden="true" className="h-12 w-12" />
    );

    const socialLinks = (
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
    );

    return (
        <PageLayout
            title="Inside the Wanderlog"
            description="Hi there, my curious friends! Ready to slide down into the rabbit hole of building, reading, and learning? This is my personal log of ideas, drafts, and experiments collected along the way."
            titleAdornment={titleAdornment}
            sectionId="wanderlog-intro"
        >
            {socialLinks}
            
            <div className="grid grid-cols-1 gap-6 mt-2">
                {posts.map((post) => (
                    <Postcard
                        key={post.slug}
                        title={post.title}
                        content={post.body.raw}
                        date={post.date}
                        readingTime={post.readingTime}
                        href={post.url}
                    />
                ))}
            </div>
        </PageLayout>
    );
}


