import { BehaviorSubject } from 'rxjs';

export class SortedSelectionList<T, I> {
    private allItemsSubject = new BehaviorSubject<T[]>([]);
    private selectedItemsMap: Map<I, T> = new Map();

    private selectedItemsSubject = new BehaviorSubject<T[]>([]);

    constructor(
        initItems: T[],
        private compareFunction: (a: T, b: T) => number,
        private idFunction: (item: T) => I,
    ) {
        this.allItemsSubject.next(new Array(...initItems).sort(compareFunction));
    }

    public getSelectedItems$() {
        return this.selectedItemsSubject.asObservable();
    }

    public getAllItems$() {
        return this.allItemsSubject.asObservable();
    }

    public getSelectedItems(): T[] {
        return this.selectedItemsSubject.value;
    }

    public getAllItems(): T[] {
        return this.allItemsSubject.value;
    }

    public setSelectedItems(items: T[]) {
        this.selectedItemsMap = new Map(items.map((item) => [this.idFunction(item), item]));
        this.selectedItemsSubject.next(items);
    }

    public setAllItems(items: T[]) {
        const commonSelectedItems = items.filter((item) => this.selectedItemsMap.has(this.idFunction(item)));
        this.allItemsSubject.next(items.sort(this.compareFunction));
        this.setSelectedItems(commonSelectedItems);
    }

    public remove(...items: T[]): void {
        items.forEach((item) => this.selectedItemsMap.delete(this.idFunction(item)));
        this.selectedItemsSubject.next(new Array(...this.selectedItemsMap.values()));
        const indexes = items.map((item) => this.indexOf(item)).filter((index) => index !== null) as number[];
        const allItems = this.allItemsSubject.value;
        indexes.forEach((index) => allItems.splice(index, 1));
        this.allItemsSubject.next(allItems);
    }

    public add(...items: T[]): void {
        const indexes = items.map((item) => this.indexOf(item)).filter((index) => index !== null) as number[];
        const allItems = this.allItemsSubject.value;
        indexes.forEach((index) => allItems.splice(index, 0, items[index]));
        this.allItemsSubject.next(allItems);
    }

    public isSelected(item: T): boolean {
        return this.selectedItemsMap.has(this.idFunction(item));
    }

    public setSelected(item: T, selected: boolean): void {
        if (selected) {
            this.selectedItemsMap.set(this.idFunction(item), item);
        } else {
            this.selectedItemsMap.delete(this.idFunction(item));
        }
        this.selectedItemsSubject.next(new Array(...this.selectedItemsMap.values()));
    }

    public indexOf(item: T): number | null {
        return this.binarySearch(item);
    }

    private binarySearch(item: T, start = 0, end = this.getAllItems().length - 1): number | null {
        const mid = Math.floor((start + end) / 2);
        const comparison = this.compareFunction(item, this.getAllItems()[mid]);
        if (comparison === 0) {
            return mid;
        }
        if (start >= end) {
            return null;
        }
        return comparison < 0 ? this.binarySearch(item, start, mid - 1) : this.binarySearch(item, mid + 1, end);
    }
}
