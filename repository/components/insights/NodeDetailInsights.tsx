import { GraphNodeModel } from "@/graph/types";
import { InsightsNodeTranslations } from "@/shared/types";
import { NodeDetailFile } from "./NodeDetailFile";
import { NodeDetailFolder } from "./NodeDetailFolder";

type NodeDetailInsightsProps = {
    node: GraphNodeModel;
    owner: string;
    repo: string;
    translation: InsightsNodeTranslations;
}

export function NodeDetailInsights({node, owner, repo, translation}: NodeDetailInsightsProps) {

    switch(node.type){
        case "file":
            return <NodeDetailFile owner={owner} repo={repo} node={node} title={translation.title} translation={translation.file}/>
        case "folder":
            return <NodeDetailFolder node={node} title={translation.title} translation={translation.folder}/>
        default:
            return <div>
                Undefined type
            </div>
    }
}