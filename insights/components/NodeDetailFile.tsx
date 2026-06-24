import { GraphNodeModel } from "@/graph/types";
import { GithubFileDetails } from "@/repository/types";
import { fetchGithubFileDetails } from "@/repository/api";
import { capitalizeFirstLetter } from "@/shared/hooks";
import { InsightsNodeFileTranslations } from "@/shared/types";
import { Check, Copy, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "@/shared/ui";

type NodeDetailFileProps = {
    title: string;
    node: GraphNodeModel;
    owner: string;
    repo: string;
    translation: InsightsNodeFileTranslations;
}

export function NodeDetailFile({title, node, owner, repo, translation}: NodeDetailFileProps) {

    const [details, setDetails] = useState<GithubFileDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const path = node.metadata?.path;

        if (!path) {
            return
        };

        let cancelled = false;

        async function loadDetails() {
            setLoading(true);

            const result = await fetchGithubFileDetails(owner, repo, path!);

            if (!cancelled) {
            setDetails(result);
            setLoading(false);
            }
        }

        loadDetails();

        return () => {
            cancelled = true;
        };
    }, [owner, repo, node.metadata?.path]);

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
                <div className="bg-blue-400/20 rounded p-2">
                    <FileText className="w-8 h-8 text-blue-400"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm">{node.title}</span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{node.metadata?.extension?.toUpperCase()} {translation.name}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.path}</span>
                    <div className="w-full grid grid-cols-[1fr_20px] items-center justify-between gap-4">
                        <span className="text-xs truncate">{node.metadata?.path}</span>
                        <button type="button" onClick={handleCopy} className="w-6.25 cursor-pointer hover:text-[#A78BFA]">
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
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.language}</span>
                    <span className="w-full text-xs">{node.metadata?.language}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.codeLines}</span>
                    <span className="w-full text-xs">{loading ? "Loading..." : details?.linesOfCode ?? "—"}</span>
                </div>
                <div className="flex">
                    <span className="w-3/5 select-none text-xs leading-relaxed text-[#7F89A7]">{translation.modified}</span>
                    <span className="w-full text-xs">{loading ? "Loading..." : details?.lastModified ? new Date(details.lastModified).toLocaleDateString() : "—"} </span>
                </div>
            </div>
        </div>
    );
}