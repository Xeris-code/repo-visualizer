import { GithubRepo } from "@/repository/types";
import { AppLanguage } from "@/shared/types/i18n"

export type AppState = {
    lang: AppLanguage;
    name: string;
    repoState: repoState;
    repoView: repoView;
    repoParseResults: GithubRepo | null;
}

export type repoState = "empty" | "loading" | "ready" | "error";
export type repoView = "empty" | "dashboard";

export type AppAction = 
    | { type: "SET", target: StringKey<AppState>, value: string}
    | { type: "RESET" }
    | { type: "LOAD_PARSE_RESULTS", value: GithubRepo | null }

export type StringKey<T extends AppState> = {
    [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

