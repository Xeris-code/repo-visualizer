import { RepoStats } from "@/repository/types";
import { InsightsNoNodeTranslations } from "@/shared/types";
import { Tooltip } from "@/shared/ui";

type RepositorySummaryInsightsProps = {
    translations: InsightsNoNodeTranslations;
    repo: RepoStats;
}

export function RepositorySummaryInsights({translations, repo}: RepositorySummaryInsightsProps) {

  return (
    <div className="flex flex-col rounded border card">
      <span className="px-3 py-2 text-sm font-semibold text-white">{translations.title}</span>
      <div className="grid grid-cols-2 border-t card">
        <div className="flex flex-col col-span-2 text-center border-b card py-2 overflow-hidden">
            <Tooltip label={repo.name}>
              <span className="text-sm truncate">
                {repo.name}
              </span>
            </Tooltip>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.repo}</span>
        </div>
        <div className="grid grid-cols-1">
          <div className="flex flex-col items-center border-b card py-2 min-w-0">
            <span className="text-sm">{repo.projectKind}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.project}</span>
          </div>
          <div className="flex flex-col items-center border-b card py-2">
            <span className="text-sm">{repo.fileTypes[0].extension}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.fileTop}</span>
          </div>
          <div className="flex flex-col items-center border-b card py-2">
            <span style={{color: repo.dominantLanguage.color}} className="text-sm">{repo.dominantLanguage.name}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.lang}</span>
          </div>
          <div className="flex flex-col items-center border-b card py-2">
            <span className="text-sm">{repo.biggestDirectory.name}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.dir}</span>
          </div>
          <div className="flex flex-col items-center border-b border-r card py-2">
            <span className="text-sm text-white">{repo.totalFiles}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.fileCount}</span>
          </div>
          <div className="flex flex-col items-center border-r card py-2">
            <span className="text-sm text-white">{repo.fileTypes.length}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.fileTypes}</span>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="flex flex-col items-center justify-center border-b card py-2">
            <span className="text-sm text-white">{repo.size}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.size}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-b card py-2">
            <span className="text-sm text-white">{repo.fileTypes[0].percentage}%</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.percentage}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-b card py-2">
            <span className="text-sm text-white">{repo.dominantLanguage.percentage}%</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.percentage}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-b card py-2">
            <span className="text-sm text-white">{repo.biggestDirectory.size}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.size}</span>
          </div>
          <div className="flex flex-col items-center border-b card py-2">
            <span className="text-sm text-white">{repo.totalDirectories}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.dirCount}</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <span className="text-sm text-white">{repo.languages.length}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.langCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}