import Postcard from "../components/ui/postcard";
import ProductCard from "../components/ui/product-card";
import { getAllEngineeringPosts } from "../lib/content";
import type { Content } from "../lib/content";

export default function EngineeringPage() {
  const posts = getAllEngineeringPosts();

  // Sample product data - replace with your actual projects
  const products = [
    {
      title: "ConVerge - Your Peronsal AI Resume Tailor",
      description: "that fits your resume to the job you're applying to.",
      image: "/icons/carbon-machine-learning-model.svg", // Replace with actual product images
      href: "https://github.com/your-repo/ai-code-assistant",
      category: "AI Web App"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "A powerful dashboard for monitoring system performance with real-time data visualization and alerts.",
      image: "/icons/computer-electronics.svg", // Replace with actual product images
      href: "https://github.com/your-repo/analytics-dashboard",
      category: "Web App"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '1vh' }}>
      <h1 className="text-6xl font-extrabold mb-2">Engineering</h1>

      {/* Intro Section */}
      <div className="max-w-2xl w-full mb-1 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">Technical Projects & Thoughts</h2>
      </div>

      <div className="max-w-2xl w-full flex flex-col gap-4">
        {/* Product Cards First */}
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            image={product.image}
            href={product.href}
            category={product.category}
          />
        ))}
        
        {/* Post Cards After */}
        {posts.map((post) => (
          <Postcard
            key={post.slug}
            title={post.title}
            content={post.body.raw}
            date={post.date}
            readingTime={post.readingTime}
            href={post.url}
          />
        ))}
      </div>
    </div>
  );
}
