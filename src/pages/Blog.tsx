import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const blogPosts = [
  {
    title: "Understanding Transformer Architecture: A Deep Dive",
    excerpt: "Explore the revolutionary architecture behind modern language models and how transformers changed AI forever.",
    category: "AI Research",
    author: "DistortedNull",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    slug: "understanding-transformers",
  },
  {
    title: "Building Scalable Cloud Infrastructure with Terraform",
    excerpt: "Learn how to design and deploy cloud infrastructure as code for maximum reliability and maintainability.",
    category: "Cloud",
    author: "DistortedNull",
    date: "Dec 28, 2025",
    readTime: "12 min read",
    slug: "terraform-cloud-infrastructure",
  },
  {
    title: "Introduction to Quantum Computing Concepts",
    excerpt: "A beginner-friendly guide to understanding qubits, superposition, and entanglement in quantum computing.",
    category: "Quantum",
    author: "DistortedNull",
    date: "Dec 15, 2025",
    readTime: "10 min read",
    slug: "quantum-computing-intro",
  },
  {
    title: "MLOps Best Practices for Production ML Systems",
    excerpt: "Discover the essential practices for deploying, monitoring, and maintaining machine learning models at scale.",
    category: "MLOps",
    author: "DistortedNull",
    date: "Dec 1, 2025",
    readTime: "15 min read",
    slug: "mlops-best-practices",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="section-title mb-6 opacity-0 animate-fade-in">
                <span className="glow-text">Insights</span> & Articles
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Thoughts on AI, cloud computing, quantum research, and the future of technology.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group p-6 md:p-8 rounded-2xl bg-card border border-border card-hover opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-medium text-primary px-3 py-1 rounded-full bg-primary/10">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <Button variant="ghost" size="sm" className="group/btn">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div className="max-w-4xl mx-auto mt-16">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border text-center">
                <h3 className="font-display font-bold text-xl mb-3">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Get the latest insights on AI, cloud, and quantum computing delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="glow">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
