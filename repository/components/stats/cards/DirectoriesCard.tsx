import { DirectoryStats } from "@/repository/types";
import { StatsDirectoriesTranslations } from "@/shared/types";
import { FolderClosed } from "lucide-react";
import { DirectoriesModal } from "../modals/";
import { useSharedUserActions } from "@/shared/hooks";
import { ViewAllButton } from "@/shared/ui/buttons";

type DirectoriesCardProps = {
    largDirectories: DirectoryStats;
    allDirectories: DirectoryStats;
    translation: StatsDirectoriesTranslations;
}

export function DirectoriesCard ({
    largDirectories, allDirectories, translation,
}: DirectoriesCardProps) {

    const {isModalOpen, setIsModalOpen} = useSharedUserActions()

    return (
        <div className="flex flex-col rounded border border-[#1A2550] bg-[#081020] px-5 py-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                    {translation.title}
                </span>
                <ViewAllButton
                    label={translation.list}
                    count={allDirectories.length}
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            <div className="flex flex-col mt-4 gap-2">
                {largDirectories.map((directory, index) => {if (index < 5){ return <div key={index} className="grid grid-cols-[20px_60px_1fr_60px] gap-x-2 items-center">
                    <FolderClosed size={15} className="text-gray-400"/>
                    <span className="text-[#7F89A7] text-xs truncate">{directory.name}</span>
                    <div className="w-full h-2 rounded-full bg-blue-900/20">
                        <div style={{ width: `${directory.percentage}%`}} className="h-2 bg-linear-to-r from-blue-900 to-blue-400 rounded-full"/>
                    </div>
                    <div className="grid grid-cols-[1fr_20px] gap-x-1">
                        <span className="text-[#6B7693] text-xs text-end">{directory.size.split(" ")[0]}</span>
                        <span className="text-[#6B7693] text-xs text-start">{directory.size.split(" ")[1]}</span>
                    </div>
                </div>}})
                }
            </div>
            {isModalOpen && <DirectoriesModal
                items={allDirectories}
                translations={translation.listTranslations}
                onClose={() => setIsModalOpen(false)}
            />
        }
            
        </div>
    )
}