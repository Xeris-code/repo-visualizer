import { GraphModel } from "@/graph/types";
import { DirectoryStats, FileStats, GithubRepo, GithubTreeItem, LanguageStats, RepositoryTree, RepoStats } from "../types";
import { fetchRepositoryLanguages, fetchRepositoryTree } from "./githubService";
import { mockGraph } from "@/app-shell/state/mock";
import { formatBytes, getLanguageColor, languageColors } from "../hooks";

export async function analyzeRepository(repo: GithubRepo) {
  const tree = await fetchRepositoryTree(repo.owner, repo.repo);
  const languages = await fetchRepositoryLanguages(repo.owner, repo.repo)

  console.log(languages)

  return {
    tree,
    stats: buildRepoStats(repo.repo, tree, languages),
    graph: buildRepoGraph(tree),
  };
}

function buildRepoStats (repoName: string, tree: RepositoryTree, languages: JSON): RepoStats {

    const languageList = getLanguages(languages)
    const topLevelDirectoryList = getTopLevelDirectories(tree.files)

    return {
      name: repoName,
      size: getRepositorySize(tree.files),
      totalFiles: tree.files.length,
      totalDirectories: tree.folders.length,
      biggestDirectory: topLevelDirectoryList[0],
      dominantLanguage: languageList[0],

      totalComponents: 0,
      totalLibraries: 0,
      totalRoutes: 0,
      architectureScore: 0,

      languages: languageList,
      largestDirectories: topLevelDirectoryList,
      fileTypes: getFileTypes(tree.files),
    }
}

function buildRepoGraph (tree: RepositoryTree): GraphModel {
    return mockGraph
}

function getRepositorySize(files: GithubTreeItem[]): string {
  const totalBytes = files.reduce(
    (sum, file) => sum + (file.size ?? 0),
    0
  );

  return formatBytes(totalBytes);
}

function getLanguages (languages: JSON): LanguageStats {
  const total = Object.values(languages)
  .reduce((sum, bytes) => sum + bytes, 0);

  const result = Object.entries(languages).map(
    ([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / total) * 1000) / 10,
      color: getLanguageColor(name)
    })
  ).sort((a, b) => b.percentage - a.percentage);;
  
  return result
}

function getFileTypes (files: GithubTreeItem[]): FileStats {

  const totalFiles = files.length
  const count: Record<string, number> = {}

  files.forEach((file) => {
    const extension = file.path.split(".").pop() ?? "unknown"
    count[extension] = (count[extension] ?? 0) + 1;
  })

  const fileStats: FileStats = Object.entries(count).map(([extension, count]) => ({
      extension: `.${extension}`,
      count,
      percentage: Math.round((count / totalFiles)*100)
    })).sort((a, b) => b.count - a.count)

  return fileStats

}

function getTopLevelDirectories (files: GithubTreeItem[]): DirectoryStats {
  const topLevelDirs: Record<string, number> = {};

  files.forEach((file) => {
      const parts = file.path.split("/");

      if (parts.length < 2) {
        return;
      }

      const topDir = parts[0];

      topLevelDirs[topDir] =
          (topLevelDirs[topDir] ?? 0) + (file.size ?? 0);
  });

  const largestSize = Math.max(...Object.values(topLevelDirs), 1);

  const directories = Object.entries(topLevelDirs)
    .map(([name, size]) => ({
      name,
      size: formatBytes(size),
      percentage: Math.round((size / largestSize) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage)
  .slice(0, 5);

  return directories
}

function getRecursiveDirectories (files: GithubTreeItem[]): DirectoryStats {
  const directorySizes: Record<string, number> = {};

  files.forEach((file) => {
    const size = file.size ?? 0;
    const parts = file.path.split("/");

    parts.pop();

    let currentPath = "";

    parts.forEach((part) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      directorySizes[currentPath] =
        (directorySizes[currentPath] ?? 0) + size;
    });
  });

  const largestSize = Math.max(...Object.values(directorySizes), 1);

  const directories = Object.entries(directorySizes)
    .map(([name, size]) => ({
      name,
      size: formatBytes(size),
      percentage: Math.round((size / largestSize) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage)
  .slice(0, 5);

  return directories
}
