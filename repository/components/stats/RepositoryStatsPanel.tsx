import { LanguagesCard, DirectoriesCard, FileTypesCard } from "@/repository/components/stats/cards";
import { useAppState } from "@/app-shell/context";


export function RepositoryStatsPanel () {

    const { appState, t } = useAppState()

    const stats = appState.repoStats

    if (!stats) {
        return <div/>
    }

    return (
        <div className="h-full w-full grid grid-cols-3 gap-x-2">
            <LanguagesCard totalFiles={stats.totalFiles} languages={stats.languages} translation={t.ui.stats.languages}/>
            <DirectoriesCard largDirectories={stats.largestDirectories} allDirectories={stats.allDirectories} translation={t.ui.stats.directories}/>
            <FileTypesCard files={stats.fileTypes} translation={t.ui.stats.files}/>
        </div>
    )
}