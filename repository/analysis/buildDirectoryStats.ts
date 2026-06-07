export function getRootChildren(tree: RepositoryTree) {
    const topLevelFolders = getTopLevelDirectories(tree.files).map(
        (folder) => folder.name
    );

    const rootFiles = tree.files
        .filter((file) => !file.path.includes("/"))
        .map((file) => file.path);

    return [...topLevelFolders, ...rootFiles];
}

export function getRepositorySize(files: GithubTreeItem[]): string {
    const totalBytes = files.reduce(
        (sum, file) => sum + (file.size ?? 0),
        0
    );

    return formatBytes(totalBytes);
}

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