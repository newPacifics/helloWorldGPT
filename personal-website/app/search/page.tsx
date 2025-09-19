import PageLayout from "../components/layout/page-layout";

export default function SearchPage() {
  return (
    <PageLayout
      title="Search"
      description="Find content across the site by keyword, topic, or category."
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for content..."
              className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-3">
              <img 
                src="/icons/streamline-ultimate--network-search.svg" 
                alt="Search" 
                className="h-5 w-5" 
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Search functionality coming soon...
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
