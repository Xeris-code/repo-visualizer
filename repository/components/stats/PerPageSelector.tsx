import { useRef, useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

type PerPageSelectorProps = {
    perPage: number;
    perPageOptions: number[];
    label: string;
    onClick: (perPage: number) => void;
}

export function PerPageSelector({
    perPage, perPageOptions, label,
    onClick,
}: PerPageSelectorProps){
    
    const [clicked, setClicked] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const options = perPageOptions.toReversed()

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setClicked(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div ref={ref} className="relative z-999999">
            <button
                type="button"
                onClick={() => setClicked(!clicked)}
                className="cursor-pointer h-7 grid grid-cols-[30px_1fr] gap-x-1 px-1 items-center rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
            >   
                <span>
                    {perPage}
                </span>
                <div className="flex gap-1 items-center">
                    <span>
                    {label}
                    </span>
                    <ChevronUp className="size-5 transition-transform duration-300"
                        style={{transform: `rotateX(${clicked ? 180 : 0}deg)`}}/>
                </div>
                
            </button>

            {clicked && 
                <div className="absolute ring-1 ring-[#7c3aed66] bg-[#0B1326] bottom-full left-[50%] -translate-y-2 translate-x-[-50%] rounded-lg px-2">
                    <div className="flex flex-col gap-2 px-2 py-2">
                        {options.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => onClick(item)}
                                className="cursor-pointer text-[#F8FAFC] hover:text-[#A78BFA] active:scale-[0.90]"
                            >
                                <span>{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};