import { AppAction, AppState, initialAppState } from "@/app-shell";

export function appReducer (state: AppState, action: AppAction): AppState {
    switch(action.type){
        case "RESET":
            return initialAppState
        case "SET":
            return {...state, [action.target]: action.value}
        case "LOAD_PARSE_RESULTS":
            return {...state, repoParseResults: action.value}
    }
};