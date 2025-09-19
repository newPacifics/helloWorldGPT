import React from "react";

export interface StickerCardProps {
  content: string; // Raw content string
  date: string | Date;
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
  return new Date(dateInput).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function StickerCard({
  content,
  date,
  className,
}: StickerCardProps) {
  // Split content by newlines to handle multi-line content
  const contentLines = content.split('\n').filter(line => line.trim() !== '');

  const containerClasses = [
    "group rounded-xl border bg-card text-card-foreground border-border",
    "shadow-sm transition-all duration-200",
    "hover:shadow-md hover:bg-muted/30",
    "w-full max-w-sm", // Half width constraint for side-by-side layout
    "p-4", // Fixed padding
  ]
    .concat(className ? [className] : [])
    .join(" ");

  return (
    <article className={containerClasses} aria-label="Content card">
      {/* Content */}
      <div className="mb-4">
        {contentLines.length > 1 ? (
          <div className="space-y-1">
            {contentLines.map((line, index) => (
              <div
                key={index}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        )}
      </div>

      {/* Footer with DateTime */}
      <footer className="flex items-center justify-between pt-2 border-t border-border/50">
        <time 
          dateTime={date instanceof Date ? date.toISOString() : new Date(date).toISOString()}
          className="text-xs text-muted-foreground"
        >
          {formatDateForDisplay(date)}
        </time>
        
        {/* Optional status indicator */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
        </div>
      </footer>
    </article>
  );
}
