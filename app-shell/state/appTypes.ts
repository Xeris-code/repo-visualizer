import { GithubRepo } from "@/repository/types";
import { AppLanguage } from "@/shared/types/i18n"

export type AppState = {
    lang: AppLanguage;
    name: string;
    appState: "empty" | "loading" | "ready" | "error";
    repoParseResults: GithubRepo | null;
}

export type AppAction = 
    | { type: "SET", target: StringKey<AppState>, value: string}
    | { type: "LOAD_PARSE_RESULTS", value: GithubRepo | null }

export type StringKey<T extends AppState> = {
    [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

