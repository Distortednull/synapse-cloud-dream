import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Lightbulb } from "lucide-react";
import { ScrollAnimationWrapper } from "@/components/ui/ScrollAnimationWrapper";
import { TechSlideshow } from "./TechSlideshow";

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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/20 p-2 glow-box">
                <div className="w-full h-full rounded-xl border border-border/50 overflow-hidden">
                  <TechSlideshow />
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
