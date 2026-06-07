import { AppState } from "@/app-shell";

export const initialAppState: AppState = {
    lang: "en",
    name: "Repo",
    repoState: "empty",
    repoView: "empty",
    repoParseResults: null,
    selectedNodeId: null,
    repoStats: null,
    repoGraph: null,
    errorMessage: null,
};