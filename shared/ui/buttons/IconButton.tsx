import { LucideIcon } from "lucide-react"

type IconButtonProps = {
    Icon: LucideIcon;
    label: string;
    onClick: () => void;
}

export function IconButton ({Icon, label, onClick}:IconButtonProps){
    return <button
        type="button"
        className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
        onClick={onClick}
    >
        <Icon className="w-4 h-4"/>
        {label}
    </button>
}