export class ArrayHelper {
    public static flatten<T>(arr: T[][]): T[] {
        return arr.reduce((reduced, next) => reduced.concat(next), []);
    }

    /**
     * Split array to 2D array with set max length
     * of subarrays
     * @param arr
     * @param chunkSize
     */
    public static toChunks<T>(arr: T[], chunkSize: number): T[][] {
        return arr.length === 0 ? [] : [arr.slice(0, chunkSize)].concat(this.toChunks(arr.slice(chunkSize), chunkSize));
    }

    /**
     * Same as filter, but also returns the values not matching in a second array
     * @param arr input array
     * @param condition split condition
     */
    public static split<T>(arr: T[], condition: (elem: T, index: number) => boolean): [T[], T[]] {
        return arr.reduce(
            ([condTrue, condFalse], item, index) => {
                (condition(item, index) ? condTrue : condFalse).push(item);
                return [condTrue, condFalse];
            },
            [[], []],
        );
    }

    public static sum(arr: number[]): number {
        return arr.reduce((sum, item) => sum + item, 0);
    }

    public static findOrThrow<T extends { id: number }>(items: T[], id: number): T {
        const item = items.find((elem) => elem.id === id);
        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }
}
