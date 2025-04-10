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
import { IntervalSortedSelectionList, SelectionInterval } from './interval-sorted-selection-list';

@Component({
    standalone: true,
    selector: 'crczp-selectable-list',
    templateUrl: './selectable-list.component.html',
    imports: [NgTemplateOutlet, GridListComponent],
    styleUrl: './selectable-list.component.css',
})
export class SelectableListComponent<T, I> implements OnInit, OnChanges {
    @Input({ required: true }) items: T[];
    @Input() selectedItems: T[];
    @Input({ required: true }) compareFunction: (a: T, b: T) => number;
    @Input({ required: true }) idFunction: (item: T) => I;
    @Input({ required: true }) template!: TemplateRef<{ $implicit: T }>;

    @Input() filterFunction: (item: T) => boolean = () => true;

    @Input() columns: number | undefined = undefined;
    @Input() gridTemplate: string | undefined = undefined;
    @Input() gridGap: string | undefined = undefined;

    @Output() itemsChange = new EventEmitter<T[]>();
    @Output() selectionChange = new EventEmitter<T[]>();
    @Output() dragSelectionChange = new EventEmitter<SelectionInterval<T>>();

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
                this.dragSelectionChange.emit(this.selectionList.getSelectionInterval());
            }
            if (event.key === 'Escape') {
                this.selectionList.cancelMultipleSelection();
                this.emitDragSelectionChange();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                this.selectionList.multipleSelectionInvert = false;
                this.emitDragSelectionChange();
            }
        });
        window.addEventListener('blur', (event) => {
            this.selectionList.cancelMultipleSelection();
            this.emitDragSelectionChange();
        });
    }

    emitDragSelectionChange() {
        this.dragSelectionChange.emit(this.selectionList.getSelectionInterval());
    }

    emitSelectionChange() {
        this.selectionChange.emit(this.selectionList.getSelectedItems());
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

    onItemMouseEnter(item: T) {
        const pre = this.selectionList.getSelectionInterval();
        this.selectionList.intervalSelectionSetEnd(item);
        const post = this.selectionList.getSelectionInterval();
        if (this.hasIntervalChanged(pre, post)) {
            this.emitDragSelectionChange();
        }
    }

    onConfirm() {
        const selectionCount = this.selectionList.getSelectionInterval().items.length;
        this.selectionList.confirmMultipleSelection();
        this.emitDragSelectionChange();
        if (selectionCount > 0) {
            this.emitSelectionChange();
        }
    }

    onItemMouseDown(item: T) {
        this.selectionList.intervalSelectionSetStart(item);
        this.emitDragSelectionChange();
    }

    private hasIntervalChanged(pre: SelectionInterval<T>, post: SelectionInterval<T>) {
        const preIds = pre.items.map(this.idFunction);
        const postIds = post.items.map(this.idFunction);
        return pre.inverted === pre.inverted && preIds.every((id) => postIds.includes(id));
    }
}
