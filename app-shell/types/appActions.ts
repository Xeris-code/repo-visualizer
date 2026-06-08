import { AppState } from "@/app-shell"
import { GithubRepo, RepositoryTree, RepoStats } from "@/repository/types";

export type AppAction = 
    | { type: "SET", target: StringKey<AppState>, value: string | null }
    | { type: "SET_REPO_TREE", value: RepositoryTree}
    | { type: "SET_FULLSCREEN", value: boolean}
    | { type: "RESET" }
    | { type: "LOAD_PARSE_RESULTS", value: GithubRepo | null }
    | { type: "LOAD_REPO_STATS", value: RepoStats | null }
    | { type: "OPEN_FOLDER"; payload: string }
    | { type: "GO_UP_FOLDER" }

export type StringKey<T extends AppState> = {
    [K in keyof T]: T[K] extends string | null ? K : never
}[keyof T]