import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fallback to static data if no database projects
import { projects as staticProjects } from "@/data/projects";

const Projects = () => {
  const { data: dbProjects = [], isLoading } = useQuery({
    queryKey: ["public-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Use database projects if available, otherwise fall back to static
  const projects = dbProjects.length > 0 ? dbProjects.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    image: p.image_url || "/placeholder.svg",
    tags: p.tags || [],
    links: {
      demo: p.demo_link,
      github: p.github_link,
    },
  })) : staticProjects;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="section-title mb-6 opacity-0 animate-fade-in">
                Our <span className="glow-text">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Explore our portfolio of web development, AI, cloud, and quantum computing projects. 
                Each one pushes the boundaries of what's possible.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="text-center text-muted-foreground">Loading projects...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project: any, index: number) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="group block"
                  >
                    <div
                      className="rounded-2xl bg-card border border-border card-hover overflow-hidden opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Project Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-xs text-primary-foreground px-2 py-1 rounded-md bg-primary">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                          {project.links?.demo && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(project.links.demo, '_blank');
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Demo
                            </Button>
                          )}
                          {project.links?.github && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(project.links.github, '_blank');
                              }}
                            >
                              <Github className="w-4 h-4 mr-1" />
                              Code
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* More Projects CTA */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Want to See More?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Check out our GitHub for more open-source projects and contributions.
            </p>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
