import { LanguageStats } from "../types";
import { getLanguageColor } from "../utils/languages";

export function getLanguages (languages: JSON): LanguageStats {
    const total = Object.values(languages)
    .reduce((sum, bytes) => sum + bytes, 0);

    const result = Object.entries(languages).map(
        ([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / total) * 1000) / 10,
        color: getLanguageColor(name)
        })
    ).sort((a, b) => b.percentage - a.percentage);;
    
    return result
}

