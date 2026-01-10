import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Cloud, 
  Atom, 
  Workflow,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Transform your business with intelligent systems that learn, adapt, and deliver insights.",
    features: [
      "Custom AI model development",
      "Machine learning pipeline design",
      "AI-powered web applications",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive analytics",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Build resilient, scalable cloud architecture that grows with your needs.",
    features: [
      "DevOps automation & CI/CD",
      "Cloud orchestration (AWS, GCP, Azure)",
      "Serverless architecture design",
      "Container orchestration (K8s)",
      "Infrastructure as Code",
      "Performance optimization",
    ],
  },
  {
    icon: Atom,
    title: "Quantum Computing",
    description: "Explore the next frontier of computing with quantum algorithms and research.",
    features: [
      "Quantum algorithm development",
      "Quantum simulation",
      "Research collaborations",
      "Hybrid classical-quantum systems",
      "Quantum optimization problems",
      "Educational workshops",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Optimization",
    description: "Streamline operations with intelligent automation and monitoring.",
    features: [
      "Open-source tool integration",
      "Performance monitoring systems",
      "Process automation",
      "MLOps implementation",
      "Data pipeline design",
      "Custom tooling development",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="section-title mb-6 opacity-0 animate-fade-in">
                Our <span className="glow-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                From AI development to quantum computing research, we deliver 
                cutting-edge solutions tailored to your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 p-1 glow-box">
                      <div className="w-full h-full rounded-xl bg-card/80 border border-border/50 flex items-center justify-center">
                        <service.icon className="w-24 h-24 text-primary/20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss your project requirements and build something extraordinary together.
            </p>
            <Button variant="glow" size="lg" asChild>
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
