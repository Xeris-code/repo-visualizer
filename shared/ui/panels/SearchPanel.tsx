import { Search } from "lucide-react";

type SearchPanelProps = {
    value: string;
    type?: string;
    width?: string;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchPanel ({
    value, placeholder, width="1/3", type="text",
    onChange
}: SearchPanelProps) {
    return (
        <div style={{ width: `${width}` }} className="flex h-8 self-center overflow-hidden rounded-lg border border-white/10 bg-[#050816]">
            <div className="flex w-8 items-center justify-center border-r border-white/10">
                <Search className="h-4 w-4 text-[#F4F7FF]" />
            </div>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e)}
                placeholder={placeholder}
                className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#F4F7FF] outline-none placeholder:text-[#6E7895]"
            />
        </div>
    )
}