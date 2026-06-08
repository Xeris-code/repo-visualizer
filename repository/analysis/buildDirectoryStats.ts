import { DirectoryStats, GithubTreeItem } from "../types";
import { formatBytes } from "../utils/formatBytes";
import { getTopLevel } from "../utils";

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



export function getRecursiveDirectories (files: GithubTreeItem[]): DirectoryStats {
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
