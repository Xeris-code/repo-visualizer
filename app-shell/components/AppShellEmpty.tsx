"use client";

import { TranslationSchema } from "@/shared/types";
import { AppLayout, EmptyWindowLayout } from "../layout";
import { NavigationBar } from ".";
import { ArchitectureCanvasEmpty } from "@/graph/components";
import { RepositoryEmptyState, InsightsEmptyState } from "@/repository/components";
import { repoState } from "../types";
import { GithubRepo } from "@/repository/types";

type AppShellEmptyProps = {
    isEmpty: boolean;
    repoState: repoState;
    errorMessage: string | null;
    translation: TranslationSchema;
    handleAnalyze: (repo: GithubRepo) => void;
};

export function AppShellEmpty ({
    isEmpty, repoState, errorMessage, translation,
    handleAnalyze
}: AppShellEmptyProps) {
    return <AppLayout 
        navbar={<NavigationBar
            isEmpty={isEmpty}
            translations={{app: translation.ui.app}}
        />}
        sidebar={null}
        mainWindow={<EmptyWindowLayout
            architecture={<ArchitectureCanvasEmpty>
                <RepositoryEmptyState
                    status={repoState}
                    errorMessage={errorMessage}
                    translations={translation.ui.emptyState}
                    validationTranslations={translation.ui.app.messages.validation}
                    onAnalyze={handleAnalyze}
                />
            </ArchitectureCanvasEmpty>}
            insights={<InsightsEmptyState translations={translation.ui.emptyState}/>}
        />}
    />
}