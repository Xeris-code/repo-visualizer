import { DirectoryStats, GithubTreeItem, RepositoryTree } from "../types";
import { formatBytes } from "../utils/formatBytes";
import { getTopLevel, getNameFromPath } from "../utils";

export function getTopLevelDirectories (files: GithubTreeItem[]): DirectoryStats {
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

export function getRepositorySize(files: GithubTreeItem[]): string {
    const totalBytes = files.reduce(
        (sum, file) => sum + (file.size ?? 0),
        0
    );

    return formatBytes(totalBytes);
}

export function getRecursiveFiles(
  files: GithubTreeItem[],
  folderPath: string
): GithubTreeItem[] {
  const prefix = `${folderPath}/`;

  return files.filter((file) => file.path.startsWith(prefix));
}

export function getUpperDirectFolderStats(tree: RepositoryTree, folderPath: string) {
  const children = getDirectChildren(tree, folderPath);

  return {
    fileCount: children.files.length,
    folderCount: children.folders.length,
    children: [
      ...children.folders.map((folder) => getNameFromPath(folder.path)),
      ...children.files.map((file) => getNameFromPath(file.path)),
    ].slice(0, 8),
  };
}


export function getDirectFolderStats(
  folderPath: string,
  tree: RepositoryTree
) {
  const normalized = folderPath.endsWith("/")
    ? folderPath
    : `${folderPath}/`;

  const directFiles = tree.files.filter((file) => {
    const rest = file.path.replace(normalized, "");

    return file.path.startsWith(normalized) && !rest.includes("/");
  });

  const directFolders = tree.folders.filter((folder) => {
    const rest = folder.path.replace(normalized, "");

    return folder.path.startsWith(normalized) && rest && !rest.includes("/");
  });

  return {
    files: directFiles.length,
    folders: directFolders.length,
    children: [
      ...directFolders.map((folder) => folder.path.split("/").pop() ?? folder.path),
      ...directFiles.map((file) => file.path.split("/").pop() ?? file.path),
    ],
  };
}

export function sumFilesSize(files: GithubTreeItem[]) {
    return files.reduce((sum, file) => sum + (file.size ?? 0), 0);
}

export function getRootChildren(tree: {
    files: GithubTreeItem[];
    folders: GithubTreeItem[];
}) {
    const folders = Array.from(
        new Set(tree.folders.map((folder) => getTopLevel(folder.path)))
    );

    const rootFiles = tree.files
        .filter((file) => !file.path.includes("/"))
        .map((file) => file.path);

    return [...folders, ...rootFiles];
}



export function getDirectChildren(tree: RepositoryTree, folderPath: string | null) {
  const prefix = folderPath ? `${folderPath}/` : "";

  const files = tree.files.filter((file) => {
    if (!file.path.startsWith(prefix)) return false;

    const rest = file.path.slice(prefix.length);
    return rest.length > 0 && !rest.includes("/");
  });

  const folders = tree.folders.filter((folder) => {
    if (!folder.path.startsWith(prefix)) return false;

    const rest = folder.path.slice(prefix.length);
    return rest.length > 0 && !rest.includes("/");
  });

  return {
    files: files,
    folders: folders,
  };
}