import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ui/ScrollAnimationWrapper';
import { Briefcase, Users, Calendar, Code2 } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  duration: number;
}

const stats: Stat[] = [
  { icon: Briefcase, value: 150, suffix: '+', label: 'Projects Completed', duration: 2000 },
  { icon: Users, value: 80, suffix: '+', label: 'Happy Clients', duration: 1800 },
  { icon: Calendar, value: 12, suffix: '+', label: 'Years Experience', duration: 1500 },
  { icon: Code2, value: 2, suffix: 'M+', label: 'Lines of Code', duration: 2200 },
];

function AnimatedCounter({ stat, delay }: { stat: Stat; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = stat.icon;

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay;
    const endTime = startTime + stat.duration;

    const updateCount = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }
      
      const progress = Math.min((now - startTime) / stat.duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * stat.value));

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, stat.value, stat.duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-glow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-glow/20 mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        
        <div className="text-5xl md:text-6xl font-display font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-glow">
            {count}
          </span>
          <span className="text-primary">{stat.suffix}</span>
        </div>
        
        <p className="text-muted-foreground text-lg">{stat.label}</p>
        
        {/* Decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-glow group-hover:w-1/2 transition-all duration-500 rounded-full" />
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Numbers That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-glow">Speak</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A track record of excellence and innovation in technology solutions
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedCounter key={stat.label} stat={stat} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}
