import { LanguagesCard, LargestDirectoriesCard, FileTypesCard } from "@/repository/components/stats";
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
            <LargestDirectoriesCard dir={stats.largestDirectories} translation={t.ui.stats.directories}/>
            <FileTypesCard files={stats.fileTypes} translation={t.ui.stats.files}/>
        </div>
    )
}