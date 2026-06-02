import { GraphBackground } from "./GraphBackground";

export function ArchitectureCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative h-full rounded-2xl border card">
      <GraphBackground />

      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </section>
  );
}