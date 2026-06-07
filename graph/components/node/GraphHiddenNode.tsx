import { Handle, Position } from "@xyflow/react";


export function GrapHiddenhNode () {

    
    return (<div className="h-[0.5px] w-[0.5px] opacity-0">
            <Handle id="top-target" type="target" position={Position.Top} className="opacity-0" />
            <Handle id="bottom-target" type="target" position={Position.Bottom} className="opacity-0" />
            <Handle id="right-target" type="target" position={Position.Right} className="opacity-0" />
            <Handle id="left-target" type="target" position={Position.Left} className="opacity-0" />

            <Handle id="top-source" type="source" position={Position.Top} className="opacity-0" />
            <Handle id="bottom-source" type="source" position={Position.Bottom} className="opacity-0" />
            <Handle id="right-source" type="source" position={Position.Right} className="opacity-0" />
            <Handle id="left-source" type="source" position={Position.Left} className="opacity-0" />
        </div>
    )
}