import { GraphModel } from "@/graph/types";
import { RepositoryTree } from "@/repository/types";
import { buildTopLevelGraphLayout } from "@/graph/layout";

export function buildRepoGraph(tree: RepositoryTree, repoName: string): GraphModel {
  return buildTopLevelGraphLayout(tree, repoName);
}