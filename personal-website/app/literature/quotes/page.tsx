import StickerCard from "../../components/ui/sticker-card";
import PageLayout from "../../components/layout/page-layout";
import { getAllQuotes } from "../../lib/content";

export default function QuotesPage() {
  // Load quote data from Contentlayer
  const quotes = getAllQuotes();

  return (
    <PageLayout
      title="Quotes"
      description="A collection of inspiring quotes, thoughts, and wisdom from various sources."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {quotes.map((quote, index) => (
          <StickerCard 
            key={index} 
            content={quote.body.raw} 
            date={quote.date} 
          />
        ))}
      </div>
    </PageLayout>
  );
}
