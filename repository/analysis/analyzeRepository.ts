import { GithubRepo } from "../types";
import { buildRepoStats } from "./buildRepoStats";
import { buildRepoGraph } from "./buildRepoGraph";
import { fetchRepositoryTree, fetchRepositoryLanguages } from "../api";

export async function analyzeRepository(repo: GithubRepo, folderPath: string | null) {
  const tree = await fetchRepositoryTree(repo.owner, repo.repo);
  const languages = await fetchRepositoryLanguages(repo.owner, repo.repo)

  console.log(tree)

  return {
    tree,
    stats: buildRepoStats(repo.repo, tree, languages),
    graph: buildRepoGraph(tree, repo.repo, folderPath),
  };
}






















