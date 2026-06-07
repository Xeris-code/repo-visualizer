import {
  Database,
  FileCode2,
  FolderGit2,
  GitBranch,
  Network,
  Boxes,
} from "lucide-react";

function GhostIcon({
  icon: Icon,
  className,
}: {
  icon: React.ElementType;
  className: string;
}) {
  return (
    <div
      className={`absolute flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 bg-white/1.5 text-white/10 ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.25} />
    </div>
  );
}

export function GraphBackgroundEmpty() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(168,179,207,0.14)_1px,transparent_0)] bg-size-[18px_18px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,11,20,0.1),rgba(9,11,20,0.65))]" />

      <GhostIcon icon={FolderGit2} className="left-[14%] top-[17%]" />
      <GhostIcon icon={FileCode2} className="left-[9%] top-[48%]" />
      <GhostIcon icon={GitBranch} className="left-[28%] bottom-[17%]" />
      <GhostIcon icon={FolderGit2} className="right-[18%] top-[15%]" />
      <GhostIcon icon={Network} className="right-[24%] bottom-[24%]" />
      <GhostIcon icon={Database} className="right-[10%] bottom-[15%]" />
      <GhostIcon icon={Boxes} className="left-[45%] top-[28%]" />

      <div className="absolute left-[17%] top-[24%] h-px w-[25%] border-t border-dashed border-violet-500/25" />
      <div className="absolute left-[17%] top-[24%] h-[17%] border-l border-dashed border-blue-500/20" />

      <div className="absolute right-[20%] top-[23%] h-[24%] border-l border-dashed border-violet-500/20" />
      <div className="absolute right-[20%] top-[47%] h-px w-[16%] border-t border-dashed border-blue-500/20" />

      <div className="absolute left-[25%] bottom-[25%] h-px w-[34%] border-t border-dashed border-emerald-500/20" />
      <div className="absolute right-[17%] bottom-[22%] h-[14%] border-l border-dashed border-amber-500/20" />

      <div className="absolute left-[39%] top-[34%] h-[34%] border-l border-dashed border-violet-500/20" />
      <div className="absolute left-[39%] top-[68%] h-px w-[27%] border-t border-dashed border-emerald-500/20" />

      <div className="absolute left-1/2 top-[45%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute left-[58%] top-[58%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
    </div>
  );
}