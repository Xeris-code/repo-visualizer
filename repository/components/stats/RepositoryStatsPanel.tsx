import { StatsTranslations } from "@/shared/types";
import { LanguagesCard, LargestDirectoriesCard, FileTypesCard } from "@/repository/components/stats";
import { RepoStats } from "@/repository/types";

type RepositoryStatsPanelProps = {
    stats: RepoStats;
    translation: StatsTranslations;
}

export function RepositoryStatsPanel ({
    stats, translation,
}: RepositoryStatsPanelProps) {


    return (
        <div className="h-full w-full grid grid-cols-3 gap-x-2">
            <LanguagesCard totalFiles={stats.totalFiles} languages={stats.languages} translation={translation.languages}/>
            <LargestDirectoriesCard dir={stats.largestDirectories} translation={translation.directories}/>
            <FileTypesCard files={stats.fileTypes} translation={translation.files}/>
        </div>
    )
}