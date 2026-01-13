import { ScrollAnimationWrapper } from "@/components/ui/ScrollAnimationWrapper";

import serviceAi from "@/assets/service-ai.jpg";
import serviceFullstack from "@/assets/service-fullstack.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceIt from "@/assets/service-it.jpg";
import serviceQuantum from "@/assets/service-quantum.jpg";
import serviceWorkflow from "@/assets/service-workflow.jpg";
import serviceSecurity from "@/assets/service-security.jpg";
import serviceAnalytics from "@/assets/service-analytics.jpg";

const services = [
  {
    image: serviceAi,
    title: "AI & ML Solutions",
    description: "Custom AI models, ML pipelines, and AI-driven web applications that learn and adapt.",
    features: ["Custom Models", "ML Pipelines", "AI Web Apps"],
  },
  {
    image: serviceFullstack,
    title: "Full Stack Development",
    description: "End-to-end web applications with modern frameworks, APIs, and responsive designs.",
    features: ["React/Next.js", "Node.js", "Databases"],
  },
  {
    image: serviceCloud,
    title: "Cloud Infrastructure",
    description: "DevOps automation, cloud orchestration, and serverless solutions for scalable systems.",
    features: ["DevOps", "Cloud Native", "Serverless"],
  },
  {
    image: serviceIt,
    title: "IT Troubleshooting",
    description: "Expert diagnosis and resolution of hardware, software, and network issues.",
    features: ["Diagnostics", "System Repair", "Network"],
  },
  {
    image: serviceQuantum,
    title: "Quantum Computing",
    description: "Quantum algorithms, simulations, and research collaborations pushing computational limits.",
    features: ["Quantum Algorithms", "Simulations", "Research"],
  },
  {
    image: serviceWorkflow,
    title: "Workflow Optimization",
    description: "Open-source tool integration, performance monitoring, and intelligent automation.",
    features: ["Automation", "Monitoring", "Integration"],
  },
  {
    image: serviceSecurity,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your data, networks, and digital assets.",
    features: ["Threat Detection", "Encryption", "Audits"],
  },
  {
    image: serviceAnalytics,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and visualization.",
    features: ["BI Dashboards", "Predictive", "Reporting"],
  },
];

export function Services() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper className="text-center mb-16">
          <h2 className="section-title mb-4">
            What We <span className="glow-text">Do</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From artificial intelligence to quantum computing, we deliver cutting-edge solutions.
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ScrollAnimationWrapper
              key={service.title}
              delay={index * 0.1}
            >
              <div className="group h-full p-6 rounded-2xl bg-card border border-border card-hover gradient-border">
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
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
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
