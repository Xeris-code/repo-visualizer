import { GraphModel } from "@/graph/types";
import { GithubRepo, RepoStats } from "@/repository/types";
import { AppLanguage } from "@/shared/types/i18n"

export type AppState = {
    lang: AppLanguage;
    name: string;
    repoState: repoState;
    repoView: repoView;
    repoParseResults: GithubRepo | null;
    selectedNodeId: string | null;
    repoStats: RepoStats | null;
    repoGraph: GraphModel | null;
    errorMessage: string | null;
}

export type repoState = "empty" | "loading" | "ready" | "error";
export type repoView = "empty" | "dashboard";

export type AppAction = 
    | { type: "SET", target: StringKey<AppState>, value: string | null }
    | { type: "RESET" }
    | { type: "LOAD_PARSE_RESULTS", value: GithubRepo | null }
    | { type: "LOAD_REPO_STATS", value: RepoStats | null }
    | { type: "LOAD_REPO_GRAPH", value: GraphModel | null }

export type StringKey<T extends AppState> = {
    [K in keyof T]: T[K] extends string | null ? K : never
}[keyof T]

