import {
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { GridListComponent } from '../grid-list/grid-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IntervalSortedSelectionList, SelectionInterval } from './interval-sorted-selection-list';

@Component({
    standalone: true,
    selector: 'app-selectable-list',
    templateUrl: './selectable-list.component.html',
    imports: [NgTemplateOutlet, GridListComponent],
    styleUrl: './selectable-list.component.css',
})
export class SelectableListComponent<T, I> implements OnInit, OnChanges {
    @Input({ required: true }) items: T[];
    @Input({ required: true }) compareFunction: (a: T, b: T) => number;
    @Input({ required: true }) idFunction: (item: T) => I;
    @Input({ required: true }) template!: TemplateRef<{ $implicit: T }>;
    @Input() selectedItems: T[] | undefined = undefined;
    @Input() filterFunction: (item: T) => boolean = () => true;

    @Input() columns: number | undefined = undefined;
    @Input() gridTemplate: string | undefined = undefined;
    @Input() gridGap: string | undefined = undefined;

    @Output() itemsChange = new EventEmitter<T[]>();
    @Output() selectionChange = new EventEmitter<T[]>();
    @Output() dragSelectionChange = new EventEmitter<SelectionInterval<T>>();

    private readonly destroyRef = inject(DestroyRef);

    selectionList: IntervalSortedSelectionList<T, I>;

    private createSelectionList(
        items: T[],
        compareFunction: (a: T, b: T) => number,
        idFunction: (item: T) => I,
        selectedItems?: T[],
    ): IntervalSortedSelectionList<T, I> {
        const selectionList = new IntervalSortedSelectionList(items, compareFunction, idFunction);
        if (selectedItems) {
            selectionList.setSelectedItems(selectedItems);
        }
        selectionList
            .getSelectedItems$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((selection) => this.selectionChange.emit(selection.filter(this.filterFunction)));
        selectionList
            .getSelectionInterval$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((dragSelection) => this.dragSelectionChange.emit(dragSelection));
        selectionList
            .getAllItems$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((items) => this.itemsChange.emit(items.filter(this.filterFunction)));
        return selectionList;
    }

    ngOnInit() {
        this.selectionList = this.createSelectionList(
            this.items,
            this.compareFunction,
            this.idFunction,
            this.selectedItems,
        );

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Shift') {
                this.selectionList.multipleSelectionInvert = true;
            }
            if (event.key === 'Escape') {
                this.selectionList.cancelMultipleSelection();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                this.selectionList.multipleSelectionInvert = false;
            }
        });
        window.addEventListener('blur', (event) => {
            this.selectionList.cancelMultipleSelection();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.selectionList) {
            return;
        }
        if ('selectedItems' in changes) {
            this.selectionList.setSelectedItems(this.selectedItems || []);
        }
        if ('items' in changes) {
            this.selectionList.setAllItems(this.items);
        }
        if ('compareFunction' in changes || 'idFunction' in changes) {
            this.selectionList = this.createSelectionList(
                this.items,
                this.compareFunction,
                this.idFunction,
                this.selectedItems,
            );
        }
    }

    protected readonly console = console;
}
