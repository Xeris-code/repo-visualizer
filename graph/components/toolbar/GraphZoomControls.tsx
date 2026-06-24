import { GraphTooltipTranslations } from "@/shared/types";
import { Tooltip } from "@/shared/ui";
import { Expand, FolderOutput, Fullscreen, Minus, Plus, Shrink } from "lucide-react";

type GraphZoomControlsProps = {
    zoom: number;
    isFullscreen: boolean;
    translation: GraphTooltipTranslations;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFitView: () => void;
    onFullscreen: () => void;
    onUpFolder: () => void;
}

export function GraphZoomControls ({
    zoom, isFullscreen, translation,
    onZoomIn, onZoomOut, onFitView, onFullscreen, onUpFolder
}: GraphZoomControlsProps) {

    return (
        <div className="flex gap-3">
            <Tooltip label={translation.outOfFolder}>
                <button
                    type="button"
                    onClick={onUpFolder}
                    className="cursor-pointer items-center p-1 rounded bg-[#0E1220] border-[#1F2A44] border  hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    <FolderOutput className="w-4 h-4"/>
                </button>
            </Tooltip>
            <div className="grid grid-cols-[20px_50px_20px] px-1 items-center rounded border-[#1F2A44] border bg-[#0E1220]">
                <Tooltip label={translation.zoomOut}>
                    <button
                    type="button"
                    onClick={onZoomOut}
                    className="cursor-pointer items-center p-1 flex justify-center hover:text-[#A78BFA]"
                    >   
                        <Minus className="w-4 h-4"/>
                    </button>
                </Tooltip>
                <div className="text-center text-xs select-none">
                    {zoom}%
                </div>
                <Tooltip label={translation.zoomIn}>
                    <button
                        type="button"
                        onClick={onZoomIn}
                        className="cursor-pointer items-center p-1 flex justify-center hover:text-[#A78BFA]"
                    >  
                        <Plus className="w-4 h-4"/>
                    </button>
                </Tooltip>
            </div>
            <Tooltip label={translation.fitView}>
                <button
                    type="button"
                    onClick={onFitView}
                    className="cursor-pointer items-center p-1 rounded bg-[#0E1220] border-[#1F2A44] border  hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    <Fullscreen className="w-4 h-4"/>
                </button>
            </Tooltip>
            <Tooltip label={!isFullscreen ? translation.maximize : translation.minimaze}>
                <button
                    type="button"
                    onClick={onFullscreen}
                    className="cursor-pointer items-center p-1 rounded bg-[#0E1220] border-[#1F2A44] border  hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    {!isFullscreen ? <Expand className="w-4 h-4"/> : <Shrink className="w-4 h-4"/>}
                </button>
            </Tooltip>
        </div>
    )
}