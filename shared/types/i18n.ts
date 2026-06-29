import { en } from "@/i18n/en";

export const languageCodes = ["en"] as const;

type DeepWiden<T> =
  T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends readonly (infer U)[]
          ? Array<DeepWiden<U>>
          : T extends object
            ? { -readonly [K in keyof T]: DeepWiden<T[K]> }
            : T;

export type TranslationSchema = DeepWiden<typeof en>;
export type AppLanguage = (typeof languageCodes)[number];

export type AppTranslations = TranslationSchema["ui"]["app"]
export type OverviewTranslations = TranslationSchema["ui"]["overview"]
export type EmptyStateTranslations = TranslationSchema["ui"]["emptyState"]
export type ValidationTranslations = TranslationSchema["ui"]["app"]["messages"]["validation"]
export type GithubValidationTranslations = TranslationSchema["ui"]["app"]["messages"]["validation"]["github"]

export type GraphTranslations = TranslationSchema["ui"]["graph"]
export type GraphTranslationsLegend = TranslationSchema["ui"]["graph"]["legend"]

export type StatsTranslations = TranslationSchema["ui"]["stats"]
export type StatsLanguagesTranslations = TranslationSchema["ui"]["stats"]["languages"]
export type StatsDirectoriesTranslations = TranslationSchema["ui"]["stats"]["directories"]
export type StatsFilesTranslations = TranslationSchema["ui"]["stats"]["files"]

export type InsightsTranslations = TranslationSchema["ui"]["insights"]
export type InsightsNoNodeTranslations = TranslationSchema["ui"]["insights"]["noNode"]
export type InsightsNodeTranslations = TranslationSchema["ui"]["insights"]["node"]
export type InsightsNodeFileTranslations = TranslationSchema["ui"]["insights"]["node"]["file"]
export type InsightsNodeFolderTranslations = TranslationSchema["ui"]["insights"]["node"]["folder"]
export type InsightsNodeFolderModalTranslations = TranslationSchema["ui"]["insights"]["node"]["folder"]["modalTranslationsList"]

export type GraphTooltipTranslations = TranslationSchema["ui"]["graph"]["tooltip"]

export type FilesListTranslations = TranslationSchema["ui"]["stats"]["files"]["listTranslations"]
export type LanguagesListTranslations = TranslationSchema["ui"]["stats"]["languages"]["listTranslations"]
export type DirectoriesListTranslations = TranslationSchema["ui"]["stats"]["directories"]["listTranslations"]

export type ArchitectureScoreTranslations = TranslationSchema["ui"]["overview"]["architectureScore"]