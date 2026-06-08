import { GithubRepo, RepoStats, RepositoryTree } from "@/repository/types";
import { AppLanguage } from "@/shared/types/i18n"

export type AppState = {
    lang: AppLanguage;
    isGraphFullscreen: boolean;
    name: string;
    repoState: repoState;
    repoView: repoView;
    repoParseResults: GithubRepo | null;
    selectedNodeId: string | null;
    repoStats: RepoStats | null;
    repoTree: RepositoryTree | null;
    errorMessage: string | null;
    currentGraphPath: string | null;
}

export type repoState = "empty" | "loading" | "ready" | "error";
export type repoView = "empty" | "dashboard";



