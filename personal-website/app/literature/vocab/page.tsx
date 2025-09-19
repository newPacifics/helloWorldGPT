import StickerCard from "../../components/ui/sticker-card";
import { getAllVocabulary } from "../../lib/content";

export default function VocabPage() {
  // Load vocabulary data from Contentlayer
  const vocabulary = getAllVocabulary();

  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '5vh' }}>
      <div className="max-w-4xl w-full flex flex-col gap-6">
        <section id="vocab-intro" className="flex flex-col gap-4">
          <h1 className="text-5xl sm:text-4xl font-extrabold tracking-tight">
            Vocab
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            A collection of interesting words, definitions, and linguistic explorations.
          </p>
        </section>
        
        <div className="w-full flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vocabulary.map((vocab, index) => (
              <StickerCard 
                key={index} 
                content={vocab.body.raw} 
                date={vocab.date} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
