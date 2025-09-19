"use client";

import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  sectionId?: string;
  titleAdornment?: ReactNode;
}

/**
 * Standardized page layout component
 * 
 * @param title - The page title
 * @param description - Optional description text shown below the title
 * @param children - Content to be displayed in the page body
 * @param sectionId - Optional ID for the intro section (defaults to "{title.toLowerCase()}-intro")
 * @param titleAdornment - Optional element to display next to the title (e.g., an icon)
 */
export default function PageLayout({
  title,
  description,
  children,
  sectionId,
  titleAdornment
}: PageLayoutProps) {
  const introId = sectionId || `${title.toLowerCase().replace(/\s+/g, '-')}-intro`;
  
  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '5vh' }}>
      <div className="max-w-4xl w-full flex flex-col gap-6">
        <section id={introId} className="flex flex-col gap-4">
          <h1 className="text-5xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <span>{title}</span>
            {titleAdornment}
          </h1>
          {description && (
            <p className="text-base leading-7 text-muted-foreground">
              {description}
            </p>
          )}
        </section>
        
        <div className="w-full flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
