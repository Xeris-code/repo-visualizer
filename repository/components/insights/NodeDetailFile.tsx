import { GraphNodeModel } from "@/graph/types";
import { InsightsNodeFileTranslations } from "@/shared/types";
import { FileText } from "lucide-react";

type NodeDetailFileProps = {
    title: string;
    node: GraphNodeModel;
    translation: InsightsNodeFileTranslations;
}

export function NodeDetailFile({title, node, translation}: NodeDetailFileProps) {

    return (
        <div className="flex flex-col gap-4 rounded border card p-3">
            <span className="text-sm font-semibold text-white">{title}</span>
            <div className="flex gap-3 items-center">
                <div className="bg-blue-400/20 rounded p-2">
                    <FileText className="w-8 h-8 text-cyan-400"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm">{node.id}{node.metadata?.extension}</span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{node.metadata?.extension?.toUpperCase()} {translation.name}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.path}</span>
                    <span className="w-full text-xs">{node.metadata?.path}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.type}</span>
                    <span className="w-full text-xs">{node.type}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.size}</span>
                    <span className="w-full text-xs">{node.metadata?.size}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.language}</span>
                    <span className="w-full text-xs">{node.metadata?.language}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.codeLines}</span>
                    <span className="w-full text-xs">tba</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.modified}</span>
                    <span className="w-full text-xs">tba</span>
                </div>
            </div>
        </div>
    );
}