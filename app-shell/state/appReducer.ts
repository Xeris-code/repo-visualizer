import { AppAction, AppState } from "@/app-shell";

export function appReducer (state: AppState, action: AppAction): AppState {
    switch(action.type){
        case "SET":
            return {...state, [action.target]: action.value}
        case "LOAD_PARSE_RESULTS":
            return {...state, repoParseResults: action.value}
    }
};