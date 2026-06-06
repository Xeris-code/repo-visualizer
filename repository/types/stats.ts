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
    fileTypes: FileStats;
};

export type LanguageStats = {
    name: string;
    percentage: number;
    color: string;
}[]

export type DirectoryStats = {
    name: string;
    size: string;
    percentage: number;
}[]

export type FileStats = {
    extension: string;
    count: number;
    percentage: number;
}[]