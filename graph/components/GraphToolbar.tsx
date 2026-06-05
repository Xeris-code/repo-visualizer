import { Expand, Fullscreen, Minus, Plus } from "lucide-react";

type GraphToolbarProps = {
    zoom: number;
    title: string;
    description: string;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFitView: () => void;
}

export function GraphToolbar ({
    zoom, title, description,
    onZoomIn, onZoomOut, onFitView
}: GraphToolbarProps) {

    return (
         <div className="flex z-10 justify-between px-3 py-2 items-center border-b card">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="text-xs leading-relaxed text-[#7F89A7]">{description}</span>
            </div>
            <div className="flex gap-3">
                <div className="grid grid-cols-[20px_50px_20px] px-1 items-center rounded border-[#1F2A44] border bg-[#0E1220]">
                    <button
                    type="button"
                    onClick={onZoomOut}
                    className="cursor-pointer items-center flex justify-center hover:text-[#A78BFA]"
                    >   
                    <Minus className="w-4 h-4"/>
                    </button>
                    <div className="text-center text-xs select-none">
                        {zoom}%
                    </div>
                    <button
                        type="button"
                        onClick={onZoomIn}
                        className="cursor-pointer items-center flex justify-center hover:text-[#A78BFA]"
                    >  
                        <Plus className="w-4 h-4"/>
                    </button>
                </div>
                <button
                    type="button"
                    onClick={onFitView}
                    className="cursor-pointer items-center p-1 rounded bg-[#0E1220] border-[#1F2A44] border  hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    <Fullscreen className="w-4 h-4"/>
                </button>
                <button
                    type="button"
                    className="cursor-pointer items-center p-1 rounded bg-[#0E1220] border-[#1F2A44] border  hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    <Expand className="w-4 h-4"/>
                </button>
            </div>
        </div>
    )
}