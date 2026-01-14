import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { SkillsShowcase } from "@/components/home/SkillsShowcase";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FAQ } from "@/components/home/FAQ";
import { Contact } from "@/components/home/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <SkillsShowcase />
        <StatsCounter />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
