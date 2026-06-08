type EmptyWindowLayoutProps = {
  architecture: React.ReactNode;
  insights: React.ReactNode;
};

export function EmptyWindowLayout({
  architecture, insights,
}: EmptyWindowLayoutProps) {

  return (
    <div className="grid min-h-0 h-full flex-1 gap-2 overflow-hidden grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-h-0 min-w-0 h-full overflow-hidden rounded border border-[#1A2550] bg-[#081020]">
        {architecture}
      </div>
      <div className="min-h-0 h-full overflow-hidden rounded border border-[#1A2550] bg-[#081020]">
        {insights}
      </div>
    </div>
  )
}