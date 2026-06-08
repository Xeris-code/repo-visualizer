export function createBalancedColumns(count: number): number[] {
    const columns: number[] = [];

    const pairs = Math.floor(count / 2);

    for (let i = 1; i <= pairs; i++) {
        columns.push(-i);
        columns.push(i);
    }

    if (count % 2 !== 0) {
        columns.push(-(pairs + 1));
    }

    return columns;
}