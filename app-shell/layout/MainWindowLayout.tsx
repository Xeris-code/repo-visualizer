type MainWindowLayoutProps = {
  overview: React.ReactNode;
  architecture: React.ReactNode;
  insights: React.ReactNode;
  stats: React.ReactNode;
};

export function MainWindowLayout({
  overview, architecture, insights, stats
}: MainWindowLayoutProps) {

  return (
    <div className="flex min-h-0 h-full flex-col gap-2 overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded border border-[#1A2550] bg-[#081020]">
        {overview}
      </div>
      <div className="grid min-h-0 flex-1 gap-2 overflow-hidden grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_180px] gap-2 overflow-hidden">
          <div className="min-h-0 min-w-0 overflow-hidden rounded border border-[#1A2550] bg-[#081020]">
            {architecture}
          </div>
          <div className="min-h-0 overflow-x-hidden overflow-y-auto noScroll">
            {stats}
          </div>
        </div>
        <div className="min-h-0 overflow-hidden rounded border border-[#1A2550] bg-[#081020]">
          {insights}
        </div>
      </div>
    </div>
  );
}