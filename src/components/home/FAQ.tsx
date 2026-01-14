import { ScrollAnimationWrapper } from '@/components/ui/ScrollAnimationWrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What services does Black Delta Technologies offer?",
    answer: "We offer a comprehensive suite of technology services including AI/ML development, cloud architecture and migration, full-stack web development, IT support and infrastructure management, quantum computing research, workflow automation, cybersecurity solutions, and data analytics."
  },
  {
    question: "How long does a typical project take to complete?",
    answer: "Project timelines vary based on scope and complexity. A simple web application might take 4-6 weeks, while enterprise-level solutions with AI integration could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we provide comprehensive post-launch support and maintenance packages. This includes 24/7 monitoring, regular security updates, performance optimization, bug fixes, and feature enhancements. We offer flexible SLA options to match your business needs."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We work across various industries including healthcare, finance, e-commerce, manufacturing, education, and government sectors. Our team has deep expertise in building compliant solutions for regulated industries like HIPAA for healthcare and PCI-DSS for financial services."
  },
  {
    question: "How do you ensure project security and data privacy?",
    answer: "Security is built into every stage of our development process. We follow industry best practices including encrypted communications, secure coding standards, regular security audits, penetration testing, and compliance with GDPR, SOC 2, and other relevant regulations."
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price projects, time and materials, and dedicated team arrangements. During our discovery phase, we'll understand your requirements and recommend the most cost-effective approach for your specific needs."
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Absolutely. We specialize in seamless integrations with existing enterprise systems, CRMs, ERPs, databases, and third-party APIs. Our team conducts thorough technical assessments to ensure smooth integration without disrupting your current operations."
  },
  {
    question: "How do we get started with a project?",
    answer: "Simply reach out through our contact form or schedule a free consultation. We'll discuss your vision, requirements, and goals. After the initial discovery phase, we provide a detailed proposal including scope, timeline, and investment. Once approved, we kick off with a dedicated project team."
  },
];

export function FAQ() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-glow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-glow">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Find answers to common questions about our services, process, and expertise
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors py-5 font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-glow text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
