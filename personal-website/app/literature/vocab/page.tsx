export default function VocabPage() {
  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '5vh' }}>
      <div className="max-w-2xl w-full flex flex-col gap-6">
        <section id="vocab-intro" className="flex flex-col gap-4">
          <h1 className="text-5xl sm:text-4xl font-extrabold tracking-tight">
            Vocab
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            A collection of interesting words, definitions, and linguistic explorations.
          </p>
        </section>
        
        <div className="w-full flex flex-col gap-4">
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
