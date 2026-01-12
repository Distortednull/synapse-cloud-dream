import { Brain, Cloud, Atom, Workflow, Code2, Wrench, LucideIcon } from "lucide-react";

import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectCms from "@/assets/project-cms.jpg";
import projectDashboard from "@/assets/project-dashboard.jpg";
import projectNeural from "@/assets/project-neural.jpg";
import projectCloud from "@/assets/project-cloud.jpg";
import projectQuantum from "@/assets/project-quantum.jpg";
import projectMlops from "@/assets/project-mlops.jpg";
import projectTicketing from "@/assets/project-ticketing.jpg";
import projectCodeai from "@/assets/project-codeai.jpg";
import projectServerless from "@/assets/project-serverless.jpg";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  icon: LucideIcon;
  image: string;
  tags: string[];
  techStack: {
    name: string;
    description: string;
  }[];
  features: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    fullDescription: "A comprehensive e-commerce platform built from the ground up, featuring a modern shopping experience with real-time inventory tracking, secure payment processing via Stripe, and a powerful admin dashboard for managing products, orders, and customers. The platform supports multiple payment methods, shipping integrations, and advanced analytics.",
    category: "Web Dev",
    icon: Code2,
    image: projectEcommerce,
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    techStack: [
      { name: "Next.js 14", description: "React framework with App Router for server-side rendering" },
      { name: "Stripe", description: "Payment processing and subscription management" },
      { name: "PostgreSQL", description: "Relational database for product and order data" },
      { name: "Prisma", description: "Type-safe ORM for database operations" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Redis", description: "Caching layer for session and cart management" },
    ],
    features: [
      "Real-time inventory management",
      "Secure checkout with multiple payment options",
      "Admin dashboard with analytics",
      "Customer account management",
      "Order tracking and notifications",
      "SEO optimized product pages",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "portfolio-cms",
    title: "Portfolio CMS",
    description: "Custom content management system for creative professionals with drag-and-drop editing and media optimization.",
    fullDescription: "A modern headless CMS designed specifically for creative professionals, featuring an intuitive drag-and-drop interface, automatic image optimization, and customizable templates. Built with performance in mind, it delivers lightning-fast page loads while maintaining full creative control.",
    category: "Web Dev",
    icon: Code2,
    image: projectCms,
    tags: ["React", "Node.js", "MongoDB"],
    techStack: [
      { name: "React", description: "Frontend library for building interactive UIs" },
      { name: "Node.js", description: "Backend runtime for API development" },
      { name: "MongoDB", description: "NoSQL database for flexible content storage" },
      { name: "Express", description: "Web framework for REST API" },
      { name: "AWS S3", description: "Cloud storage for media assets" },
      { name: "Sharp", description: "Image processing and optimization" },
    ],
    features: [
      "Drag-and-drop page builder",
      "Automatic image optimization",
      "Custom template system",
      "SEO management tools",
      "Version history and rollback",
      "Multi-user collaboration",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "realtime-dashboard",
    title: "Real-Time Dashboard",
    description: "Interactive analytics dashboard with live data visualization, user authentication, and role-based access.",
    fullDescription: "An enterprise-grade analytics dashboard featuring real-time data streaming, interactive visualizations, and comprehensive user management. Built for scalability, it handles thousands of concurrent connections while delivering sub-second updates to all connected clients.",
    category: "Web Dev",
    icon: Code2,
    image: projectDashboard,
    tags: ["React", "Socket.io", "Express"],
    techStack: [
      { name: "React", description: "Frontend framework with hooks for state management" },
      { name: "Socket.io", description: "Real-time bidirectional communication" },
      { name: "Express", description: "Node.js web server framework" },
      { name: "D3.js", description: "Data visualization library" },
      { name: "PostgreSQL", description: "Time-series data storage" },
      { name: "Redis", description: "Pub/sub for real-time event distribution" },
    ],
    features: [
      "Real-time data streaming",
      "Interactive charts and graphs",
      "Role-based access control",
      "Custom dashboard layouts",
      "Export to PDF/CSV",
      "Alert and notification system",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "neural-network-visualizer",
    title: "Neural Network Visualizer",
    description: "Interactive web application for visualizing and understanding neural network architectures and training processes.",
    fullDescription: "An educational and research tool that brings neural networks to life through interactive visualizations. Watch in real-time as data flows through layers, observe activation patterns, and understand backpropagation through intuitive animations. Perfect for learning and debugging deep learning models.",
    category: "AI/ML",
    icon: Brain,
    image: projectNeural,
    tags: ["TensorFlow.js", "React", "D3.js"],
    techStack: [
      { name: "TensorFlow.js", description: "Machine learning in the browser" },
      { name: "React", description: "Component-based UI development" },
      { name: "D3.js", description: "Custom neural network visualizations" },
      { name: "WebGL", description: "Hardware-accelerated graphics" },
      { name: "Web Workers", description: "Background computation threads" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
    ],
    features: [
      "Interactive layer visualization",
      "Real-time training animations",
      "Custom architecture builder",
      "Weight and bias inspection",
      "Gradient flow visualization",
      "Export models to various formats",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "cloud-orchestration-platform",
    title: "Cloud Orchestration Platform",
    description: "Automated cloud infrastructure management tool with multi-cloud support and intelligent resource allocation.",
    fullDescription: "A sophisticated platform for managing complex multi-cloud environments. Featuring intelligent resource allocation powered by ML, cost optimization recommendations, and automated scaling policies. Supports AWS, GCP, Azure, and on-premise infrastructure through a unified interface.",
    category: "Cloud",
    icon: Cloud,
    image: projectCloud,
    tags: ["Kubernetes", "Terraform", "Go"],
    techStack: [
      { name: "Kubernetes", description: "Container orchestration platform" },
      { name: "Terraform", description: "Infrastructure as Code" },
      { name: "Go", description: "Backend services and CLI tools" },
      { name: "Prometheus", description: "Monitoring and alerting" },
      { name: "Grafana", description: "Metrics visualization" },
      { name: "ArgoCD", description: "GitOps continuous delivery" },
    ],
    features: [
      "Multi-cloud management",
      "Intelligent auto-scaling",
      "Cost optimization insights",
      "Infrastructure as Code",
      "Security compliance scanning",
      "Disaster recovery automation",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "quantum-circuit-simulator",
    title: "Quantum Circuit Simulator",
    description: "Browser-based quantum computing simulator for designing and testing quantum circuits with visual feedback.",
    fullDescription: "A comprehensive quantum computing environment running entirely in the browser. Design quantum circuits with an intuitive drag-and-drop interface, simulate quantum operations, and visualize state vectors on the Bloch sphere. Includes tutorials and example algorithms for learning quantum computing concepts.",
    category: "Quantum",
    icon: Atom,
    image: projectQuantum,
    tags: ["Qiskit", "Python", "WebAssembly"],
    techStack: [
      { name: "Qiskit", description: "Quantum computing SDK" },
      { name: "Python", description: "Quantum algorithm development" },
      { name: "WebAssembly", description: "High-performance simulation" },
      { name: "Three.js", description: "3D Bloch sphere visualization" },
      { name: "React", description: "Circuit builder interface" },
      { name: "Pyodide", description: "Python runtime in browser" },
    ],
    features: [
      "Visual circuit designer",
      "Real-time state simulation",
      "Bloch sphere visualization",
      "Built-in quantum algorithms",
      "Export to Qiskit code",
      "Interactive tutorials",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "mlops-pipeline-framework",
    title: "MLOps Pipeline Framework",
    description: "End-to-end machine learning operations framework for automated model training, deployment, and monitoring.",
    fullDescription: "A production-ready MLOps framework that automates the entire machine learning lifecycle. From data versioning and feature engineering to model training, deployment, and monitoring. Includes A/B testing capabilities, model registry, and automated retraining triggers based on performance drift.",
    category: "Workflow",
    icon: Workflow,
    image: projectMlops,
    tags: ["MLflow", "Docker", "FastAPI"],
    techStack: [
      { name: "MLflow", description: "ML experiment tracking and registry" },
      { name: "Docker", description: "Containerized model serving" },
      { name: "FastAPI", description: "High-performance API framework" },
      { name: "Kubernetes", description: "Model deployment orchestration" },
      { name: "Apache Airflow", description: "Pipeline scheduling" },
      { name: "Great Expectations", description: "Data validation" },
    ],
    features: [
      "Automated model training",
      "Experiment tracking",
      "Model versioning and registry",
      "A/B testing framework",
      "Performance monitoring",
      "Auto-retraining triggers",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "it-support-ticketing-system",
    title: "IT Support Ticketing System",
    description: "Comprehensive helpdesk solution with automated ticket routing, knowledge base, and SLA tracking.",
    fullDescription: "An enterprise IT support platform designed to streamline helpdesk operations. Features intelligent ticket routing based on issue type and technician expertise, an integrated knowledge base with AI-powered search, and comprehensive SLA tracking with automated escalation. Includes reporting dashboards and customer satisfaction surveys.",
    category: "IT Support",
    icon: Wrench,
    image: projectTicketing,
    tags: ["React", "Node.js", "Redis"],
    techStack: [
      { name: "React", description: "Modern frontend interface" },
      { name: "Node.js", description: "Backend API services" },
      { name: "Redis", description: "Real-time notifications and caching" },
      { name: "PostgreSQL", description: "Ticket and user data storage" },
      { name: "Elasticsearch", description: "Knowledge base search" },
      { name: "Socket.io", description: "Live updates and chat" },
    ],
    features: [
      "Intelligent ticket routing",
      "SLA tracking and alerts",
      "Knowledge base integration",
      "Customer satisfaction surveys",
      "Performance analytics",
      "Multi-channel support",
    ],
    links: { demo: "#", github: "#" },
  },
  {
    id: "ai-powered-code-assistant",
    title: "AI-Powered Code Assistant",
    description: "Intelligent code completion and generation tool using large language models for enhanced developer productivity.",
    fullDescription: "A VS Code extension powered by state-of-the-art language models that understands your codebase and provides intelligent suggestions. Features include context-aware code completion, documentation generation, bug detection, and natural language to code translation. Learns from your coding patterns to provide increasingly relevant suggestions.",
    category: "AI/ML",
    icon: Brain,
    image: projectCodeai,
    tags: ["PyTorch", "Transformers", "VS Code"],
    techStack: [
      { name: "PyTorch", description: "Deep learning framework" },
      { name: "Transformers", description: "Hugging Face model library" },
      { name: "VS Code API", description: "Editor extension development" },
      { name: "FastAPI", description: "Model serving endpoint" },
      { name: "TypeScript", description: "Extension implementation" },
      { name: "ONNX", description: "Optimized model inference" },
    ],
    features: [
      "Context-aware completion",
      "Natural language to code",
      "Documentation generation",
      "Bug detection and fixes",
      "Code refactoring suggestions",
      "Multi-language support",
    ],
    links: { github: "#" },
  },
  {
    id: "serverless-data-pipeline",
    title: "Serverless Data Pipeline",
    description: "Event-driven data processing pipeline with automatic scaling and real-time analytics capabilities.",
    fullDescription: "A fully serverless data processing architecture that handles millions of events per day. Built on AWS Lambda and Apache Kafka, it automatically scales to meet demand while maintaining sub-second processing latency. Includes real-time analytics dashboards and data quality monitoring.",
    category: "Cloud",
    icon: Cloud,
    image: projectServerless,
    tags: ["AWS Lambda", "Apache Kafka", "Python"],
    techStack: [
      { name: "AWS Lambda", description: "Serverless compute" },
      { name: "Apache Kafka", description: "Event streaming platform" },
      { name: "Python", description: "Data processing logic" },
      { name: "AWS S3", description: "Data lake storage" },
      { name: "Apache Spark", description: "Batch processing" },
      { name: "Snowflake", description: "Data warehouse" },
    ],
    features: [
      "Auto-scaling processing",
      "Real-time event streaming",
      "Data quality monitoring",
      "Cost-optimized execution",
      "Dead letter queue handling",
      "Analytics dashboards",
    ],
    links: { github: "#" },
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category);
};
