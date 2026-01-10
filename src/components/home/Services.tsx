import { Brain, Cloud, Atom, Workflow } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Custom AI models, ML pipelines, and AI-driven web applications that learn and adapt.",
    features: ["Custom Models", "ML Pipelines", "AI Web Apps"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "DevOps automation, cloud orchestration, and serverless solutions for scalable systems.",
    features: ["DevOps", "Cloud Native", "Serverless"],
  },
  {
    icon: Atom,
    title: "Quantum Computing",
    description: "Quantum algorithms, simulations, and research collaborations pushing computational limits.",
    features: ["Quantum Algorithms", "Simulations", "Research"],
  },
  {
    icon: Workflow,
    title: "Workflow Optimization",
    description: "Open-source tool integration, performance monitoring, and intelligent automation.",
    features: ["Automation", "Monitoring", "Integration"],
  },
];

export function Services() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            What We <span className="glow-text">Do</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From artificial intelligence to quantum computing, we deliver cutting-edge solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl bg-card border border-border card-hover gradient-border opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
