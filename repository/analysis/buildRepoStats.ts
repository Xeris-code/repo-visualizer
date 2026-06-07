import { RepositoryTree, RepoStats } from "../types"
import { getLanguages } from "./buildLanguageStats"
import { getTopLevelDirectories } from "./buildDirectoryStats"
import { getRepositorySize } from "./buildDirectoryStats"
import { getFileTypes } from "./buildFileStats"

export function buildRepoStats (repoName: string, tree: RepositoryTree, languages: JSON): RepoStats {

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