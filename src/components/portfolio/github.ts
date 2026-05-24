export type ProjectCategory =
  | "AI/ML Projects"
  | "Computer Vision Projects"
  | "NLP Projects"
  | "Web Development Projects"
  | "Python Projects";

export type RepoProject = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language?: string | null;
  topics?: string[];
  tech: string[];
  category: ProjectCategory;
  features: string[];
  summary: string;
  liveUrl?: string;
  image: string;
};

export type CuratedProject = Omit<
  RepoProject,
  "id" | "stargazers_count" | "forks_count" | "updated_at" | "language" | "topics"
> & {
  repoNames: string[];
  language?: string | null;
};

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  topics?: string[];
  fork: boolean;
};

const categorySignals: Record<ProjectCategory, string[]> = {
  "Computer Vision Projects": ["vision", "opencv", "mediapipe", "yolo", "image", "gesture", "player", "re-identification", "classification", "cat", "dog"],
  "NLP Projects": ["nlp", "text", "title", "generator", "summary", "sentiment", "language", "transformer", "accent", "speech"],
  "Web Development Projects": ["react", "next", "web", "frontend", "backend", "node", "express", "portfolio", "blog", "chat", "editor"],
  "Python Projects": ["python", "flask", "script", "automation", "predictor"],
  "AI/ML Projects": ["ml", "machine", "learning", "prediction", "predictor", "regression", "classifier", "model", "sales", "loan", "medical", "airline"],
};

const commonTech = [
  "Python",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "OpenCV",
  "MediaPipe",
  "TensorFlow",
  "Keras",
  "Scikit-learn",
  "Flask",
  "Node",
  "Express",
  "MongoDB",
  "Tailwind",
  "Pandas",
  "NumPy",
  "YOLO",
  "NLP",
];

function decodeBase64(content: string) {
  try {
    return atob(content.replace(/\n/g, ""));
  } catch {
    return "";
  }
}

function cleanReadme(readme: string) {
  return readme
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[[^\]]*]\(([^)]*)\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectLiveUrl(repo: GithubRepo, readme: string) {
  if (repo.homepage?.startsWith("http")) return repo.homepage;
  const match = readme.match(
    /https?:\/\/(?:[^\s)]+)(?:vercel\.app|netlify\.app|render\.com|github\.io|firebaseapp\.com|herokuapp\.com|streamlit\.app|huggingface\.co|hf\.space)[^\s)]*/i,
  );
  return match?.[0];
}

function detectTech(repo: GithubRepo, readme: string) {
  const source = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")} ${readme}`.toLowerCase();
  const tech = new Set<string>();
  if (repo.language) tech.add(repo.language);
  commonTech.forEach((item) => {
    if (source.includes(item.toLowerCase())) tech.add(item);
  });
  return Array.from(tech).slice(0, 7);
}

export function categorizeProject(repo: GithubRepo, tech: string[]): ProjectCategory {
  const haystack = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")} ${tech.join(" ")}`.toLowerCase();
  const ranked = Object.entries(categorySignals)
    .map(([category, signals]) => ({
      category: category as ProjectCategory,
      score: signals.reduce((total, signal) => total + (haystack.includes(signal) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score ? ranked[0].category : repo.language === "Python" ? "Python Projects" : "Web Development Projects";
}

function buildFeatures(repo: GithubRepo, tech: string[], liveUrl?: string) {
  const features = [
    `${repo.language ?? tech[0] ?? "Modern"} based implementation`,
    "Clean GitHub repository with source code",
    `Recently updated ${new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`,
  ];
  if (liveUrl) features.push("Live deployment detected automatically");
  if (repo.stargazers_count || repo.forks_count) features.push(`${repo.stargazers_count} stars and ${repo.forks_count} forks`);
  return features.slice(0, 4);
}

export async function fetchGithubProjects(username: string): Promise<RepoProject[]> {
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

  if (!reposRes.ok) {
    throw new Error("Unable to load GitHub repositories");
  }

  const repos = (await reposRes.json()) as GithubRepo[];
  const ownedRepos = repos.filter((repo) => !repo.fork).slice(0, 24);

  const projects = await Promise.all(
    ownedRepos.map(async (repo) => {
      let readme = "";
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`);
        if (readmeRes.ok) {
          const data = (await readmeRes.json()) as { content?: string };
          readme = data.content ? decodeBase64(data.content) : "";
        }
      } catch {
        readme = "";
      }

      const tech = detectTech(repo, readme);
      const liveUrl = detectLiveUrl(repo, readme);
      const category = categorizeProject(repo, tech);
      const summary = cleanReadme(readme).slice(0, 190);

      return {
        ...repo,
        description: repo.description ?? "Repository project from GitHub with automatically detected metadata.",
        tech,
        category,
        features: buildFeatures(repo, tech, liveUrl),
        summary,
        liveUrl,
        image: `https://opengraph.githubassets.com/portfolio-${repo.id}/${username}/${repo.name}`,
      };
    }),
  );

  return projects.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
}

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function curatedToRepoProject(project: CuratedProject, index: number): RepoProject {
  return {
    id: index + 1,
    name: project.name,
    description: project.description,
    html_url: project.html_url,
    homepage: project.liveUrl,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    language: project.language ?? project.tech[0] ?? null,
    tech: project.tech,
    category: project.category,
    features: project.features,
    summary: project.summary,
    liveUrl: project.liveUrl,
    image: project.image,
  };
}

export async function fetchCuratedGithubProjects(
  username: string,
  curatedProjects: CuratedProject[],
): Promise<RepoProject[]> {
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

  if (!reposRes.ok) {
    throw new Error("Unable to load GitHub repositories");
  }

  const repos = ((await reposRes.json()) as GithubRepo[]).filter((repo) => !repo.fork);
  const repoByName = new Map(repos.map((repo) => [normalizeName(repo.name), repo]));

  const projects = await Promise.all(
    curatedProjects.map(async (project, index) => {
      const repo = project.repoNames.map((name) => repoByName.get(normalizeName(name))).find(Boolean);
      if (!repo) return curatedToRepoProject(project, index);

      let readme = "";
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`);
        if (readmeRes.ok) {
          const data = (await readmeRes.json()) as { content?: string };
          readme = data.content ? decodeBase64(data.content) : "";
        }
      } catch {
        readme = "";
      }

      const detectedTech = detectTech(repo, readme);
      const liveUrl = detectLiveUrl(repo, readme) ?? project.liveUrl;

      return {
        ...curatedToRepoProject(project, index),
        id: repo.id,
        html_url: repo.html_url,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        language: repo.language ?? project.language,
        tech: Array.from(new Set([...project.tech, ...detectedTech])).slice(0, 7),
        features: buildFeatures(repo, project.tech, liveUrl),
        summary: cleanReadme(readme).slice(0, 190) || project.summary,
        liveUrl,
      };
    }),
  );

  return projects;
}
