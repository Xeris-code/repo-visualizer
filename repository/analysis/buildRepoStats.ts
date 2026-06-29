import { RepositoryTree, RepoStats } from "../types"
import { getLanguages } from "./buildLanguageStats"
import { getAllDirectories } from "./buildDirectoryStats"
import { getRepositorySizeText, getRepositorySizeNumber } from "./buildDirectoryStats"
import { getFileTypes } from "./buildFileStats"
import { detectProjectKind, getArchitectureMetrics, getArchitectureScoreDetails } from "../stats/architecture/"

export function buildRepoStats (repoName: string, tree: RepositoryTree, languages: JSON): RepoStats {

    const languageList = getLanguages(languages)
    const allDirectoryList = getAllDirectories(tree.folders, tree.files, getRepositorySizeNumber(tree.files))

    const projectKind = detectProjectKind(tree.files);

    const architectureMetrics = getArchitectureMetrics(
        projectKind,
        tree.files,
        tree.folders
    );

    const architectureScoreDetails = getArchitectureScoreDetails(
        projectKind,
        tree.files,
        tree.folders
    );

    const architectureScore = architectureScoreDetails.score;

    return {
        name: repoName,
        size: getRepositorySizeText(tree.files),
        totalFiles: tree.files.length,
        totalDirectories: tree.folders.length,
        biggestDirectory: allDirectoryList[0],
        dominantLanguage: languageList[0],

        languages: languageList,
        largestDirectories: allDirectoryList.slice(0, 5),
        allDirectories: allDirectoryList,
        fileTypes: getFileTypes(tree.files),

        projectKind,
        architectureMetrics,
        architectureScore,
        architectureScoreDetails,
    }
}
