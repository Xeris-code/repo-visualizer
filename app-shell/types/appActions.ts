import { AppState } from "@/app-shell"
import { GraphModel } from "@/graph/types";
import { GithubRepo, RepoStats } from "@/repository/types";

export type AppAction = 
    | { type: "SET", target: StringKey<AppState>, value: string | null }
    | { type: "RESET" }
    | { type: "LOAD_PARSE_RESULTS", value: GithubRepo | null }
    | { type: "LOAD_REPO_STATS", value: RepoStats | null }
    | { type: "LOAD_REPO_GRAPH", value: GraphModel | null }

export type StringKey<T extends AppState> = {
    [K in keyof T]: T[K] extends string | null ? K : never
}[keyof T]