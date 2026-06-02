type AppLayoutProps = {
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
  mainWindow: React.ReactNode;
};

export function AppLayout({ navbar, sidebar, mainWindow }: AppLayoutProps) {
  return (
    <main className="h-screen overflow-hidden bg-[#090B14] text-[#F4F7FF]">
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        <div className="shrink-0">{navbar}</div>

        <div className="flex min-h-0 flex-1 gap-2 overflow-hidden p-2">
          <aside className="w-62.5 shrink-0 overflow-hidden rounded-2xl border border-[#1A2550] bg-[#081020]">
            {sidebar}
          </aside>

          <section className="min-w-0 flex-1 overflow-hidden">
            {mainWindow}
          </section>
        </div>
      </div>
    </main>
  );
}