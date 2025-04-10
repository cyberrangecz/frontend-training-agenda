import { SortedSelectionList } from './sorted-selection-list';
import { BehaviorSubject } from 'rxjs';

export type SelectionInterval<T> = { inverted: boolean; items: T[] };

export class IntervalSortedSelectionList<T, I> extends SortedSelectionList<T, I> {
    private inversionKeyPressed: boolean = false;
    private invertSelection: boolean = false;
    private preselectionItemsInterval: { from: T; to: T } | null = null;

    private selectionIntervalSubject = new BehaviorSubject<SelectionInterval<T>>({
        inverted: false,
        items: [],
    });

    constructor(initItems: T[], compareFunction: (a: T, b: T) => number, idFunction: (item: T) => I) {
        super(initItems, compareFunction, idFunction);
        super.getAllItems$().subscribe((items) => {
            this.selectionIntervalSubject.next({
                inverted: this.invertSelection,
                items: items.filter((item) => this.isSelected(item)),
            });
        });
    }

    public getSelectionInterval$() {
        return this.selectionIntervalSubject.asObservable();
    }

    public getSelectionInterval(): { inverted: boolean; items: T[] } {
        return this.selectionIntervalSubject.value;
    }

    public isSelectionInverted(): boolean {
        return this.invertSelection;
    }

    public intervalSelectionSetStart(item: T) {
        this.preselectionItemsInterval = { from: item, to: item };
        this.invertSelection = this.inversionKeyPressed;
        this.selectionIntervalSubject.next({ inverted: this.invertSelection, items: [item] });
    }

    public intervalSelectionSetEnd(item: T) {
        if (this.preselectionItemsInterval === null) {
            return;
        }
        if (!this.preselectionItemsInterval.from) {
            this.preselectionItemsInterval.from = item;
        }
        this.preselectionItemsInterval.to = item;
        this.selectionIntervalSubject.next({
            inverted: this.invertSelection,
            items: this.findItemsInSelectionInterval(),
        });
    }

    public confirmMultipleSelection() {
        const items = this.findItemsInSelectionInterval();

        if (this.invertSelection) {
            items.forEach((item) => this.setSelected(item, false));
        } else {
            items.forEach((item) => this.setSelected(item, true));
        }
        this.preselectionItemsInterval = null;
        this.invertSelection = false;
        this.selectionIntervalSubject.next({ inverted: false, items: [] });
    }

    public cancelMultipleSelection() {
        this.preselectionItemsInterval = null;
    }

    public isInPreSelectionInterval(item: T): boolean {
        if (!this.preselectionItemsInterval || this.invertSelection) {
            return false;
        }
        return this.isBetween(item, this.preselectionItemsInterval.from, this.preselectionItemsInterval.to);
    }

    public isInDeselectionInterval(item: T): boolean {
        if (!this.preselectionItemsInterval || !this.invertSelection) {
            return false;
        }
        return this.isBetween(item, this.preselectionItemsInterval.from, this.preselectionItemsInterval.to);
    }

    public set multipleSelectionInvert(value: boolean) {
        this.inversionKeyPressed = value;
    }

    private findItemsInSelectionInterval(): T[] {
        if (this.preselectionItemsInterval === null) {
            return [];
        }
        const interval = this.itemsIntervalToIndexes(
            this.preselectionItemsInterval.from,
            this.preselectionItemsInterval.to,
        );
        if (interval === null || interval.start === interval.end) {
            return [];
        }
        return super.getAllItems().slice(interval.start, interval.end + 1);
    }

    private isBetween(item: T, from: T, to: T): boolean {
        const itemIndex = this.indexOf(item);
        const interval = this.itemsIntervalToIndexes(from, to);
        if (itemIndex === null || interval === null) {
            return false;
        }
        return itemIndex >= interval.start && itemIndex <= interval.end;
    }

    private itemsIntervalToIndexes(from: T, to: T): { start: number; end: number } | null {
        const fromIndex = this.indexOf(from);
        const toIndex = this.indexOf(to);
        if (fromIndex === null || toIndex === null) {
            return null;
        }
        return { start: Math.min(fromIndex, toIndex), end: Math.max(fromIndex, toIndex) };
    }
}
