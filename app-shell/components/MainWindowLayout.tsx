type MainWindowLayoutProps = {
  overview: React.ReactNode;
  architecture: React.ReactNode;
  summary: React.ReactNode;
  stats: React.ReactNode;
};

export function MainWindowLayout({
  overview,
  architecture,
  summary,
  stats,
}: MainWindowLayoutProps) {
  return (
    <div className="flex min-h-0 h-full flex-col gap-2 overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded-2xl border border-[#1A2550] bg-[#081020]">{overview}</div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_280px] gap-2 overflow-hidden">
        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_180px] gap-2 overflow-hidden">
          <div className="min-h-0 overflow-hidden rounded-2xl border border-[#1A2550] bg-[#081020]">{architecture}</div>
          <div className="min-h-0 overflow-hidden rounded-2xl border border-[#1A2550] bg-[#081020]">{stats}</div>
        </div>

        <div className="min-h-0 overflow-hidden rounded-2xl border border-[#1A2550] bg-[#081020]">{summary}</div>
      </div>
    </div>
  );
}