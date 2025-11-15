import { allContents } from '../../.contentlayer/generated'
import type { Content } from '../../.contentlayer/generated'

// Re-export types for convenience
export type { Content }

// All Content
export function getAllContent(): Content[] {
  return allContents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getContentBySlug(slug: string): Content | undefined {
  return allContents.find((content) => content.slug === slug)
}

export function getContentByCategory(category: string): Content[] {
  return allContents.filter((content) => content.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getContentByTag(tag: string): Content[] {
  return allContents.filter((content) => content.tags?.includes(tag))
}

export function getPostsByTag(tag: string): Content[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag))
}

export function getPublishedContent(): Content[] {
  return allContents.filter((content) => content.status === 'published')
}

// Category-specific helpers (for backward compatibility)
export function getAllPosts(): Content[] {
  // Get all posts from the main posts directory and subdirectories
  return allContents.filter(content => 
    content.slug.startsWith('posts/') || 
    content.slug.startsWith('posts/engineering/') || 
    content.slug.startsWith('posts/wanderlog/')
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Content | undefined {
  // Try to find the post in any of the possible locations
  return allContents.find(content => {
    // Direct match
    if (content.slug === `posts/${slug}`) return true;
    // Match in engineering subfolder
    if (content.slug === `posts/engineering/${slug}`) return true;
    // Match in wanderlog subfolder
    if (content.slug === `posts/wanderlog/${slug}`) return true;
    // Legacy match (endsWith)
    return content.slug.endsWith(slug);
  })
}

// New helper functions for engineering and wanderlog posts
export function getAllEngineeringPosts(): Content[] {
  return allContents
    .filter(content => content.slug.startsWith('posts/engineering/'))
    .filter(content => content.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllWanderlogPosts(): Content[] {
  return allContents
    .filter(content => content.slug.startsWith('posts/wanderlog/'))
    .filter(content => content.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllQuotes(): Content[] {
  return getContentByCategory('quotes').filter(content => content.status === 'published')
}

export function getAllVocabulary(): Content[] {
  return getContentByCategory('vocabulary').filter(content => content.status === 'published')
}

export function getQuoteBySlug(slug: string): Content | undefined {
  return allContents.find((content) => content.category === 'quotes' && content.slug.endsWith(slug))
}

export function getVocabularyBySlug(slug: string): Content | undefined {
  return allContents.find((content) => content.category === 'vocabulary' && content.slug.endsWith(slug))
}

// Combined content (for sticker cards) - quotes + vocabulary
export function getAllStickerCards(): Content[] {
  return allContents.filter((content) => 
    content.category === 'quotes' || content.category === 'vocabulary'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPublishedStickerCards(): Content[] {
  return getAllStickerCards().filter((item) => item.status === 'published')
}

export function getStickerCardsByTag(tag: string): Content[] {
  return getAllStickerCards().filter((item) => item.tags?.includes(tag))
}

// Utility functions
export function formatDateForDisplay(dateInput: string | Date): string {
  if (dateInput instanceof Date) {
    return dateInput.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  return new Date(dateInput).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Search functionality
export function searchContent(query: string): Content[] {
  const lowercaseQuery = query.toLowerCase()
  
  return allContents.filter((item) => {
    const tags = item.tags?.join(' ').toLowerCase() || ''
    const body = item.body.raw.toLowerCase()
    const category = item.category.toLowerCase()
    
    return tags.includes(lowercaseQuery) ||
           body.includes(lowercaseQuery) ||
           category.includes(lowercaseQuery)
  })
}
