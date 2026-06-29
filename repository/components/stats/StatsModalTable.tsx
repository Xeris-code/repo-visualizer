import { HighlightText, Tooltip } from "@/shared/ui";
import { LucideIcon } from "lucide-react";

type ValueCell = {
    type: "value";
    value: string | number;
    truncate: boolean;
    tooltip?: string;
    highlight?: string;
    icon?: {icon: LucideIcon, color: string}
}

type PercentageCell = {
    type: "percentage";
    value: number;
}

type DistributorCell = {
    type: "distributor";
    value: number;
    color?: string;
}

type CellType = ValueCell | PercentageCell | DistributorCell

type HeaderProps = {
    header: string[];
    colSize?: string[];
}

export function StatsModalHeader({
    header, colSize,
}: HeaderProps) {

    const gridTemplateColumns = colSize
            ? colSize.join(" ")
            : `repeat(${header.length}, minmax(0, 1fr))`;

    return (
        <div 
            style={{ gridTemplateColumns }}
            className={`grid gap-x-2 text-sm text-[#7F89A7] select-none font-light rounded-t border border-[#243154] bg-blue-900/20 px-3 py-2`}>
            {header.map((item, index) => (
                <span key={index}>
                    {item}
                </span>
            ))}
        </div>
    )
}

type RowProps = {
    row: CellType[];
    colSize?: string[];
}

export function StatsModalRow({
    row, colSize,
}: RowProps) {

    const gridTemplateColumns = colSize
            ? colSize.join(" ")
            : `repeat(${row.length}, minmax(0, 1fr))`;

    function ModalCell ({row}: {row: CellType}){
        switch(row.type){
            case("value"):

                if (row.icon) {
                    const Icon = row.icon.icon

                    if (row.highlight) {
                        return (
                            <span className="flex gap-2 items-center overflow-hidden  min-w-0">
                                <Icon style={{ color: `${row.icon.color}`}} size={15}/>
                                <span className={`${row.truncate ? "truncate" : ""}`}>
                                    <HighlightText
                                        text={String(row.value)}
                                        highlight={row.highlight}
                                    />
                                </span>
                            </span>
                        )
                    }
                    return (
                        <span className="flex gap-2 items-center overflow-hidden  min-w-0">
                            <Icon style={{ color: `${row.icon.color}`}} size={15}/>
                            <span className={`${row.truncate ? "truncate" : ""}`}>
                                {row.value}
                            </span>
                        </span>

                    )
                    
                }

                if (row.tooltip) {
                    if (row.highlight) {
                        return (
                            <span className={`text-start ${row.truncate ? "truncate" : ""}`}>
                                <Tooltip label={row.tooltip}>
                                    <HighlightText
                                        text={String(row.value)}
                                        highlight={row.highlight}
                                    />
                                </Tooltip>
                            </span>
                        )
                    }
                    return (
                        <span className={`text-start ${row.truncate ? "truncate" : ""}`}>
                            <Tooltip label={row.tooltip}>
                                {row.value}
                            </Tooltip>
                        </span>
                    )
                }

                return (
                    <span className={`${row.truncate ? "truncate" : ""}`}>
                        {row.highlight ? (
                            <HighlightText text={String(row.value)} highlight={row.highlight} />
                        ) : (
                            row.value
                        )}
                    </span>
                );
            case("percentage"):
                return (
                    <div className="flex items-center justify-center gap-1">
                        <span className="tracking-wider">
                            {String(row.value.toFixed(2))}
                        </span>
                        <span>%</span>
                    </div>
                )
            case("distributor"):
                const value = row.value
                const color = row.color ? row.color : ""

                return (
                    <div className="w-full h-2 rounded-full bg-blue-900/20">
                        <div style={{ width: `${Math.max(value, 1)}%`, backgroundColor: `${color}`}} className={`h-2 bg-linear-to-r rounded-full ${color ? "" : "from-blue-900 to-blue-400"}`}/>
                    </div>
                )
        }
    }

    return (
        <div
            style={{ gridTemplateColumns }} 
            className={`grid gap-x-2 text-sm font-light border-b border-[#243154] px-3 py-2 items-center`}>
            {row.map((item, index) => (
                <ModalCell
                    key={index}
                    row={item}
                />
            ))}
        </div>
    )
}