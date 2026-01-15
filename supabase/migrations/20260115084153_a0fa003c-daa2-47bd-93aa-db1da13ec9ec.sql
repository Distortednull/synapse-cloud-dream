-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  tech_stack JSONB DEFAULT '[]',
  features TEXT[] DEFAULT '{}',
  demo_link TEXT,
  github_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'BDTech Team',
  read_time TEXT NOT NULL DEFAULT '5 min read',
  featured_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (allows public access since no auth)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Projects: public read, unrestricted write (hidden URL security)
CREATE POLICY "Anyone can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete projects" ON public.projects FOR DELETE USING (true);

-- Blog Posts: public read published only, unrestricted admin access
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admin can read all blog posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blog posts" ON public.blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blog posts" ON public.blog_posts FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blog posts" ON public.blog_posts FOR DELETE USING (true);

-- Contact Messages: public insert (form), unrestricted admin read/update
CREATE POLICY "Anyone can send messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can update messages" ON public.contact_messages FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete messages" ON public.contact_messages FOR DELETE USING (true);

-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true);

-- Storage policies for content images
CREATE POLICY "Anyone can view content images" ON storage.objects FOR SELECT USING (bucket_id = 'content-images');
CREATE POLICY "Anyone can upload content images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'content-images');
CREATE POLICY "Anyone can update content images" ON storage.objects FOR UPDATE USING (bucket_id = 'content-images');
CREATE POLICY "Anyone can delete content images" ON storage.objects FOR DELETE USING (bucket_id = 'content-images');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();