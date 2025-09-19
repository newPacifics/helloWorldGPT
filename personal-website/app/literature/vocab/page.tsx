import StickerCard from "../../components/ui/sticker-card";
import PageLayout from "../../components/layout/page-layout";
import { getAllVocabulary } from "../../lib/content";

export default function VocabPage() {
  // Load vocabulary data from Contentlayer
  const vocabulary = getAllVocabulary();

  return (
    <PageLayout
      title="Vocab"
      description="A collection of interesting words, definitions, and linguistic explorations."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vocabulary.map((vocab, index) => (
          <StickerCard 
            key={index} 
            content={vocab.body.raw} 
            date={vocab.date} 
          />
        ))}
      </div>
    </PageLayout>
  );
}
