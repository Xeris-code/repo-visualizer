import { GraphBackgroundEmpty } from "./GraphBackgroundEmpty";

export function ArchitectureCanvasEmpty({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative h-full rounded-2xl card">
      <GraphBackgroundEmpty />

      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </section>
  );
}