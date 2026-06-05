import { LanguageStats, FileStats } from "../types";

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

export function getTopLanguages(
    languages: LanguageStats,
    limit: number = 4
) {
    const visibleLanguages = languages.slice(0, limit);

    const otherLanguages = languages.slice(limit);

    const other = {
        name: "Other",
        percentage: otherLanguages.reduce((sum, file) => sum + file.percentage, 0),
        color: "#9CA3AF"
    };

    const displayLanguages =
        otherLanguages.length > 0
            ? [...visibleLanguages, other]
            : visibleLanguages;

    return displayLanguages
}

export function buildConicGradient(languages: LanguageStats) {
    let start = 0;

    return languages
        .map((lang) => {
            const end = start + lang.percentage * 3.6;
            const segment = `${lang.color} ${start}deg ${end}deg`;
            start = end;
            return segment;
        }).join(", ");
}