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
    "group rounded-xl border bg-gray-50/80 dark:bg-neutral-900/70",
    "border-gray-200 dark:border-neutral-800",
    "p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md",
    "text-gray-800 dark:text-gray-100",
  ]
    .concat(className ? [className] : [])
    .join(" ");

  const titleNode = href ? (
    <Link href={href} className="no-underline">
      <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50 group-hover:underline">
        {title}
      </h3>
    </Link>
  ) : (
    <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">{title}</h3>
  );

  return (
    <article className={containerClasses} aria-label={title}>
      <header className="mb-2">{titleNode}</header>

      <p
        className="text-sm leading-6 text-gray-700 dark:text-gray-300"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as any,
          overflow: "hidden",
        }}
      >
        {preview}
      </p>

      <footer className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <time dateTime={
          date instanceof Date ? date.toISOString() : new Date(date).toISOString()
        }>
          {formatDateForDisplay(date)}
        </time>
        <span aria-hidden>•</span>
        <span>{typeof readingTime === "number" ? `${readingTime} min read` : readingTime}</span>
      </footer>
    </article>
  );
}


