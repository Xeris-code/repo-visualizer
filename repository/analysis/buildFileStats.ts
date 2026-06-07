import { FileStats, GithubTreeItem } from "../types"

export function getFileTypes (files: GithubTreeItem[]): FileStats {

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

export function getTopFiles(
    files: FileStats,
    limit: number = 4
) {
    const visibleFiles = files.slice(0, limit);

    const otherFiles = files.slice(limit);

    const other = {
        extension: "Other",
        count: otherFiles.reduce((sum, file) => sum + file.count, 0),
        percentage: otherFiles.reduce((sum, file) => sum + file.percentage, 0),
    };

    const displayFiles =
        otherFiles.length > 0
            ? [...visibleFiles, other]
            : visibleFiles;

    return displayFiles
}