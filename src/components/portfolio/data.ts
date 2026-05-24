import {
  Award,
  BriefcaseBusiness,
  BrainCircuit,
  Building2,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  Eye,
  Github,
  Globe2,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Server,
  Sparkles,
  Terminal,
  Trophy,
  Wrench,
} from "lucide-react";

export const profile = {
  name: "Rishabh Yadav",
  githubUser: "RishabhYAdav123",
  github: "https://github.com/RishabhYAdav123",
  linkedin: "https://www.linkedin.com/in/rishabh-yadav-ba4562288/",
  leetcode: "https://leetcode.com/u/Rishabh_Yadav_17/",
  email: "mailto:rishabhyadav5376@gmail.com",
  location: "India",
};

export const navItems = ["About", "Stack", "Projects", "Experience", "Contact"];

export const roles = [
  "AI/ML Engineer",
  "Computer Vision Developer",
  "Python Developer",
  "Full Stack Developer",
];

export const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "LeetCode", href: profile.leetcode, icon: Code2 },
  { label: "Email", href: profile.email, icon: Mail },
];

export const stats = [
  { label: "Projects Completed", value: "25+" },
  { label: "Technologies Known", value: "35+" },
  { label: "DSA Problems Solved", value: "300+" },
];

export const skills = [
  { name: "Machine Learning", value: 92 },
  { name: "Computer Vision", value: 88 },
  { name: "Python Engineering", value: 94 },
  { name: "Full Stack Development", value: 86 },
];

export const techGroups = [
  {
    title: "Languages",
    icon: Terminal,
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    title: "AI/ML",
    icon: BrainCircuit,
    items: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    title: "Computer Vision",
    icon: Eye,
    items: ["OpenCV", "MediaPipe", "YOLO", "Image Processing", "Tracking"],
  },
  {
    title: "Frontend",
    icon: Layers3,
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "ShadCN UI"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "Flask", "REST APIs", "Auth"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "SQLite"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    items: ["Git", "GitHub", "Vercel", "Docker", "VS Code"],
  },
];

export const featuredProjects = [
  {
    name: "NexaGestura",
    category: "Computer Vision",
    description:
      "Touch-free desktop control with real-time hand gesture tracking for volume and brightness using OpenCV and MediaPipe.",
    tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    github: "https://github.com/RishabhYAdav123/Nexagestura",
  },
  {
    name: "Real-Time Player Re-identification",
    category: "Computer Vision",
    description:
      "Identity-aware sports analytics pipeline for re-identifying players across video frames and camera movement.",
    tech: ["Python", "YOLO", "Tracking", "Deep Learning"],
    github: `https://github.com/${profile.githubUser}?tab=repositories`,
  },
  {
    name: "Automatic Title Generator",
    category: "NLP",
    description:
      "NLP system that generates concise, high-signal titles from long-form text using semantic summarization patterns.",
    tech: ["Python", "NLP", "Transformers", "Text Generation"],
    github: `https://github.com/${profile.githubUser}?tab=repositories`,
  },
  {
    name: "Accent Intensity Regressor",
    category: "AI/ML",
    description:
      "Speech intelligence project for estimating accent intensity with regression modeling and audio feature extraction.",
    tech: ["Python", "ML", "Audio", "Regression"],
    github: `https://github.com/${profile.githubUser}?tab=repositories`,
  },
];

export const experience = [
  {
    company: "Aigenthix",
    role: "AI/ML Intern",
    duration: "Apr 2026 - Present",
    status: "Currently Working",
    icon: BrainCircuit,
    points: [
      "Working on advanced AI and Machine Learning solutions focused on real-world applications.",
      "Developing intelligent systems using Deep Learning, Computer Vision, and NLP concepts.",
      "Building and optimizing AI pipelines for performance and scalability.",
      "Contributing to model development, experimentation, and deployment workflows.",
      "Working with modern AI tools, frameworks, and automation systems.",
    ],
    tech: ["Python", "Deep Learning", "Computer Vision", "NLP", "PyTorch", "OpenCV", "AI Automation"],
  },
  {
    company: "Unified Mentor Pvt Ltd",
    role: "Machine Learning Intern",
    duration: "May 2025 - Aug 2025",
    icon: BriefcaseBusiness,
    points: [
      "Worked on real-world Machine Learning projects involving data preprocessing, model training, and evaluation.",
      "Built predictive ML models using Python, Scikit-learn, Pandas, and NumPy.",
      "Performed exploratory data analysis and feature engineering for improving model accuracy.",
      "Collaborated on AI-based solutions and gained practical exposure to deployment workflows.",
      "Improved understanding of supervised learning, model optimization, and data pipelines.",
    ],
    tech: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  },
];

export const experienceStats = [
  { label: "Internships", value: "02", icon: Building2 },
  { label: "Experience", value: "6+ mo", icon: CalendarDays },
  { label: "AI/ML Focus", value: "100%", icon: BrainCircuit },
];

export const achievements = [
  { title: "DSA", detail: "Consistent problem solving across arrays, graphs, DP, and interview patterns.", icon: Trophy },
  { title: "AI/ML Projects", detail: "Predictive analytics, classification, NLP, and computer vision portfolio.", icon: BrainCircuit },
  { title: "Certifications", detail: "Continuous learning across machine learning, web, and engineering tools.", icon: Award },
  { title: "Internships", detail: "Applied engineering workflows with collaborative delivery and documentation.", icon: Sparkles },
];

export const contactItems = [
  { label: "Email", value: "rishabhyadav5376@gmail.com", icon: Mail, href: profile.email },
  { label: "LinkedIn", value: "rishabh-yadav", icon: Linkedin, href: profile.linkedin },
  { label: "GitHub", value: profile.githubUser, icon: Github, href: profile.github },
  { label: "Location", value: profile.location, icon: MapPin, href: "#" },
];

export const education = {
  icon: GraduationCap,
  title: "Computer Science Engineering",
  detail:
    "Building a strong foundation in algorithms, software engineering, machine learning, databases, and full stack systems.",
};

export const accentIcons = [BrainCircuit, Cpu, Globe2, Code2];
