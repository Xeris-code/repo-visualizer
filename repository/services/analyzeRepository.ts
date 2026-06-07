import { GraphEdgeModel, GraphModel, GraphNodeModel } from "@/graph/types";
import { DirectoryStats, FileStats, GithubRepo, GithubTreeItem, LanguageStats, RepositoryTree, RepoStats } from "../types";
import { fetchRepositoryLanguages, fetchRepositoryTree } from "./githubService";
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

function buildRepoGraph (tree: RepositoryTree, repoName: string): GraphModel {

  const nodes: GraphNodeModel[] = [];
  const edges: GraphEdgeModel[] = [];

  const foldersPerRow = 6;
  const filesPerRow = 10;
  const NODE_WIDTH = 220;
  const NODE_HEIGHT = 56;
  const GAP_X = 120;
  const GAP_Y = 200;
  const rootX = 2*(NODE_WIDTH + GAP_X) + (NODE_WIDTH + GAP_X)/2

  nodes.push({
    id: "root",
    type: "folder",
    title: repoName,
    subtitle: repoName,
    position: {x: rootX, y: 0},
    metadata: {
      path: repoName,
      size: getRepositorySize(tree.files),
      fileCount: tree.files.length,
      folderCount: tree.folders.length,
      children: getRootChildren(tree),
    },
  });

  const topLevelMap = new Map<string, {
    type: "folder" | "file";
    files: GithubTreeItem[];
    folders: GithubTreeItem[];
  }>();

  for (const file of tree.files) {
    const top = getTopLevel(file.path);

    if (!topLevelMap.has(top)) {
      const isRootFile = !file.path.includes("/");

      topLevelMap.set(top, {
        type: isRootFile ? "file" : "folder",
        files: [],
        folders: [],
      });
    }

    topLevelMap.get(top)!.files.push(file);
  }

  for (const folder of tree.folders) {
    const top = getTopLevel(folder.path);

    if (!topLevelMap.has(top)) {
      topLevelMap.set(top, {
        type: "folder",
        files: [],
        folders: [],
      });
    }

    topLevelMap.get(top)!.folders.push(folder);
  }

  const entries = Array.from(topLevelMap.entries());
  const folders = entries.filter(([, item]) => item.type === "folder");
  const rootFiles = entries.filter(([, item]) => item.type === "file");

  const createdJunctions = new Set<string>();

    folders.forEach(([name, item], index) => {
      const row = Math.floor(index / foldersPerRow);
      const col = index % foldersPerRow;

      const junctionId = `junction-folders-${row}`;

      if (!createdJunctions.has(junctionId)) {
        createdJunctions.add(junctionId);

        nodes.push({
          id: junctionId,
          type: "hidden",
          title: "",
          subtitle: "",
          position: {
            x: rootX + NODE_WIDTH/2,
            y: GAP_Y/2 + row * (NODE_HEIGHT + GAP_Y),
          },
          metadata: {
            path: "__junction__",
          },
        });

        edges.push({
          id: `root-${junctionId}`,
          source: "root",
          target: junctionId,
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "dependency",
        });
      }

      nodes.push({
        id: name,
        type: "folder",
        title: name,
        subtitle: name,
        position: {
          x: 0 + col * (NODE_WIDTH + GAP_X),
          y: GAP_Y + row * (NODE_HEIGHT + GAP_Y),
        },
        metadata: {
          path: name,
          size: formatBytes(
            item.files.reduce((sum, file) => sum + (file.size ?? 0), 0)
          ),
          fileCount: item.files.length,
          folderCount: item.folders.length,
          children: item.files.slice(0, 6).map(file => getNameFromPath(file.path)),
        },
      });

    edges.push({
      id: `${junctionId}-${name}`,
      source: junctionId,
      target: name,
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "dependency",
      visualType: "folder",
    });
  });

  const rootFilesStartY =
  180 + Math.ceil(folders.length / 4) * 160 + 120;

  const createdJunctionsFiles = new Set<string>();

rootFiles.forEach(([name, item], index) => {
  const col = index % filesPerRow;
  const row = Math.floor(index / filesPerRow);

  const file = item.files[0];
  const junctionId = `junction-files-${row}`;

      if (!createdJunctionsFiles.has(junctionId)) {
        createdJunctionsFiles.add(junctionId);

        nodes.push({
          id: junctionId,
          type: "hidden",
          title: "",
          subtitle: "",
          position: {
            x: rootX + NODE_WIDTH/2,
            y: rootFilesStartY - GAP_Y/2 + row * (NODE_HEIGHT + GAP_Y),
          },
          metadata: {
            path: "__junction__",
          },
        });

        edges.push({
          id: `root-${junctionId}`,
          source: "root",
          target: junctionId,
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "dependency",
        });
      }

  nodes.push({
    id: name,
    type: "file",
    title: getNameFromPath(name),
    subtitle: name,
    position: {
      x: -3*(NODE_WIDTH + GAP_X) + col * (NODE_WIDTH + GAP_X),
      y: rootFilesStartY + row * (NODE_HEIGHT + GAP_Y),
    },
    metadata: {
      path: name,
      extension: getExtension(name),
      size: formatBytes(file?.size ?? 0),
      language: getLanguageFromPath(name),
    },
  });

    edges.push({
      id: `${junctionId}-${name}`,
      source: junctionId,
      target: name,
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "dependency",
      visualType: "folder",
    });
});

return {
  nodes,
  edges
}
}

function getRootChildren(tree: RepositoryTree) {
  const topLevelFolders = getTopLevelDirectories(tree.files).map(
    (folder) => folder.name
  );

  const rootFiles = tree.files
    .filter((file) => !file.path.includes("/"))
    .map((file) => file.path);

  return [...topLevelFolders, ...rootFiles];
}

function getNameFromPath(path: string) {
  return path.split("/").pop() ?? path;
}

function getExtension(path: string) {
  const name = getNameFromPath(path);

  if (!name.includes(".")) return "";

  return `.${name.split(".").pop()}`;
}

function getTopLevel(path: string) {
  return path.split("/")[0];
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

export function getLanguageFromPath(path: string): string {

  const fileName = path.split("/").pop()?.toLowerCase();

  if (!fileName) {
    return "Other";
  }

  if (fileName === "dockerfile") {
    return "Dockerfile";
  }

  const extension = fileName.split(".").pop();

  if (!extension) {
    return "Other";
  }

  return extensionToLanguage[extension] ?? "Other";
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
