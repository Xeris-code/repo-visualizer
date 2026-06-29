import { LucideIcon } from "lucide-react"
import { XCloseButton } from "../buttons";

type ModalHeaderPanelProps = {
    Icon: LucideIcon;
    iconStyle: {bg: string, color: string};
    badgeStyle: {bg: string, color: string};
    title: string;
    count: number;
    badge: string;
    description: string;
    onClose: () => void;
}

export function ModalHeaderPanel ({
    Icon, iconStyle, badgeStyle, title,
    count, badge, description,
    onClose,
}: ModalHeaderPanelProps){

    return (
        <div className="flex justify-between p-5 border-b border-[#243154]">
            <div className="flex gap-3 items-center select-none">
                <div
                    className={`p-2 rounded-lg ${iconStyle.bg} ${iconStyle.color}`}
                >
                    <Icon size={30}/>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold">
                            {title}
                        </span>
                        <div
                            className={`rounded-full text-xs items-center px-2 py-1 ${badgeStyle.bg} ${badgeStyle.color}`}
                        >
                            {`${count} ${badge}`}
                        </div>
                    </div>
                    <p className="text-sm text-[#7F89A7]">
                        {description}
                    </p>
                </div>
            </div>
            <XCloseButton
                onClose={onClose}
            />
        </div>
    )
}