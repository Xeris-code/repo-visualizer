"use client";

import { AppShellEmpty, AppShellLoading, AppShellError, AppShellReady } from ".";
import { useAppState } from "../context";

export function AppShell(){

    const { appState } = useAppState()

    switch (appState.repoState) {
        case "empty":
            return <AppShellEmpty/>
        case "loading":
            return <AppShellLoading/>
        case "error":
            return <AppShellError/>
        case "ready":
            return <AppShellReady/>
    }
    
}