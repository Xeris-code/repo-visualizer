import { Lock, ShieldCheck } from "lucide-react";
import { EmptyStateTranslations, ValidationTranslations } from "@/shared/types";
import { RepositoryUrlForm } from "./RepositoryUrlForm";
import { GithubRepo } from "../types";

type RepositoryEmptyStateProps = {
  translations: EmptyStateTranslations;
  validationTranslations: ValidationTranslations;
  onAnalyze: (results: GithubRepo) => void;
};

export function RepositoryEmptyState({
  translations, validationTranslations, onAnalyze
}: RepositoryEmptyStateProps) {
  return (
    <div className="m-4 w-full max-w-155 rounded-2xl border border-violet-500/20 bg-[#0B1326]/95 px-10 py-12 shadow-[0_0_0_1px_rgba(109,74,255,0.15),0_0_60px_rgba(109,74,255,0.08)]">
      <div className="mx-auto flex max-w-130 flex-col items-center gap-4 text-center">
        <span className="text-[32px] font-bold leading-10 tracking-tight text-[#F4F7FF]">
          {translations.title}
        </span>

        <span className="text-[17px] leading-7 text-[#B5BDD3]">
          {translations.description}
        </span>
      </div>

        
        <RepositoryUrlForm
          submit={translations.link.submit}
          placeholder={translations.link.placeholder}
          translations={validationTranslations}
          onAnalyze={onAnalyze}
        />

        

        <div className="mt-6 text-center text-[14px] text-[#7F89A7]">
        {translations.example.label}:{" "}
        <button
            type="button"
            className="cursor-pointer text-[#8B5CF6] underline-offset-4 transition hover:text-[#A78BFA] hover:underline"
        >
            {translations.example.placeholder}
        </button>
        </div>

      <div className="mt-8 grid grid-cols-2 gap-8 border-t border-white/10 pt-7">
        <div className="flex items-start gap-3">
          <Lock className="mt-1 h-5 w-5 shrink-0 text-[#B5BDD3]" strokeWidth={1.7} />

          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#F4F7FF]">
              {translations.badges.private.label}
            </span>
            <span className="text-[13px] text-[#7F89A7]">
              {translations.badges.private.description}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#B5BDD3]" strokeWidth={1.7} />

          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#F4F7FF]">
              {translations.badges.safety.label}
            </span>
            <span className="text-[13px] text-[#7F89A7]">
              {translations.badges.safety.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}