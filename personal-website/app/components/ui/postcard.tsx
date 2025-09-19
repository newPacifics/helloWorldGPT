import React from "react";
import Link from "next/link";

export interface PostcardProps {
  title?: string;           // Optional title - if empty, just skip it
  preview?: string;         // Optional preview text
  content?: string;         // Full MDX content (used to generate preview if preview not provided)
  date: string | Date;
  readingTime: string | number;
  href?: string;
  className?: string;
}


// Helper function to create a two-line preview from content
function buildTwoLinePreviewFromContent(content: string, maxWords = 40, maxChars = 220): string {
  // Strip markdown syntax for preview
  let text = content.replace(/```[\s\S]*?```/g, " "); // remove code fences
  text = text.replace(/`[^`]*`/g, " "); // remove inline code
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, " "); // remove images
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"); // links -> text
  text = text.replace(/^#{1,6}\s+/gm, ""); // remove headings
  text = text.replace(/^>\s?/gm, ""); // remove blockquotes
  text = text.replace(/[\*_~#>]/g, ""); // remove emphasis markers
  text = text.replace(/<[^>]+>/g, " "); // remove HTML tags
  text = text.replace(/\s+/g, " ").trim(); // collapse whitespace
  
  const words = text.split(/\s+/);
  let result = "";
  for (let i = 0; i < words.length && i < maxWords; i++) {
    const next = result ? result + " " + words[i] : words[i];
    if (next.length > maxChars) break;
    result = next;
  }
  return result || words.slice(0, Math.min(words.length, maxWords)).join(" ");
}

function formatDateForDisplay(dateInput: string | Date): string {
  if (dateInput instanceof Date) {
    return dateInput.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return dateInput;
}

export default function Postcard({
  title,
  preview,
  content,
  date,
  readingTime,
  href,
  className,
}: PostcardProps) {
  // Generate preview from content if not provided
  const displayPreview = preview || (content ? buildTwoLinePreviewFromContent(content) : '');
  
  const containerClasses = [
    "group rounded-xl border bg-card text-card-foreground border-border",
    "p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md hover:bg-muted/60",
  ]
    .concat(href ? ["cursor-pointer"] : [])
    .concat(className ? [className] : [])
    .join(" ");

  const footerNode = (
    <footer className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
      <time dateTime={date instanceof Date ? date.toISOString() : new Date(date).toISOString()}>
        {formatDateForDisplay(date)}
      </time>
      <span aria-hidden>•</span>
      <span>{typeof readingTime === "number" ? `${readingTime} min read` : readingTime}</span>
    </footer>
  );

  const CardInner = (
    <article className={containerClasses} aria-label={title}>
      {/* Render title only if it exists and is not empty */}
      {title && title.trim() && (
        <header className="mb-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        </header>
      )}

      {/* Always render preview if available */}
      {displayPreview && (
        <p
          className="text-sm leading-6 text-muted-foreground"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as any,
            overflow: "hidden",
          }}
        >
          {displayPreview}
        </p>
      )}

      {footerNode}
    </article>
  );

  if (href) {
    return (
      <Link href={href} aria-label={title ? `Open ${title}` : 'Open content'} className="block no-underline">
        {CardInner}
      </Link>
    );
  }

  return CardInner;
}


