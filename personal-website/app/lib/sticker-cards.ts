import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface StickerCardMeta {
  date: string;
  tags?: string[];
  slug: string;
}

export interface StickerCardData {
  content: string;
  date: string | Date;
  className?: string;
}

const QUOTES_DIR = path.join(process.cwd(), "app", "content", "quotes");
const VOCABULARY_DIR = path.join(process.cwd(), "app", "content", "vocabulary");

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

// Load sticker cards from a specific directory
function loadStickerCardsFromDir(dir: string): StickerCardMeta[] {
  if (!fs.existsSync(dir)) return [];
  
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  
  const stickerCards = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data } = matter(file);
    
    const slug = filename.replace(/\.mdx$/, "");
    
    return {
      date: data.date ?? new Date().toISOString(),
      tags: data.tags ?? [],
      slug,
    } satisfies StickerCardMeta;
  });
  
  return stickerCards.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

// Get sticker card content by slug and directory
function getStickerCardContent(slug: string, dir: string): string | null {
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  
  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);
  return content.trim();
}

// Transform sticker card meta to component data
function adaptStickerCardMeta(meta: StickerCardMeta, content: string): StickerCardData {
  return {
    content: content,
    date: meta.date,
  };
}

// Public API functions
export function getAllQuotesMeta(): StickerCardMeta[] {
  return loadStickerCardsFromDir(QUOTES_DIR);
}

export function getAllVocabularyMeta(): StickerCardMeta[] {
  return loadStickerCardsFromDir(VOCABULARY_DIR);
}

export function getAllStickerCardsMeta(): StickerCardMeta[] {
  return [...getAllQuotesMeta(), ...getAllVocabularyMeta()].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

export function getQuoteBySlug(slug: string): { meta: StickerCardMeta; content: string } | null {
  const meta = getAllQuotesMeta().find(q => q.slug === slug);
  if (!meta) return null;
  
  const content = getStickerCardContent(slug, QUOTES_DIR);
  if (!content) return null;
  
  return { meta, content };
}

export function getVocabularyBySlug(slug: string): { meta: StickerCardMeta; content: string } | null {
  const meta = getAllVocabularyMeta().find(v => v.slug === slug);
  if (!meta) return null;
  
  const content = getStickerCardContent(slug, VOCABULARY_DIR);
  if (!content) return null;
  
  return { meta, content };
}

// Get all quotes as component data
export function getAllQuotesData(): StickerCardData[] {
  const metas = getAllQuotesMeta();
  
  return metas.map((meta) => {
    const content = getStickerCardContent(meta.slug, QUOTES_DIR) ?? "";
    return adaptStickerCardMeta(meta, content);
  });
}

// Get all vocabulary as component data
export function getAllVocabularyData(): StickerCardData[] {
  const metas = getAllVocabularyMeta();
  
  return metas.map((meta) => {
    const content = getStickerCardContent(meta.slug, VOCABULARY_DIR) ?? "";
    return adaptStickerCardMeta(meta, content);
  });
}

// Get all sticker cards as component data
export function getAllStickerCardsData(): StickerCardData[] {
  return [...getAllQuotesData(), ...getAllVocabularyData()].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

// Get sticker cards by tag
export function getStickerCardsDataByTag(tag: string): StickerCardData[] {
  const allMetas = getAllStickerCardsMeta();
  const filteredMetas = allMetas.filter(meta => meta.tags?.includes(tag));
  
  return filteredMetas.map((meta) => {
    // Determine which directory based on which collection contains the meta
    const isQuote = getAllQuotesMeta().some(q => q.slug === meta.slug);
    const dir = isQuote ? QUOTES_DIR : VOCABULARY_DIR;
    const content = getStickerCardContent(meta.slug, dir) ?? "";
    return adaptStickerCardMeta(meta, content);
  });
}

// Utility function for date formatting (exported for components)
export { formatDateForDisplay };
