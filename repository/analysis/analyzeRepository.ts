import { GraphEdgeModel, GraphModel, GraphNodeModel } from "@/graph/types";
import { DirectoryStats, FileStats, GithubRepo, GithubTreeItem, LanguageStats, RepositoryTree, RepoStats } from "../types";
import { fetchRepositoryLanguages, fetchRepositoryTree } from "../services/githubService";
import { extensionToLanguage, formatBytes, getLanguageColor } from "../hooks";

export async function analyzeRepository(repo: GithubRepo) {
  const tree = await fetchRepositoryTree(repo.owner, repo.repo);
  const languages = await fetchRepositoryLanguages(repo.owner, repo.repo)

  console.log(tree)

  return {
    tree,
    stats: buildRepoStats(repo.repo, tree, languages),
    graph: buildRepoGraph(tree, repo.repo),
  };
}






















