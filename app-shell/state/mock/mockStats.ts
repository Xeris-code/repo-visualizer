import { RepoStats } from "@/repository/types";

export const mockRepoStats: RepoStats = {
  totalFiles: 287,
  totalComponents: 45,
  totalLibraries: 32,
  totalRoutes: 65,
  architectureScore: 35,

  languages: [
    {
      name: "TypeScript",
      percentage: 72,
      color: "#3B82F6",
    },
    {
      name: "CSS",
      percentage: 18,
      color: "#22D3EE",
    },
    {
      name: "JavaScript",
      percentage: 7,
      color: "#FACC15",
    },
    {
      name: "JSON",
      percentage: 3,
      color: "#22C55E",
    },
  ],

  largestDirectories: [
    {
      name: "src",
      size: "4.2 MB",
      percentage: 100,
    },
    {
      name: "public",
      size: "1.6 MB",
      percentage: 38,
    },
    {
      name: "docs",
      size: "920 KB",
      percentage: 22,
    },
    {
      name: "tests",
      size: "680 KB",
      percentage: 16,
    },
    {
      name: "scripts",
      size: "240 KB",
      percentage: 6,
    },
  ],

  fileTypes: [
    {
      extension: ".tsx",
      count: 96,
      percentage: 33,
    },
    {
      extension: ".ts",
      count: 74,
      percentage: 26,
    },
    {
      extension: ".css",
      count: 32,
      percentage: 11,
    },
    {
      extension: ".json",
      count: 18,
      percentage: 6,
    },
    {
      extension: ".md",
      count: 11,
      percentage: 4,
    },
    {
      extension: "Other",
      count: 56,
      percentage: 20,
    },
  ],
};