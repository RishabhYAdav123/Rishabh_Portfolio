"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  CircleDot,
  Download,
  ExternalLink,
  Filter,
  Flame,
  Github,
  Loader2,
  Moon,
  Send,
  Sparkles,
  Star,
  Sun,
  GitFork,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import avatar from "../../Assets/avatar.svg";
import nexagesturaImage from "../../../Nexagestura_image.png";
import movieReviewImage from "../../../movie_review.png";
import workShieldImage from "../../../Workshield_.png";
import airlineImage from "../../../Airline.png";
import catDogImage from "../../../cat_dog.png";
import playerTrackingImage from "../../../Player_reidentification.png";
import medicalInsuranceImage from "../../../Medical_insurance.png";
import bigMartImage from "../../../big_mart.png";
import nextWordImage from "../../Assets/Projects/codeEditor.png";
import {
  achievements,
  contactItems,
  education,
  experience,
  experienceStats,
  navItems,
  profile,
  roles,
  skills,
  socials,
  stats,
  techGroups,
} from "./data";
import { fetchCuratedGithubProjects, type CuratedProject, type ProjectCategory, type RepoProject } from "./github";

const categories: Array<ProjectCategory | "All"> = [
  "All",
  "AI/ML Projects",
  "Computer Vision Projects",
  "NLP Projects",
  "Web Development Projects",
  "Python Projects",
];

const curatedProjects: CuratedProject[] = [
  {
    name: "NexaGestura",
    description: "Gesture-based volume and brightness control with real-time hand tracking.",
    html_url: "https://github.com/RishabhYAdav123/Nexagestura",
    language: "Python",
    tech: ["Python", "OpenCV", "MediaPipe"],
    category: "Computer Vision Projects",
    features: ["Real-time webcam tracking", "Touch-free controls", "Computer vision pipeline"],
    summary: "OpenCV and MediaPipe powered desktop gesture control.",
    image: nexagesturaImage.src,
    repoNames: ["Nexagestura", "NexaGestura"],
  },
  {
    name: "Movie Review Sentiment Analysis",
    description: "NLP sentiment classifier that predicts whether a movie review expresses positive or negative sentiment.",
    html_url: "https://github.com/RishabhYAdav123/Movie_review_sentiment_analysis_using_nlp",
    liveUrl: "https://movie-review-sentiment-analysis-using-nlp.onrender.com/",
    language: "Python",
    tech: ["Python", "NLP", "Scikit-learn", "Pandas"],
    category: "NLP Projects",
    features: ["Text preprocessing", "Sentiment classification", "Model evaluation"],
    summary: "End-to-end natural language processing project for review sentiment detection.",
    image: movieReviewImage.src,
    repoNames: [
      "Movie_review_sentiment_analysis_using_nlp",
      "Movie-Review-Sentiment-Analysis",
      "Movie_Review_Sentiment_Analysis",
      "movie_review_sentiment_analysis",
    ],
  },
  {
    name: "Next Word Predictor",
    description: "NLP language modeling app that predicts the most likely next word from a short text context.",
    html_url: "https://github.com/RishabhYAdav123/Next-word-predictor",
    liveUrl: "https://next-word-predictor-three.vercel.app",
    language: "Python",
    tech: ["Python", "NLP", "PyTorch", "Next.js"],
    category: "NLP Projects",
    features: ["LSTM language model", "N-gram backoff strategy", "Interactive deployed interface"],
    summary: "A deployable NLP pipeline with tokenization, sequence modeling, serialized artifacts, and real-time inference.",
    image: nextWordImage.src,
    repoNames: ["Next-word-predictor", "Next-Word-Predictor", "Next_Word_Predictor"],
  },
  {
    name: "WorkShield",
    description: "AI-driven workplace safety and productivity project built around intelligent monitoring workflows.",
    html_url: "https://github.com/RishabhYAdav123/WorkShield",
    language: "Python",
    tech: ["Python", "AI/ML", "Computer Vision"],
    category: "Computer Vision Projects",
    features: ["Safety-focused analytics", "AI-assisted monitoring", "Practical deployment workflow"],
    summary: "Applied AI system for workplace safety intelligence and risk-aware monitoring.",
    image: workShieldImage.src,
    repoNames: ["WorkShield", "Workshield"],
  },
  {
    name: "Airline Satisfaction Prediction",
    description: "Machine learning model for predicting passenger satisfaction from customer and flight experience data.",
    html_url: "https://github.com/RishabhYAdav123/Airline-Satisfaction-Predictor",
    language: "Python",
    tech: ["Python", "Scikit-learn", "Pandas"],
    category: "AI/ML Projects",
    features: ["Feature engineering", "Model evaluation", "Customer analytics"],
    summary: "Predictive analytics for airline customer satisfaction using structured passenger data.",
    image: airlineImage.src,
    repoNames: ["Airline-Satisfaction-Predictor", "Airline-Satisfaction-Prediction"],
  },
  {
    name: "Cat vs Dog Classification",
    description: "CNN-based image classifier for cat and dog recognition with deep learning preprocessing.",
    html_url: "https://github.com/RishabhYAdav123/Cat_Dog_classification",
    language: "Python",
    tech: ["Python", "TensorFlow", "Keras"],
    category: "AI/ML Projects",
    features: ["Image preprocessing", "CNN model", "Classification workflow"],
    summary: "Deep learning image classification project for binary visual recognition.",
    image: catDogImage.src,
    repoNames: ["Cat_Dog_classification", "Cat-Dog-Classification", "Cat-vs-Dog-Classification"],
  },
  {
    name: "Re-identification Player Tracking",
    description: "Computer vision pipeline for tracking and re-identifying players across video frames.",
    html_url: "https://github.com/RishabhYAdav123/Re-identification-Player-Tracking",
    language: "Python",
    tech: ["Python", "YOLO", "OpenCV", "Tracking"],
    category: "Computer Vision Projects",
    features: ["Object detection", "Player identity matching", "Sports analytics workflow"],
    summary: "Identity-aware sports analytics pipeline for player tracking across camera movement.",
    image: playerTrackingImage.src,
    repoNames: ["Re-identification-Player-Tracking", "Player-Reidentification", "Player_reidentification"],
  },
  {
    name: "Medical Insurance Prediction",
    description: "Regression model that estimates medical insurance premium cost from demographic and health attributes.",
    html_url: "https://github.com/RishabhYAdav123/medical_insurance_prediction",
    language: "Python",
    tech: ["Python", "Scikit-learn", "Flask"],
    category: "AI/ML Projects",
    features: ["Regression model", "Risk factors", "Prediction interface"],
    summary: "Insurance cost prediction from age, BMI, smoking habits, and related features.",
    image: medicalInsuranceImage.src,
    repoNames: ["medical_insurance_prediction", "Medical-Insurance-Prediction", "Medical-Insurance-Predictor"],
  },
  {
    name: "Big Mart Sales Prediction",
    description: "Sales forecasting system for retail inventory and planning.",
    html_url: "https://github.com/RishabhYAdav123/Big_mart_sales_prediction",
    language: "Python",
    tech: ["Python", "Regression", "Pandas"],
    category: "AI/ML Projects",
    features: ["Sales forecasting", "Regression modeling", "Business insights"],
    summary: "Retail sales prediction using historical product and outlet data.",
    image: bigMartImage.src,
    repoNames: ["Big_mart_sales_prediction", "Big-Mart-Sales-Prediction", "Big-Mart-Sale-Predictor"],
  },
];

const fallbackProjects = curatedProjects.map((project, index): RepoProject => ({
  id: index + 1,
  name: project.name,
  description: project.description,
  html_url: project.html_url,
  stargazers_count: 0,
  forks_count: 0,
  updated_at: new Date().toISOString(),
  language: project.language,
  tech: project.tech,
  category: project.category,
  features: project.features,
  summary: project.summary,
  liveUrl: project.liveUrl,
  image: project.image,
}));

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.8, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TypingRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const role = roles[roleIndex];

  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        if (!deleting && length < role.length) setLength((value) => value + 1);
        else if (!deleting && length === role.length) setDeleting(true);
        else if (deleting && length > 0) setLength((value) => value - 1);
        else {
          setDeleting(false);
          setRoleIndex((value) => (value + 1) % roles.length);
        }
      },
      deleting ? 36 : 78,
    );
    return () => window.clearTimeout(timeout);
  }, [deleting, length, role.length]);

  return (
    <span className="font-mono text-cyan-200">
      {role.slice(0, length)}
      <span className="ml-1 inline-block h-6 w-0.5 translate-y-1 animate-pulse bg-cyan-300" />
    </span>
  );
}

function BackgroundFX() {
  return (
    <>
      <div className="grid-bg fixed inset-0 z-0" />
      <div className="noise" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 23) % 100}%`,
            }}
            animate={{ y: [-20, 24, -20], opacity: [0.2, 0.9, 0.2], scale: [1, 1.8, 1] }}
            transition={{ duration: 5 + (index % 6), repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </div>
    </>
  );
}

function CursorGlow() {
  const [point, setPoint] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const handler = (event: PointerEvent) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);
  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden h-56 w-56 rounded-full bg-cyan-300/12 blur-3xl md:block"
      animate={{ x: point.x - 112, y: point.y - 112 }}
      transition={{ type: "spring", stiffness: 90, damping: 24, mass: 0.2 }}
    />
  );
}

function FloatingDock({ onTheme, isLight }: { onTheme: () => void; isLight: boolean }) {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-2 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-1">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white sm:text-sm"
          >
            {item}
          </a>
        ))}
        <button
          suppressHydrationWarning
          aria-label="Toggle theme"
          onClick={onTheme}
          className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-950 transition hover:scale-105"
        >
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </nav>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-slate-950"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.65 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[8px] border border-cyan-300/30 bg-cyan-300/10">
          <Sparkles className="text-cyan-200" />
        </div>
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-slate-300">Initializing portfolio</p>
      </motion.div>
    </motion.div>
  );
}

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-cyan-200">{kicker}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{text}</p>
    </Reveal>
  );
}

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [light, setLight] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [projects, setProjects] = useState<RepoProject[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [projectStatus, setProjectStatus] = useState("Fetching live GitHub projects...");

  useEffect(() => {
    document.body.classList.toggle("light", light);
  }, [light]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 900);
    fetchCuratedGithubProjects(profile.githubUser, curatedProjects)
      .then((repos) => {
        if (repos.length) {
          setProjects(repos);
          setProjectStatus(`Showing ${repos.length} image-backed projects with GitHub metadata and live demos when available.`);
        }
      })
      .catch(() => setProjectStatus("Showing curated image-backed projects. GitHub API was unavailable in this session."));
    return () => window.clearTimeout(timer);
  }, []);

  const visibleProjects = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory, projects],
  );

  function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    window.setTimeout(() => setSending(false), 1100);
  }

  return (
    <>
      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>
      <motion.div className="fixed left-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-cyan-300 via-emerald-300 to-rose-300" style={{ scaleX }} />
      <BackgroundFX />
      <CursorGlow />
      <FloatingDock onTheme={() => setLight((value) => !value)} isLight={light} />

      <main className="relative z-10 pb-28">
        <section id="home" className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles size={16} />
              AI systems, polished products, production-minded code
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Hi, I am <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="mt-6 min-h-8 text-xl text-slate-200 sm:text-2xl">
              <TypingRoles />
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I build intelligent applications across machine learning, computer vision, Python automation, and full stack web experiences with a strong eye for clean, premium interfaces.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#projects" className={buttonVariants()}>View Projects <ArrowDown size={17} /></Link>
              <Link href="/resume.pdf" target="_blank" className={buttonVariants({ variant: "glass" })}><Download size={17} />Download Resume</Link>
              <Link href="#contact" className={buttonVariants({ variant: "glass" })}><Send size={17} />Contact Me</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" aria-label={social.label} className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:-translate-y-1 hover:border-cyan-300/70 hover:text-cyan-200">
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 6, repeat: Infinity }} className="aurora-border mx-auto max-w-md rounded-[8px] p-1">
              <div className="glass rounded-[8px] p-6">
                <div className="relative mx-auto aspect-square max-w-[330px] overflow-hidden rounded-[8px] border border-white/15 bg-gradient-to-br from-cyan-300/15 via-slate-900 to-rose-300/15">
                  <Image src={avatar} alt="Profile placeholder for Rishabh Yadav" fill className="object-contain p-8" priority />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-[8px] border border-white/10 bg-white/5 p-3 text-center">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionTitle kicker="About" title="Engineer for intelligent, useful software" text="A focused mix of AI/ML depth, Python fluency, and full stack product craft." />
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <Card className="h-full">
                <p className="text-lg leading-9 text-slate-200">
                  I am an AI/ML Engineer and Full Stack Developer who enjoys turning complex ideas into usable systems. My work spans predictive modeling, computer vision, NLP, Python backends, and refined React interfaces that feel fast, clear, and recruiter-ready.
                </p>
                <div className="mt-8 rounded-[8px] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <education.icon className="text-cyan-200" />
                    <div>
                      <h3 className="font-semibold text-white">{education.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{education.detail}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <div className="space-y-5">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="font-mono text-cyan-200">{skill.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-rose-300" initial={{ width: 0 }} whileInView={{ width: `${skill.value}%` }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        <section id="stack" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionTitle kicker="Tech Stack" title="Tools chosen for real delivery" text="Categorized cards with the languages, frameworks, platforms, and AI tooling behind the projects." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.04}>
                <Card className="group h-full hover:-translate-y-2 hover:border-cyan-300/50">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                      <group.icon size={21} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition group-hover:border-cyan-300/30">
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionTitle kicker="Projects" title="Image-backed AI/ML project portfolio" text="A curated grid of deployed-ready machine learning, NLP, and computer vision work with GitHub metadata enriched automatically." />

          <Reveal>
            <div className="mb-5 flex flex-col gap-4 rounded-[8px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Filter size={17} className="text-cyan-200" />
                {projectStatus}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 thin-scroll">
                {categories.map((category) => (
                  <button key={category} suppressHydrationWarning onClick={() => setActiveCategory(category)} className={cn("shrink-0 rounded-full border px-3 py-2 text-xs font-medium transition", activeCategory === category ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25")}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <motion.article layout key={project.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} whileHover={{ y: -10, scale: 1.015 }} transition={{ type: "spring", stiffness: 220, damping: 22 }} className="group relative min-h-[430px] overflow-hidden rounded-[8px] border border-white/10 bg-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
                  <div className="absolute inset-0">
                    <Image src={project.image} alt={`${project.name} preview`} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/78 to-slate-950/18" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.26),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(52,211,153,0.16),transparent_28%)] opacity-80" />
                  </div>
                  <div className="relative flex min-h-[430px] flex-col justify-end p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-300/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">{project.category.replace(" Projects", "")}</span>
                      {project.liveUrl && <span className="rounded-full border border-emerald-300/35 bg-emerald-300/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur">Live</span>}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">{project.name.replaceAll("-", " ")}</h3>
                    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-200">{project.summary || project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-slate-100 backdrop-blur">{tech}</span>)}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex gap-2 text-xs text-slate-200"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-300" />{feature}</li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-3 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1"><Star size={14} />{project.stargazers_count}</span>
                        <span className="inline-flex items-center gap-1"><GitFork size={14} />{project.forks_count}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link href={project.html_url} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:-translate-y-0.5" aria-label={`${project.name} GitHub repository`}><Github size={15} />GitHub Repository</Link>
                        {project.liveUrl && <Link href={project.liveUrl} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-cyan-300/25" aria-label={`${project.name} live demo`}><ExternalLink size={15} />Live Demo</Link>}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionTitle
            kicker="Experience"
            title="Internship timeline with real AI delivery"
            text="A recruiter-friendly view of hands-on machine learning, deep learning, computer vision, NLP, and deployment workflow exposure."
          />

          <Reveal className="mb-10 grid gap-4 sm:grid-cols-3">
            {experienceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6 }}
                className="glass rounded-[8px] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12, duration: 0.6 }}
                      className="text-3xl font-semibold text-white"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.16)]">
                    <stat.icon size={21} />
                  </div>
                </div>
              </motion.div>
            ))}
          </Reveal>

          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/45 to-rose-300/0 md:left-1/2 md:block" />
            <motion.div
              className="absolute left-5 top-0 hidden w-px bg-gradient-to-b from-cyan-300 via-emerald-300 to-rose-300 md:left-1/2 md:block"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <div className="space-y-8">
              {experience.map((item, index) => (
                <Reveal key={item.company} delay={index * 0.12}>
                  <div className={cn("relative grid gap-5 md:grid-cols-2", index % 2 === 0 ? "" : "md:[&>article]:col-start-2")}>
                    <motion.div
                      className="absolute left-5 top-8 z-10 hidden -translate-x-1/2 md:left-1/2 md:grid"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.25 }}
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-full border border-cyan-300/50 bg-slate-950 text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,0.38)]">
                        <item.icon size={21} />
                      </div>
                    </motion.div>

                    <motion.article
                      whileHover={{ y: -8, rotateX: 1.5, rotateY: index % 2 === 0 ? -1.5 : 1.5 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className={cn(
                        "glass aurora-border group relative overflow-hidden rounded-[8px] p-6",
                        item.status ? "border-cyan-300/35 shadow-[0_0_60px_rgba(34,211,238,0.12)]" : "",
                      )}
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-60" />
                      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-emerald-300/12" />

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[8px] border border-white/15 bg-white/10 text-white shadow-[0_0_28px_rgba(255,255,255,0.08)]">
                            <span className="text-xl font-semibold">{item.company.slice(0, 2).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-2xl font-semibold tracking-tight text-white">{item.role}</h3>
                              {item.status && (
                                <motion.span
                                  animate={{ boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 26px rgba(34,211,238,0.42)", "0 0 0 rgba(34,211,238,0)"] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                                >
                                  <Flame size={13} />
                                  {item.status}
                                </motion.span>
                              )}
                            </div>
                            <p className="mt-2 text-base font-medium text-cyan-100">{item.company}</p>
                            <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-slate-400">{item.duration}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition group-hover:border-cyan-300/35 group-hover:bg-cyan-300/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className="mt-6 space-y-3">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-6 text-slate-300">
                            <CircleDot size={15} className="mt-1 shrink-0 text-emerald-300" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionTitle kicker="Achievements" title="Signals recruiters can scan quickly" text="Achievement cards for DSA, AI/ML work, certifications, and internships." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card className="h-full hover:-translate-y-2 hover:border-emerald-300/45">
                  <item.icon className="mb-5 text-emerald-200" />
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionTitle kicker="Contact" title="Let us build something intelligent" text="A polished contact surface with direct profile links for recruiters and collaborators." />
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <Card className="space-y-4">
                {contactItems.map((item) => (
                  <Link key={item.label} href={item.href} target={item.href === "#" ? undefined : "_blank"} className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/40 hover:bg-white/10">
                    <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-cyan-300/10 text-cyan-100"><item.icon size={19} /></div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-100">{item.value}</p>
                    </div>
                  </Link>
                ))}
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <form onSubmit={submitContact} className="space-y-4">
                  <input suppressHydrationWarning required placeholder="Name" className="w-full rounded-[8px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60" />
                  <input suppressHydrationWarning required type="email" placeholder="Email" className="w-full rounded-[8px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60" />
                  <textarea suppressHydrationWarning required placeholder="Message" rows={6} className="w-full resize-none rounded-[8px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60" />
                  <Button type="submit" disabled={sending} className="w-full">
                    {sending ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
