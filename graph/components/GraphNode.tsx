import { GraphNodeModel } from "../types";
import { nodes } from "../utils/nodes";
import { Handle, Position } from "@xyflow/react";

type GraphNodeProps = {
    selected: boolean;
    data: GraphNodeModel;
}

export function GraphNode ({selected, data}: GraphNodeProps) {

    

    if (data.type === "hidden") {
        return (<div className="h-[0.5px] w-[0.5px] opacity-0">
            <Handle id="top-target" type="target" position={Position.Top} className="opacity-0" />
            <Handle id="bottom-target" type="target" position={Position.Bottom} className="opacity-0" />
            <Handle id="right-target" type="target" position={Position.Right} className="opacity-0" />
            <Handle id="left-target" type="target" position={Position.Left} className="opacity-0" />

            <Handle id="top-source" type="source" position={Position.Top} className="opacity-0" />
            <Handle id="bottom-source" type="source" position={Position.Bottom} className="opacity-0" />
            <Handle id="right-source" type="source" position={Position.Right} className="opacity-0" />
            <Handle id="left-source" type="source" position={Position.Left} className="opacity-0" />
        </div>)
    } 
    const nodeStyle = nodes[data.type]
        
    return (
        
        <div className={`flex items-center h-[56px] w-[220px] ${nodeStyle.bg} ${selected ? `ring-2 ${nodeStyle.glow} shadow-[0_0_20px_rgba(139,92,246,0.4)]` : ""
} gap-2 px-4 py-2 rounded ${nodeStyle.border}`}>

            <Handle id="top-target" type="target" position={Position.Top} className="opacity-0" />
            <Handle id="bottom-target" type="target" position={Position.Bottom} className="opacity-0" />
            <Handle id="right-target" type="target" position={Position.Right} className="opacity-0" />
            <Handle id="left-target" type="target" position={Position.Left} className="opacity-0" />

            <Handle id="top-source" type="source" position={Position.Top} className="opacity-0" />
            <Handle id="bottom-source" type="source" position={Position.Bottom} className="opacity-0" />
            <Handle id="right-source" type="source" position={Position.Right} className="opacity-0" />
            <Handle id="left-source" type="source" position={Position.Left} className="opacity-0" />
            
            <div className="p-1 flex items-center">
                <nodeStyle.icon className={`w-6 h-6 ${nodeStyle.text}`}/>
            </div>
            <div className="flex flex-col truncate">
                <span className="text-sm text-white">{data.title}</span>
                <span className="text-xs text-[#7F89A7]">{data.subtitle}</span>
            </div>
        </div>
    )
}