import { CsvColumn } from "@/shared/types";
import { exportToCsv } from "@/shared/utils";
import { Download } from "lucide-react";

type CSVExportButtonProps <T> = {
    label: string;
    fileName: string;
    items: T[];
    columns: CsvColumn<T>[]; 
}

export function CSVExportButton<T> ({
    label, fileName, items, columns
}: CSVExportButtonProps<T>) {
    return (
        <button
            type="button"
            onClick={() => exportToCsv(fileName, items, columns)}
            className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
        >   
            <Download className="w-4 h-4"/>
            {label}
        </button>
    )
}