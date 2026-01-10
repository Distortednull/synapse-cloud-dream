import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Brain, Cloud, Atom, Workflow } from "lucide-react";

const projects = [
  {
    title: "Neural Network Visualizer",
    description: "Interactive web application for visualizing and understanding neural network architectures and training processes.",
    category: "AI/ML",
    icon: Brain,
    tags: ["TensorFlow.js", "React", "D3.js"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Cloud Orchestration Platform",
    description: "Automated cloud infrastructure management tool with multi-cloud support and intelligent resource allocation.",
    category: "Cloud",
    icon: Cloud,
    tags: ["Kubernetes", "Terraform", "Go"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Quantum Circuit Simulator",
    description: "Browser-based quantum computing simulator for designing and testing quantum circuits with visual feedback.",
    category: "Quantum",
    icon: Atom,
    tags: ["Qiskit", "Python", "WebAssembly"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "MLOps Pipeline Framework",
    description: "End-to-end machine learning operations framework for automated model training, deployment, and monitoring.",
    category: "Workflow",
    icon: Workflow,
    tags: ["MLflow", "Docker", "FastAPI"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "AI-Powered Code Assistant",
    description: "Intelligent code completion and generation tool using large language models for enhanced developer productivity.",
    category: "AI/ML",
    icon: Brain,
    tags: ["PyTorch", "Transformers", "VS Code"],
    links: {
      github: "#",
    },
  },
  {
    title: "Serverless Data Pipeline",
    description: "Event-driven data processing pipeline with automatic scaling and real-time analytics capabilities.",
    category: "Cloud",
    icon: Cloud,
    tags: ["AWS Lambda", "Apache Kafka", "Python"],
    links: {
      github: "#",
    },
  },
];

const Projects = () => {
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
                Explore our portfolio of AI, cloud, and quantum computing projects. 
                Each one pushes the boundaries of what's possible.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="group p-6 rounded-2xl bg-card border border-border card-hover opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <project.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-secondary">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    {project.links.demo && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
