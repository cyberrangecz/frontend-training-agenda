import { AfterViewInit, Component, ElementRef, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    standalone: true,
    selector: 'crczp-grid-list',
    templateUrl: './grid-list.component.html',
    imports: [NgTemplateOutlet],
    styleUrl: './grid-list.component.css',
})
export class GridListComponent<T, I> implements AfterViewInit, OnChanges {
    @Input({ required: true }) items: T[];
    @Input({ required: true }) template: TemplateRef<{ $implicit: T }>;
    @Input() gridTemplate: string | undefined = undefined;
    @Input() gridGap: string | undefined = undefined;
    @Input({ required: true }) trackBy: (item: T) => I;
    @Input() masonry: boolean = false;

    @ViewChild('gridList') gridList: ElementRef<HTMLDivElement>;

    ngAfterViewInit() {
        if (this.gridList) {
            this.setGridProperties();
        }
    }

    ngOnChanges() {
        if (this.gridList) {
            this.setGridProperties();
        }
    }

    private setGridProperties() {
        if (this.gridTemplate) {
            this.gridList.nativeElement.style.gridTemplate = this.gridTemplate;
        }
        if (this.gridGap) {
            this.gridList.nativeElement.style.gap = this.gridGap;
        }
        if (this.masonry) {
            this.gridList.nativeElement.style.gridTemplateRows = 'masonry';
        }
    }
}
