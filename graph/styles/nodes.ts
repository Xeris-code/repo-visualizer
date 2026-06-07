import { Database, FileText, FolderClosed, Library, LucideIcon, Pipette, Route } from "lucide-react";
import { GraphNodeType } from "../types";
import { GraphNode } from "../components";

export const nodes: Record<GraphNodeType, {icon: LucideIcon, color: string, glow: string, text: string, border: string, bg: string}> = {
    "file": {icon: FileText, color: "#60A5FA", glow: "ring-[#60A5FA]", text: "text-blue-400", border: "border border-blue-400/50",bg: "bg-blue-400/10"},
    "folder": {icon: FolderClosed, color: "#D946EF", glow: "ring-[#D946EF]", text: "text-fuchsia-400", border: "border border-fuchsia-400/50",bg: "bg-fuchsia-400/10"},
    "library": {icon: Library, color: "#F59E0B", glow: "ring-[#F59E0B]", text: "text-amber-400", border: "border border-amber-400/50",bg: "bg-amber-400/10"},
    "route": {icon: Route, color: "#10B981", glow: "ring-[#10B981]", text: "text-emerald-400", border: "border border-emerald-400/50",bg: "bg-emerald-400/10"},
    "database": {icon: Database, color: "#EC4899", glow: "ring-[#EC4899]", text: "text-pink-400", border: "border border-pink-400/50",bg: "bg-pink-400/10"},
    "external": {icon: Pipette, color: "#9CA3AF", glow: "ring-[#9CA3AF]", text: "text-gray-400", border: "border border-gray-400/50",bg: "bg-gray-400/10"},
    "hidden": {icon: Pipette, color: "#9CA3AF", glow: "ring-[#9CA3AF]", text: "text-gray-400", border: "border border-gray-400/50",bg: "bg-gray-400/10"},
}

export const nodeTypes = { repoNode: GraphNode }





