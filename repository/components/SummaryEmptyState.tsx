import { EmptyStateTranslations } from "@/shared/types";

type SummaryEmptyStateProps = {
  translations: EmptyStateTranslations;
};

export function SummaryEmptyState({
  translations,
}: SummaryEmptyStateProps) {
  return (
    <div className="flex h-full items-center justify-between rounded-2xl border border-[#1A2550] bg-[#081020] p-6">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-white">
          {translations.summary.label}
        </h3>
        <p className="text-xs leading-relaxed text-[#7F89A7]">
          {translations.summary.description}
        </p>
      </div>
    </div>
  );
}
