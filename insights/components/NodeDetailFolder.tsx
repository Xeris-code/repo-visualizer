import { GraphNodeModel } from "@/graph/types";
import { useSharedUserActions } from "@/shared/hooks";
import { InsightsNodeFolderTranslations } from "@/shared/types";
import { Tooltip } from "@/shared/ui";
import { Check, Copy, FolderClosed } from "lucide-react";
import { capitalizeFirstLetter } from "@/shared/utils";
import { NodeFolderChildrenModal } from "./NodeFolderChildrenModal";
import { ViewAllButton } from "@/shared/ui/buttons";

type NodeDetailFolderProps = {
    title: string;
    node: GraphNodeModel;
    translation: InsightsNodeFolderTranslations;
}

export function NodeDetailFolder({title, node, translation}: NodeDetailFolderProps) {

    const {
        copied,
        isModalOpen, setIsModalOpen,
        handleCopy
    } = useSharedUserActions()

    return (
        <div className="flex flex-col gap-4 rounded border card px-3 py-2 ">
            <span className="text-sm font-semibold text-white">{title}</span>
            <div className="flex gap-3 items-center">
                <div className="bg-fuchsia-400/20 rounded p-2">
                    <FolderClosed className="w-8 h-8 text-fuchsia-400"/>
                </div>
                {node.id === "root" ? 
                    <p className="text-xs text-[#7F89A7]">
                        {translation.rootNote}
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
                        <button type="button" onClick={() => handleCopy(node.metadata?.path ? node.metadata.path : "")} className="w-6.25 cursor-pointer hover:text-[#A78BFA]">
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
                            <div>
                                <ViewAllButton
                                    label={translation.childrenList}
                                    count={node.metadata.children.length}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                        }
                        
                    </div>
                </div>
                {isModalOpen && node.metadata?.children && <NodeFolderChildrenModal
                    name={node.title}
                    items={node.metadata.children}
                    translations={translation.modalTranslationsList}
                    onClose={() => setIsModalOpen(false)}
                />
                }
            </div>
        </div>
    );
}