import { GraphModel } from "@/graph/types";
import { RepositoryTree } from "@/repository/types";
import { buildFolderGraphLayout, buildTopLevelGraphLayout } from "@/graph/layout";

export function buildRepoGraph(tree: RepositoryTree, repoName: string, folderPath: string | null): GraphModel {
  if (folderPath === null) {
    return buildTopLevelGraphLayout(tree, repoName);
  } else {
    return buildFolderGraphLayout(tree, repoName, folderPath);
  }
}

