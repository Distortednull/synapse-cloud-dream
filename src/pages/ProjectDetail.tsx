import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, FolderKanban } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Try fetching from database first
  const { data: dbProject, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      return data;
    },
  });

  // Fall back to static data
  const staticProject = getProjectById(id || "");
  
  const project = dbProject ? {
    ...dbProject,
    image: dbProject.image_url || "/placeholder.svg",
    fullDescription: dbProject.full_description || dbProject.description,
    techStack: dbProject.tech_stack || [],
    features: dbProject.features || [],
    links: { demo: dbProject.demo_link, github: dbProject.github_link },
    icon: FolderKanban,
  } : staticProject;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = project.icon || FolderKanban;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="relative rounded-2xl overflow-hidden border border-border aspect-video animate-fade-in">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-primary-foreground px-3 py-1 rounded-full bg-primary">{project.category}</span>
                </div>
              </div>

              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{project.title}</h1>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{project.fullDescription}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-sm px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{tag}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {project.links?.demo && (
                    <Button variant="glow" asChild>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />Live Demo
                      </a>
                    </Button>
                  )}
                  {project.links?.github && (
                    <Button variant="outline" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {Array.isArray(project.techStack) && project.techStack.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-display font-bold mb-8">Tech Stack</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(project.techStack as Array<{ name: string; description: string }>).map((tech, index: number) => (
                  <div key={tech.name || index} className="p-4 rounded-xl bg-card border border-border card-hover">
                    <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {project.features?.length > 0 && (
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-display font-bold mb-8">Key Features</h2>
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Interested in a Similar Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Let's discuss how we can build something amazing together.</p>
            <Button variant="glow" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
