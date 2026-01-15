import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Plus, Trash2 } from "lucide-react";

interface ProjectEditorProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Web Development",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Quantum Computing",
  "Mobile Development",
  "Blockchain",
];

export const ProjectEditor = ({
  project,
  isOpen,
  onClose,
}: ProjectEditorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    full_description: project?.full_description || "",
    category: project?.category || "",
    tags: project?.tags?.join(", ") || "",
    demo_link: project?.demo_link || "",
    github_link: project?.github_link || "",
    image_url: project?.image_url || "",
  });

  const [techStack, setTechStack] = useState<{ name: string; description: string }[]>(
    project?.tech_stack || []
  );

  const [features, setFeatures] = useState<string[]>(project?.features || []);
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (isEditing) {
        const { error } = await supabase
          .from("projects")
          .update(data)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects-count"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
      toast({
        title: isEditing
          ? "Project updated successfully"
          : "Project created successfully",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to save project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("content-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("content-images")
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: data.publicUrl }));
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    mutation.mutate({
      title: formData.title,
      description: formData.description,
      full_description: formData.full_description,
      category: formData.category,
      tags: tagsArray,
      tech_stack: techStack,
      features: features.filter(Boolean),
      demo_link: formData.demo_link || null,
      github_link: formData.github_link || null,
      image_url: formData.image_url || null,
    });
  };

  const addTechStackItem = () => {
    setTechStack([...techStack, { name: "", description: "" }]);
  };

  const updateTechStackItem = (
    index: number,
    field: "name" | "description",
    value: string
  ) => {
    const updated = [...techStack];
    updated[index][field] = value;
    setTechStack(updated);
  };

  const removeTechStackItem = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Project" : "New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="full_description">Full Description</Label>
              <Textarea
                id="full_description"
                value={formData.full_description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    full_description: e.target.value,
                  }))
                }
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="React, TypeScript, Tailwind"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Project Image</Label>
            <div className="mt-2">
              {formData.image_url ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={formData.image_url}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image_url: "" }))
                    }
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Tech Stack</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addTechStackItem}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {techStack.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Technology name"
                    value={item.name}
                    onChange={(e) =>
                      updateTechStackItem(index, "name", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateTechStackItem(index, "description", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTechStackItem(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Key Features</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Feature description"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="demo_link">Demo URL</Label>
              <Input
                id="demo_link"
                type="url"
                value={formData.demo_link}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, demo_link: e.target.value }))
                }
                placeholder="https://demo.example.com"
              />
            </div>
            <div>
              <Label htmlFor="github_link">GitHub URL</Label>
              <Input
                id="github_link"
                type="url"
                value={formData.github_link}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    github_link: e.target.value,
                  }))
                }
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Saving..."
                : isEditing
                ? "Update Project"
                : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
