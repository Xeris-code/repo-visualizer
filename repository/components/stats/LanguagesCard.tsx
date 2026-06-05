import { buildConicGradient, getTopLanguages } from "@/repository/hooks";
import { LanguageStats } from "@/repository/types";
import { StatsLanguagesTranslations } from "@/shared/types";

type LanguagesCardProps = {
    totalFiles: number,
    languages: LanguageStats;
    translation: StatsLanguagesTranslations;
}
export function LanguagesCard({
    totalFiles,
    languages,
    translation,
}: LanguagesCardProps) {

  const displayLanguages = getTopLanguages(languages);
  const gradient = buildConicGradient(displayLanguages);

  return (
    <div className="flex flex-col rounded border border-[#1A2550] bg-[#081020] px-5 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">
          {translation.title}
        </span>

        <button
          type="button"
          className="cursor-pointer text-xs text-[#8B5CF6] transition hover:text-[#A78BFA] hover:underline"
        >
          {translation.list}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <div
          className="relative h-28 w-28 shrink-0 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="absolute inset-4 rounded-full bg-[#081020]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold leading-none text-white">
              {totalFiles}
            </span>
            <span className="mt-1 text-[10px] text-[#7F89A7]">
              {translation.files}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {displayLanguages.map((lang) => (
            <div key={lang.name} className="grid grid-cols-[12px_1fr_50px] items-center gap-x-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: lang.color }}
              />

              <span className="truncate text-xs text-[#7F89A7]">
                {lang.name}
              </span>

              <span className="text-right text-xs text-[#6B7693]">
                ({lang.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}