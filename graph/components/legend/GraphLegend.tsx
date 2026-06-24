import { GraphTranslationsLegend } from "@/shared/types"

type GraphLegendProps = {
    translations: GraphTranslationsLegend;
}

export function GraphLegend ({translations}: GraphLegendProps) {
    return (
        <div className="absolute z-20 bottom-2 left-2 flex gap-5 w-fit px-3 py-2 border rounded select-none text-xs text-[#7F89A7] card">
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full"/>
                <span>{translations.file}</span>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-fuchsia-400 rounded-full"/>
                <span>{translations.component}</span>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"/>
                <span>{translations.route}</span>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full"/>
                <span>{translations.library}</span>
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"/>
                <span>{translations.external}</span>
            </div>
        </div>
    )
}