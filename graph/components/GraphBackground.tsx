export function GraphBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(168,179,207,0.14)_1px,transparent_0)] bg-size-[18px_18px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,11,20,0.1),rgba(9,11,20,0.65))]" />

    </div>
  );
}