import PageLayout from "../../components/layout/page-layout";

export default function LibraryPage() {
  return (
    <PageLayout
      title="Library"
      description="A curated collection of books, articles, and reading materials worth exploring."
    >
      <div className="grid grid-cols-1 gap-6">
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </PageLayout>
  );
}
