import { GraphNodeModel } from "@/graph/types";
import { capitalizeFirstLetter } from "@/shared/hooks";
import { InsightsNodeFolderTranslations } from "@/shared/types";
import { Tooltip } from "@/shared/ui";
import { Check, Copy, FolderClosed } from "lucide-react";
import { useState } from "react";

type NodeDetailFolderProps = {
    title: string;
    node: GraphNodeModel;
    translation: InsightsNodeFolderTranslations;
}

export function NodeDetailFolder({title, node, translation}: NodeDetailFolderProps) {

    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(node.metadata?.path ? node.metadata.path : "");
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

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
                        <span className="text-sm">{node.title}</span>
                        <span className="text-xs leading-relaxed text-[#7F89A7]">{translation.name}</span>
                    </div>
                }
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.path}</span>
                    <div className="w-full grid grid-cols-[1fr_20px] items-center justify-between gap-4">
                        <span className="text-xs truncate">{node.metadata?.path}</span>
                        <button type="button" onClick={handleCopy} className="w-[25px] cursor-pointer hover:text-[#A78BFA]">
                            <Tooltip label={copied ? "Copied!" : "Copy"}>
                                {copied ? <Check size={15}/> : <Copy size={15}/>}
                            </Tooltip>
                        </button>
                    </div>
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
                        {node.metadata?.children?.slice(0, 5).map((child, index) => <span key={index} className="text-xs">{child}</span>)}
                        {(node.metadata?.children && node.metadata.children.length > 5) && 
                            <div className="">
                                <button
                                    type="button"
                                    className="cursor-pointer text-xs text-[#8B5CF6] transition hover:text-[#A78BFA] hover:underline"
                                >
                                    {`${translation.childrenList} (${node.metadata.children.length})`}
                                </button>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}