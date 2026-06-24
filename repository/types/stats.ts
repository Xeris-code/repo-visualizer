export type RepoStats = {
    name: string;
    size: string;
    totalFiles: number;
    totalDirectories: number;
    biggestDirectory: {name: string; size: string; percentage: number;};
    dominantLanguage: {name: string; percentage: number; color: string};

    totalComponents: number;
    totalRoutes: number;
    totalLibraries: number;
    architectureScore: number;

    languages: LanguageStats;
    largestDirectories: DirectoryStats;
    allDirectories: DirectoryStats;
    fileTypes: FileStats;
};

export type LanguageStats = {
    name: string;
    bytes: number;
    percentage: number;
    color: string;
}[]

export type DirectoryStats = {
    name: string;
    path: string;
    size: string;
    sizeBytes: number;
    percentage: number;
}[]

export type FileStats = {
    extension: string;
    count: number;
    percentage: number;
}[]

export type GithubFileDetails = {
  linesOfCode: number | null;
  lastModified: string | null;
};