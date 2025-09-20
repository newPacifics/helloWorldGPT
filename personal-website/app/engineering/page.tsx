import Postcard from "../components/ui/postcard";
import ProductCard from "../components/ui/product-card";
import PageLayout from "../components/layout/page-layout";
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
    // {
    //   title: "Real-time Analytics Dashboard",
    //   description: "A powerful dashboard for monitoring system performance with real-time data visualization and alerts.",
    //   image: "/icons/computer-electronics.svg", // Replace with actual product images
    //   href: "https://github.com/your-repo/analytics-dashboard",
    //   category: "Web App"
    // }
  ];

  return (
    <PageLayout
      title="Engineering"
      description="Technical projects and thoughts on software development, AI, and technology."
    >
      {/* Product Cards First */}
      <div className="grid grid-cols-1 gap-6">
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
      </div>
      
      {/* Post Cards After */}
      <div className="grid grid-cols-1 gap-6">
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
    </PageLayout>
  );
}
