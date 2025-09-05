import Postcard from "../components/ui/postcard";
import { getPostsBySlugs } from "../lib/posts";

function getSevlogPosts() {
  const slugs = ["sevlog-sample1", "sevlog2", "sevloggggg3", "sevlog-test4"]; // explicit assignment
  return getPostsBySlugs(slugs);
}

export default function SevlogPage() {
  const posts = getSevlogPosts();

  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '10vh' }}>
      <h1 className="text-6xl font-extrabold mb-8">Sev'Log</h1>

      <div className="max-w-2xl w-full flex flex-col gap-4">
        {posts.map((post) => (
          <Postcard
            key={post.slug}
            title={post.title}
            preview={post.description ?? ""}
            date={post.date}
            readingTime={post.readingTime}
            href={`/posts/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
}


