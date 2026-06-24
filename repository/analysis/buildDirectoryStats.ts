import { DirectoryStats, GithubTreeItem, RepositoryTree } from "../types";
import { formatBytes } from "../utils/formatBytes";
import { getTopLevel, getNameFromPath } from "../utils";

export function getRepositorySizeText(files: GithubTreeItem[]): string {
    const totalBytes = files.reduce(
        (sum, file) => sum + (file.size ?? 0),
        0
    );

    return formatBytes(totalBytes);
}

export function getRepositorySizeNumber(files: GithubTreeItem[]): number {
    const totalBytes = files.reduce(
        (sum, file) => sum + (file.size ?? 0),
        0
    );

    return totalBytes;
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

export function getAllDirectories(
  folders: GithubTreeItem[],
  files: GithubTreeItem[],
  repoSize: number
): DirectoryStats {
  const sizeByPath = new Map<string, number>();

  for (const file of files) {
    const size = file.size ?? 0;
    const parts = file.path.split("/");

    for (let i = 1; i < parts.length; i++) {
      const dirPath = parts.slice(0, i).join("/");
      sizeByPath.set(dirPath, (sizeByPath.get(dirPath) ?? 0) + size);
    }
  }

  return folders
    .map((folder) => {
      const sizeBytes = sizeByPath.get(folder.path) ?? 0;
      const segments = folder.path.split("/");
      const name = segments.at(-1) ?? folder.path;
      const parentPath =
        segments.length <= 1 ? "/" : "/" + segments.slice(0, -1).join("/");

      return {
        name,
        path: parentPath,
        fullPath: folder.path,
        size: formatBytes(sizeBytes),
        sizeBytes,
        percentage:
          repoSize === 0
            ? 0
            : Math.round((sizeBytes / repoSize) * 10000) / 100,
      };
    })
    .sort((a, b) => b.sizeBytes - a.sizeBytes);
}