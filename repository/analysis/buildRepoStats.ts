import { RepositoryTree, RepoStats } from "../types"
import { getLanguages } from "./buildLanguageStats"
import { getAllDirectories } from "./buildDirectoryStats"
import { getRepositorySizeText, getRepositorySizeNumber } from "./buildDirectoryStats"
import { getFileTypes } from "./buildFileStats"

export function buildRepoStats (repoName: string, tree: RepositoryTree, languages: JSON): RepoStats {

    const languageList = getLanguages(languages)
    const allDirectoryList = getAllDirectories(tree.folders, tree.files, getRepositorySizeNumber(tree.files))

    return {
        name: repoName,
        size: getRepositorySizeText(tree.files),
        totalFiles: tree.files.length,
        totalDirectories: tree.folders.length,
        biggestDirectory: allDirectoryList[0],
        dominantLanguage: languageList[0],

        totalComponents: 0,
        totalLibraries: 0,
        totalRoutes: 0,
        architectureScore: 0,

        languages: languageList,
        largestDirectories: allDirectoryList.slice(0, 5),
        allDirectories: allDirectoryList,
        fileTypes: getFileTypes(tree.files),
    }
}
