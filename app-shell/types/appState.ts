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



