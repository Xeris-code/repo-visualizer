import Image from "next/image";
import { Search, Settings, Sun } from "lucide-react";
import { useAppState } from "../context";


export function NavigationBar () {

    const { isEmpty, t } = useAppState()

    return (
        <div className="flex justify-between px-4 pt-2">
            <div className="flex gap-2 items-center">
                <Image
                    src="/graphics/logo.png"
                    alt="logo"
                    width={36}
                    height={36}
                />
                <span className="text-[18px] font-semibold select-none">{t.ui.app.name}</span>
            </div>
            {!isEmpty &&
                <div className="flex h-8 self-center w-full max-w-97.5 overflow-hidden rounded-lg border border-white/10 bg-[#050816]">
                    <div className="flex w-8 items-center justify-center border-r border-white/10">
                    <Search className="h-4 w-4 text-[#F4F7FF]" />
                    </div>
        
                    <input
                    type="url"
                    placeholder={t.ui.app.search.placeholder}
                    className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#F4F7FF] outline-none placeholder:text-[#6E7895]"
                    />
                </div>
            }
            <div className="flex gap-4 justify-center">
                <button className="cursor-pointer hover:text-[#A78BFA] hover:scale-[1.09] active:scale-[0.98]">
                    <Settings/>
                </button>
                <div className="w-px h-1/2 self-center bg-[#6B7693]"/>
                <button className="cursor-pointer hover:text-[#A78BFA] hover:scale-[1.09] active:scale-[0.98]">
                    <Sun/>
                </button>
            </div>
        </div>
    )
}