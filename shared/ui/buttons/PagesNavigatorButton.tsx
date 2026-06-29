import { ChevronLeft, ChevronRight } from "lucide-react"

type PagesNavigatorButtonProps = {
    currentPage: number;
    maxPages: number;
    handlePageBack: () => void;
    handlePageFront: () => void;
}

export function PagesNavigatorButtonProps ({
    currentPage, maxPages,
    handlePageBack, handlePageFront
}: PagesNavigatorButtonProps){

    return (
        <div className="grid grid-cols-[20px_90px_20px] w-fit px-1 items-center rounded border-[#1F2A44] border bg-[#0E1220]">
            <button
                onClick={handlePageBack}
                className="cursor-pointer hover:text-[#A78BFA] active:scale-[0.98]"
            >
                <ChevronLeft size={20}/>
            </button>
            <div className="grid grid-cols-[35px_10px_35px] gap-x-1">
                <span className="text-center">{currentPage}</span>
                <span className="text-center">/</span>
                <span className="text-center">{maxPages}</span>
            </div>
            <button 
                onClick={handlePageFront}
                className="cursor-pointer hover:text-[#A78BFA] active:scale-[0.98]"
            >
                <ChevronRight size={20}/>
            </button>
        </div>
    )
}