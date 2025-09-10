import React from "react";
import Link from "next/link";

export interface PostcardProps {
  title: string;
  preview: string;
  date: string | Date;
  readingTime: string | number;
  href?: string;
  className?: string;
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
  date,
  readingTime,
  href,
  className,
}: PostcardProps) {
  const containerClasses = [
    "group rounded-xl border bg-card text-card-foreground border-border",
    "p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md hover:bg-muted/60",
  ]
    .concat(href ? ["cursor-pointer"] : [])
    .concat(className ? [className] : [])
    .join(" ");

  const titleNode = (
    <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
  );
  
  const footerNode = (
  <footer className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
    <time dateTime={date instanceof Date ? date.toISOString() : new Date(date).toISOString()}>
      {formatDateForDisplay(date)}
    </time>
    <span aria-hidden>•</span>
    <span>{typeof readingTime === "number" ? `${readingTime} min read` : readingTime}</span>
  </footer>);

  const CardInner = (
    <article className={containerClasses} aria-label={title}>
      <header className="mb-2">{titleNode}</header>

      <p
        className="text-sm leading-6 text-muted-foreground"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as any,
          overflow: "hidden",
        }}
      >
        {preview}
      </p>

      {footerNode}
    </article>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`Open ${title}`} className="block no-underline">
        {CardInner}
      </Link>
    );
  }

  return CardInner;
}


