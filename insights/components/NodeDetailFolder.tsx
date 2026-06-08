import { GraphNodeModel } from "@/graph/types";
import { capitalizeFirstLetter } from "@/shared/hooks";
import { InsightsNodeFolderTranslations } from "@/shared/types";
import { FolderClosed } from "lucide-react";

type NodeDetailFolderProps = {
    title: string;
    node: GraphNodeModel;
    translation: InsightsNodeFolderTranslations;
}

export function NodeDetailFolder({title, node, translation}: NodeDetailFolderProps) {

    return (
        <div className="flex flex-col gap-4 rounded border card px-3 py-2 ">
            <span className="text-sm font-semibold text-white">{title}</span>
            <div className="flex gap-3 items-center">
                <div className="bg-fuchsia-400/20 rounded p-2">
                    <FolderClosed className="w-8 h-8 text-fuchsia-400"/>
                </div>
                {node.id === "root" ? 
                    <p className="text-xs text-[#7F89A7]">
                        This is the root folder of the repository.
                    </p>
                    : <div className="flex flex-col">
                        <span className="text-sm">{node.id}</span>
                        <span className="text-xs leading-relaxed text-[#7F89A7]">{translation.name}</span>
                    </div>
                }
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.path}</span>
                    <span className="w-full text-xs">{node.metadata?.path}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.type}</span>
                    <span className="w-full text-xs">{capitalizeFirstLetter(node.type)}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.size}</span>
                    <span className="w-full text-xs">{node.metadata?.size}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{node.id === "root" ? translation.rootFiles : translation.files}</span>
                    <span className="w-full text-xs">{node.metadata?.fileCount}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{node.id === "root" ? translation.rootFolders : translation.folders}</span>
                    <span className="w-full text-xs">{node.metadata?.folderCount}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.children}</span>
                    <div className="flex flex-col w-full">
                        {node.metadata?.children?.map((child, index) => <span key={index} className="text-xs">{child}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}