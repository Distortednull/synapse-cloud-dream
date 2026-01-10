import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Server, Cpu, Rocket, Users, Heart } from "lucide-react";

const values = [
  {
    icon: Rocket,
    title: "Innovation",
    description: "We constantly explore new technologies and push boundaries to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in open-source and community-driven development to accelerate progress.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Every project is fueled by genuine curiosity and love for technology.",
  },
];

const expertise = [
  { icon: Code, label: "AI/ML Development" },
  { icon: Server, label: "Cloud Architecture" },
  { icon: Cpu, label: "Quantum Computing" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="section-title mb-6 opacity-0 animate-fade-in">
                About <span className="glow-text">DistortedNull</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                We're on a mission to advance AI, cloud automation, and quantum computing 
                to solve complex problems and shape the future of technology.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground mb-6">
                  At DistortedNull, we believe technology should be accessible, powerful, and 
                  forward-thinking. We specialize in building AI-driven applications, designing 
                  cloud-native infrastructure, and exploring the frontiers of quantum computing.
                </p>
                <p className="text-muted-foreground mb-8">
                  Whether it's training custom machine learning models, orchestrating complex 
                  cloud deployments, or experimenting with quantum algorithms, we're always 
                  pushing to discover what's next.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {expertise.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-1">
                  <div className="w-full h-full rounded-xl bg-card border border-border flex items-center justify-center">
                    <p className="text-muted-foreground text-center px-8">
                      <span className="text-2xl">🚀</span>
                      <br />
                      <span className="text-sm mt-4 block">
                        "We fix servers faster than we fix our sleep schedules."
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center p-6 rounded-2xl bg-card border border-border card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's collaborate on your next project and push the boundaries of technology together.
            </p>
            <Button variant="glow" size="lg" asChild>
              <Link to="/contact">
                Get in Touch
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

export default About;
