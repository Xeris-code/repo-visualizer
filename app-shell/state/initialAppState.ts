import { AppState } from "@/app-shell";

export const initialAppState: AppState = {
    lang: "en",
    isGraphFullscreen: false,
    name: "Repo",
    repoState: "empty",
    repoView: "empty",
    repoParseResults: null,
    selectedNodeId: null,
    repoStats: null,
    repoTree: null,
    errorMessage: null,
    currentGraphPath: null,
};