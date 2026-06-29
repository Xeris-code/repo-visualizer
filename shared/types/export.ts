export type CsvColumn<T> = {
    header: string;
    value: (item: T) => string | number;
};