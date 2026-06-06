import { GraphNodeModel } from "@/graph/types";
import { InsightsNodeTranslations } from "@/shared/types";
import { NodeDetailFile } from "./NodeDetailFile";

type NodeDetailInsightsProps = {
    node: GraphNodeModel;
    translation: InsightsNodeTranslations;
}

export function NodeDetailInsights({node, translation}: NodeDetailInsightsProps) {

    switch(node.type){
        case "file":
            return <NodeDetailFile node={node} title={translation.title} translation={translation.file}/>
        case "folder":
            return <div className="flex flex-col rounded border card p-3">
                <span>{node.title}</span>
                <span>{node.subtitle}</span>
            </div>
        default:
            return <div>
                Undefined type
            </div>
    }


    return (
        <div className="flex flex-col rounded border card p-3">
            <span>{node.title}</span>
            <span>{node.subtitle}</span>
        </div>
    );
}