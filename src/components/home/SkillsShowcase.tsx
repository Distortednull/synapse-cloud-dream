import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ui/ScrollAnimationWrapper';

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend', color: 'from-cyan-400 to-blue-500' },
  { name: 'TypeScript', level: 92, category: 'Frontend', color: 'from-blue-400 to-indigo-500' },
  { name: 'Python / ML', level: 90, category: 'AI/ML', color: 'from-green-400 to-emerald-500' },
  { name: 'TensorFlow / PyTorch', level: 88, category: 'AI/ML', color: 'from-orange-400 to-red-500' },
  { name: 'AWS / Azure', level: 93, category: 'Cloud', color: 'from-yellow-400 to-orange-500' },
  { name: 'Docker / Kubernetes', level: 89, category: 'Cloud', color: 'from-purple-400 to-pink-500' },
  { name: 'Node.js / Express', level: 91, category: 'Backend', color: 'from-lime-400 to-green-500' },
  { name: 'PostgreSQL / MongoDB', level: 87, category: 'Backend', color: 'from-teal-400 to-cyan-500' },
];

function AnimatedProgress({ skill, delay }: { skill: Skill; delay: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, delay * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.level, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-muted-foreground text-sm">
          {progress}%
        </span>
      </div>
      <div className="h-3 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay * 0.1 }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-sm" />
        </motion.div>
      </div>
    </div>
  );
}

export function SkillsShowcase() {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-glow">Proficiency</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Mastering cutting-edge technologies to deliver exceptional solutions
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {categories.map((category, catIndex) => (
            <ScrollAnimationWrapper key={category} delay={catIndex * 0.1}>
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-display font-semibold mb-6 text-primary">
                  {category}
                </h3>
                <div className="space-y-6">
                  {skills
                    .filter(s => s.category === category)
                    .map((skill, index) => (
                      <AnimatedProgress
                        key={skill.name}
                        skill={skill}
                        delay={catIndex * 2 + index}
                      />
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
