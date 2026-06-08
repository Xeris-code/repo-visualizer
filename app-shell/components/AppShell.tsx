"use client";

import { useReducer } from "react";
import { AppShellVisual } from "@/app-shell/components";
import { appReducer, initialAppState } from "@/app-shell/state";
import { translations } from "@/i18n";

export function AppShell(){

    const [appState, dispatch] = useReducer(appReducer, initialAppState)
    const t = translations[appState.lang]

    return <AppShellVisual
        appState={appState}
        translation={t}
        dispatch={dispatch}
    />
}