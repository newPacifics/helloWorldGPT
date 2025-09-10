import React from "react";
import Link from "next/link";

export interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string;
  className?: string;
}

export default function ProductCard({
  title,
  description,
  image,
  href,
  category,
  className,
}: ProductCardProps) {
  const containerClasses = [
    "group relative overflow-hidden rounded-2xl",
    "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900",
    "shadow-2xl transition-all duration-500 ease-out",
    "hover:scale-[1.02] hover:shadow-3xl hover:shadow-blue-500/25",
    "cursor-pointer border border-slate-700/50",
  ]
    .concat(className ? [className] : [])
    .join(" ");

  const CardInner = (
    <div className={containerClasses}>
      {/* Background Image with Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-blue-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative p-6">
        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
          {title}
        </h3>
        
        <p className="mb-4 text-sm leading-relaxed text-slate-300 line-clamp-2">
          {description}
        </p>

        {/* CTA Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
            View Project →
          </span>
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
            <svg
              className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );

  return (
    <Link href={href} aria-label={`View ${title}`} className="block no-underline">
      {CardInner}
    </Link>
  );
}

