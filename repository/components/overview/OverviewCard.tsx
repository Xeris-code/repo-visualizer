import { LucideIcon } from "lucide-react"

type OverviewCardProps = {
    Icon: LucideIcon;
    bgColor: string;
    textColor: string;
    count: number | string;
    label: string;
}

export function OverviewCard ({Icon, bgColor, textColor, count, label}: OverviewCardProps) {
    return (
    <div className="flex items-center gap-3 p-3 rounded-lg border-[#1F2A44] border bg-[#111827]">
        <div className={`p-2 rounded-lg ${bgColor} ${textColor}`}>
            <Icon/>
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{count}</span>
            <span className="text-xs leading-relaxed text-[#7F89A7]">{label}</span>
        </div>
    </div>
    )
}

