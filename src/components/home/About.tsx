import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Lightbulb } from "lucide-react";
import { ScrollAnimationWrapper } from "@/components/ui/ScrollAnimationWrapper";

const highlights = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Advancing AI and quantum computing to solve complex real-world problems.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "Pushing the boundaries of what's possible with cutting-edge technology.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "We fix servers faster than we fix our sleep schedules.",
  },
];

export function About() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimationWrapper direction="left">
            <div>
              <h2 className="section-title mb-6">
                Advancing <span className="glow-text">Technology</span> for Tomorrow
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We're a team passionate about pushing the limits of artificial intelligence, 
                cloud infrastructure, and quantum computing. Our mission is to make complex 
                technology accessible and impactful.
              </p>
              
              <div className="space-y-6 mb-8">
                {highlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="glow" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>

          {/* Visual */}
          <ScrollAnimationWrapper direction="right" delay={0.2}>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/20 p-8 glow-box">
                <div className="w-full h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur flex items-center justify-center overflow-hidden">
                {/* Abstract Tech Visualization */}
                <div className="relative w-full h-full">
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-primary/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-accent/20 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border border-primary/10 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
                  </div>
                  
                  {/* Center element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                      <span className="font-display font-bold text-primary-foreground text-2xl">DN</span>
                    </div>
                  </div>

                  {/* Floating nodes */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary animate-float" />
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-accent animate-float" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '2s' }} />
                  <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-accent/50 animate-float" style={{ animationDelay: '0.5s' }} />
                </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
