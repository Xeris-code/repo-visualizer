import { Lock, ShieldCheck } from "lucide-react";
import { RepositoryUrlForm } from "../urlForm/RepositoryUrlForm";
import { useAppState } from "@/app-shell/context";


export function RepositoryEmptyState() {

  const { appState, t, actions } = useAppState()

  const status = appState.repoState
  const errorMessage = appState.errorMessage
  const validationTranslations = t.ui.app.messages.validation

  return (
    <div className="m-4 w-full max-w-155 rounded-2xl border border-violet-500/20 bg-[#0B1326]/95 px-10 py-12 shadow-[0_0_0_1px_rgba(109,74,255,0.15),0_0_60px_rgba(109,74,255,0.08)]">
      <div className="mx-auto flex max-w-130 flex-col items-center gap-4 text-center select-none">
        <span className="text-[32px] font-bold leading-10 tracking-tight text-[#F4F7FF]">
          {t.ui.emptyState.title}
        </span>

        <span className="text-[17px] leading-7 text-[#B5BDD3]">
          {t.ui.emptyState.description}
        </span>
      </div>

        
        <RepositoryUrlForm
          status={status}
          errorStateMessage={{message: errorMessage, muted: validationTranslations.github.stateError}}
          inputLabels={{
            button: t.ui.emptyState.link.submit,
            placeholder: t.ui.emptyState.link.placeholder,
            loading: t.ui.emptyState.link.loading,
          }}
          exampleLabels={{
            label: t.ui.emptyState.example.label,
            placeholder: t.ui.emptyState.example.placeholder
          }}
          errorMessage={{message: validationTranslations.github.mainLine, muted: validationTranslations.github.muted}}
          fetching={validationTranslations.github.fetching}
          onAnalyze={actions.handleAnalyze}
        />

      <div className="mt-8 grid grid-cols-2 gap-8 border-t border-white/10 pt-7 select-none">
        <div className="flex items-start justify-center gap-3">
          <Lock className="mt-1 h-5 w-5 shrink-0 text-[#B5BDD3]" strokeWidth={1.7} />

          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#F4F7FF]">
              {t.ui.emptyState.badges.private.label}
            </span>
            <span className="text-[13px] text-[#7F89A7]">
              {t.ui.emptyState.badges.private.description}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-center  gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#B5BDD3]" strokeWidth={1.7} />

          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#F4F7FF]">
              {t.ui.emptyState.badges.safety.label}
            </span>
            <span className="text-[13px] text-[#7F89A7]">
              {t.ui.emptyState.badges.safety.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}