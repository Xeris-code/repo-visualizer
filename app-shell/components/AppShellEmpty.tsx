"use client";

import { AppLayout, EmptyWindowLayout } from "../layout";
import { NavigationBar } from ".";
import { ArchitectureCanvasEmpty } from "@/graph/components";
import { RepositoryEmptyState, InsightsEmptyState } from "@/repository/components";

export function AppShellEmpty () {

    return <AppLayout 
        navbar={<NavigationBar/>}
        sidebar={null}
        mainWindow={<EmptyWindowLayout
            architecture={<ArchitectureCanvasEmpty>
                <RepositoryEmptyState/>
            </ArchitectureCanvasEmpty>}
            insights={<InsightsEmptyState/>}
        />}
    />
}