import {
  Boxes,
  Code2,
  Component,
  Database,
  FileText,
  FolderTree,
  Hammer,
  Image,
  Layers3,
  Package,
  Route,
  Server,
  Settings2,
  SlidersHorizontal,
  TestTube2,
  Webhook,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type RepoStats = {
    name: string;
    size: string;
    totalFiles: number;
    totalDirectories: number;
    biggestDirectory: {name: string; size: string; percentage: number;};
    dominantLanguage: {name: string; percentage: number; color: string};

    languages: LanguageStats;
    largestDirectories: DirectoryStats;
    allDirectories: DirectoryStats;
    fileTypes: FileStats;

    projectKind: ProjectKind;
    architectureMetrics: ArchitectureMetric[];
    architectureScore: number;
    architectureScoreDetails: ArchitectureScoreDetails;
};

export type ProjectKind =
  | "next"
  | "react"
  | "vue"
  | "angular"
  | "svelte"
  | "node"
  | "python"
  | "java"
  | "dotnet"
  | "go"
  | "rust"
  | "php"
  | "ruby"
  | "android"
  | "ios"
  | "generic";

export type ArchitectureMetric = {
  id: string;
  value: string | number;
  type: ArchitectureMetricType
};

export type ScoreCategory = {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  positives: string[];
  issues: string[];
};

export type ArchitectureScoreDetails = {
  score: number;
  grade: "A" | "B" | "C" | "D" | "E";
  categories: ScoreCategory[];
};

export type LanguageStats = {
    name: string;
    bytes: number;
    percentage: number;
    color: string;
}[]

export type DirectoryStats = {
    name: string;
    path: string;
    size: string;
    sizeBytes: number;
    percentage: number;
}[]

export type FileStats = {
    extension: string;
    count: number;
    percentage: number;
}[]

export type GithubFileDetails = {
  linesOfCode: number | null;
  lastModified: string | null;
};

export type ArchitectureMetricType =
  | "files"
  | "folders"
  | "source"
  | "components"
  | "routes"
  | "api"
  | "controllers"
  | "services"
  | "models"
  | "modules"
  | "packages"
  | "dependencies"
  | "tests"
  | "config"
  | "assets"
  | "build"
  | "generic";

type MetricVisualConfig = {
  Icon: LucideIcon;
  bgColor: string;
  textColor: string;
};

export const metricVisualConfig: Record<
  ArchitectureMetricType,
  MetricVisualConfig
> = {
  files: {
    Icon: FileText,
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
  },

  folders: {
    Icon: FolderTree,
    bgColor: "bg-fuchsia-500/10",
    textColor: "text-fuchsia-400",
  },

  source: {
    Icon: Code2,
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-400",
  },

  components: {
    Icon: Component,
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-400",
  },

  routes: {
    Icon: Route,
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },

  api: {
    Icon: Webhook,
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-400",
  },

  controllers: {
    Icon: SlidersHorizontal,
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-400",
  },

  services: {
    Icon: Server,
    bgColor: "bg-sky-500/10",
    textColor: "text-sky-400",
  },

  models: {
    Icon: Database,
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-400",
  },

  modules: {
    Icon: Layers3,
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-400",
  },

  packages: {
    Icon: Boxes,
    bgColor: "bg-violet-500/10",
    textColor: "text-violet-400",
  },

  dependencies: {
    Icon: Package,
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-400",
  },

  tests: {
    Icon: TestTube2,
    bgColor: "bg-lime-500/10",
    textColor: "text-lime-400",
  },

  config: {
    Icon: Settings2,
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
  },

  assets: {
    Icon: Image,
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-400",
  },

  build: {
    Icon: Hammer,
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-400",
  },

  generic: {
    Icon: Wrench,
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
  },
};

export function getMetricVisualConfig(
  type: ArchitectureMetricType
): MetricVisualConfig {
  return metricVisualConfig[type] ?? metricVisualConfig.generic;
}