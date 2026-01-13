import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
    image: serviceFullstack,
    title: "Full Stack Development",
    description: "Build modern, scalable web applications from frontend to backend.",
    features: [
      "React & Next.js applications",
      "Node.js & Python backends",
      "RESTful & GraphQL APIs",
      "Database design & optimization",
      "Responsive UI/UX design",
      "E-commerce solutions",
    ],
  },
  {
    image: serviceCloud,
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
    image: serviceIt,
    title: "IT Troubleshooting",
    description: "Expert diagnosis and resolution for all your technical challenges.",
    features: [
      "Hardware diagnostics & repair",
      "Software installation & configuration",
      "Network setup & troubleshooting",
      "System performance optimization",
      "Security audits & fixes",
      "Remote & on-site support",
    ],
  },
  {
    image: serviceQuantum,
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
    image: serviceWorkflow,
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
  {
    image: serviceSecurity,
    title: "Cybersecurity",
    description: "Protect your digital assets with comprehensive security solutions and threat prevention.",
    features: [
      "Threat detection & response",
      "Security audits & penetration testing",
      "Data encryption & protection",
      "Identity & access management",
      "Compliance & risk assessment",
      "Security awareness training",
    ],
  },
  {
    image: serviceAnalytics,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and visualization.",
    features: [
      "Business intelligence dashboards",
      "Predictive analytics",
      "Data warehousing",
      "Real-time reporting",
      "Data visualization",
      "Custom analytics solutions",
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
            <ScrollAnimationWrapper className="max-w-3xl mx-auto text-center">
              <h1 className="section-title mb-6">
                Our <span className="glow-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                From AI development to quantum computing research, we deliver 
                cutting-edge solutions tailored to your needs.
              </p>
            </ScrollAnimationWrapper>
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
                  <ScrollAnimationWrapper 
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={0.1}
                    className={index % 2 === 1 ? 'lg:order-2' : ''}
                  >
                    <div className="flex items-center gap-4 mb-4">
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
                  </ScrollAnimationWrapper>
                  
                  <ScrollAnimationWrapper 
                    direction={index % 2 === 0 ? "right" : "left"}
                    delay={0.2}
                    className={index % 2 === 1 ? 'lg:order-1' : ''}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden glow-box">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollAnimationWrapper>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-6">
            <ScrollAnimationWrapper className="text-center">
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
            </ScrollAnimationWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
