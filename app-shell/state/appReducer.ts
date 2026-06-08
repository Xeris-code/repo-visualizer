import { AppAction, AppState, initialAppState } from "@/app-shell";

export function getParentPath(
    path: string | null
): string | null {
    if (!path) {
        return null;
    }

    const parts = path.split("/");

    parts.pop();

    return parts.length
        ? parts.join("/")
        : null;
    }

export function appReducer (state: AppState, action: AppAction): AppState {
    switch(action.type){
        case "RESET":
            return initialAppState
        case "SET":
            return {...state, [action.target]: action.value}
        case "SET_REPO_TREE":
            return {...state, repoTree: action.value}
        case "SET_FULLSCREEN":
            return {...state, isGraphFullscreen: action.value}
        case "LOAD_PARSE_RESULTS":
            return {...state, repoParseResults: action.value}
        case "LOAD_REPO_STATS":
            return {...state, repoStats: action.value}
        case "OPEN_FOLDER":
            return {...state, currentGraphPath: action.payload}
        case "GO_UP_FOLDER":
            return {...state, currentGraphPath:getParentPath(state.currentGraphPath)}
    }
};