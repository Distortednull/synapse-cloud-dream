import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Send, 
  Github, 
  Twitter, 
  Youtube, 
  Linkedin,
  Instagram,
  MapPin
} from "lucide-react";

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter/X", icon: Twitter, href: "https://x.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "Thanks for reaching out. We'll get back to you within 24-48 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="section-title mb-6 opacity-0 animate-fade-in">
                Get in <span className="glow-text">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Have a project in mind? Want to collaborate? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Email */}
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Email Us
                    </h3>
                    <a
                      href="mailto:distortednull@gmail.com"
                      className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span>distortednull@gmail.com</span>
                    </a>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Location
                    </h3>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <span>Working Globally, Remote-First</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Connect With Us
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {socials.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                          aria-label={social.name}
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Fun Quote */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
                    <p className="text-sm text-muted-foreground italic">
                      "We fix servers faster than we fix our sleep schedules. But we'll always make time to chat about your next big idea." 
                      <span className="block mt-3 text-primary font-medium not-italic">— The Team</span>
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                      Send us a message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                            Your Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            required
                            className="bg-background border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm text-muted-foreground mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          type="text"
                          name="subject"
                          placeholder="What's this about?"
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your project, idea, or question..."
                          required
                          rows={6}
                          className="bg-background border-border resize-none"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        variant="glow" 
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
