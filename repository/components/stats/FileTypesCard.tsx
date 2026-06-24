import { getTopFiles } from "@/repository/analysis";
import { StatsFilesTranslations } from "@/shared/types";
import { File } from "lucide-react";
import { useState } from "react";
import { FileTypesModal } from "./FileTypeModal";
import { FileStats } from "@/repository/types";

type FileTypesCardProps = {
    files: FileStats;
    translation: StatsFilesTranslations;
}

export function FileTypesCard ({
    files, translation,
}: FileTypesCardProps) {

    const displayFiles = getTopFiles(files)
    const [isModalsOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col rounded border border-[#1A2550] bg-[#081020] px-5 py-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                    {translation.title}
                </span>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer select-none text-xs text-[#8B5CF6] transition hover:text-[#A78BFA] hover:underline"
                >
                    {`${translation.list} (${files.length})`}
                </button>
            </div>
            <div className="flex flex-col mt-4 gap-2">
                {displayFiles.map((file, index) => 
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <File className="w-4 h-4 text-gray-400"/>
                            <span className="text-[#7F89A7] text-xs">{file.extension}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-1">
                            <span className="text-[#6B7693] text-xs text-end">{file.count}</span>
                            <span className="text-[#6B7693] text-xs text-start">({file.percentage.toFixed(1)}%)</span>
                        </div>
                    </div> 
                )}
            </div>
            {isModalsOpen && <FileTypesModal
                items={files}
                translations={translation.listTranslations}
                onClose={() => setIsModalOpen(false)}
            />
        }
        </div>
        
    )
}