import { LucideIcon } from "lucide-react"

type PurpleButtonProps = {
    Icon: LucideIcon;
    label: string;
    onClick: () => void;
}

export function PurpleButton ({Icon, label, onClick}:PurpleButtonProps){
    return <button
        type="button"
        className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#6D4AFF] text-xs font-semibold text-[#F8FAFC] hover:bg-[#7C5CFF] active:scale-[0.98]"
        onClick={onClick}
    >
        <Icon className="w-4 h-4"/>
        {label}
    </button>
}