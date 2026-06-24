
type CsvColumn<T> = {
    header: string;
    value: (item: T) => string | number;
};

export function exportToCsv<T>(
    filename: string,
    items: T[],
    columns: CsvColumn<T>[]
) {
    const escapeCsvValue = (value: string | number) => {
        const stringValue = String(value);

        if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
        ) {
        return `"${stringValue.replaceAll('"', '""')}"`;
        }

        return stringValue;
    };

    const headerRow = columns.map((column) => column.header).join(",");

    const dataRows = items.map((item) =>
        columns
        .map((column) => escapeCsvValue(column.value(item)))
        .join(",")
    );

    const csv = [headerRow, ...dataRows].join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}