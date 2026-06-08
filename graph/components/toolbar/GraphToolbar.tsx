import { GraphZoomControls } from "./GraphZoomControls";

type GraphToolbarProps = {
    zoom: number;
    title: string;
    description: string;
    isFullscreen: boolean;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFitView: () => void;
    onFullscreen: () => void;
}

export function GraphToolbar ({
    zoom, title, description, isFullscreen,
    onZoomIn, onZoomOut, onFitView, onFullscreen,
}: GraphToolbarProps) {

    return (
         <div className="flex z-10 justify-between px-3 py-2 items-center border-b card">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="text-xs leading-relaxed text-[#7F89A7]">{description}</span>
            </div>
            <GraphZoomControls
                zoom={zoom}
                isFullscreen={isFullscreen}
                onFitView={onFitView}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                onFullscreen={onFullscreen}
            />
        </div>
    )
}