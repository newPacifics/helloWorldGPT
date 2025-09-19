import StickerCard from "../../components/ui/sticker-card";
import { getAllQuotes } from "../../lib/content";

export default function QuotesPage() {
  // Load quote data from Contentlayer
  const quotes = getAllQuotes();

  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '5vh' }}>
      <div className="max-w-4xl w-full flex flex-col gap-6">
        <section id="quotes-intro" className="flex flex-col gap-4">
          <h1 className="text-5xl sm:text-4xl font-extrabold tracking-tight">
            Quotes
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            A collection of inspiring quotes, thoughts, and wisdom from various sources.
          </p>
        </section>
        
        <div className="w-full flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {quotes.map((quote, index) => (
              <StickerCard 
                key={index} 
                content={quote.body.raw} 
                date={quote.date} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
