import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter/X", icon: Twitter, href: "https://x.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Let's <span className="glow-text">Connect</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Have a project in mind? Want to collaborate? Drop us a message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                  Get in Touch
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

              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
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

              <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-border">
                <p className="text-sm text-muted-foreground italic">
                  "We fix servers faster than we fix our sleep schedules." 
                  <span className="block mt-2 text-primary font-medium">— The Team</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-card border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="bg-card border-border"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="bg-card border-border"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="bg-card border-border resize-none"
                />
              </div>
              <Button 
                type="submit" 
                variant="glow" 
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
    </section>
  );
}
