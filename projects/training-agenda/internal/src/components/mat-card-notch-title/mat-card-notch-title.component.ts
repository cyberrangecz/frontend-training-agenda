import { Component, Input, Signal, signal, ViewEncapsulation } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { C } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-mat-card-notch-title',
    templateUrl: './mat-card-notch-title.component.html',
    styleUrl: './mat-card-notch-title.component.css',
    encapsulation: ViewEncapsulation.None,
    imports: [MatCardTitle],
    standalone: true,
})
export class MatCardNotchTitleComponent {
    @Input() childStyle?: Record<string, CSSStyleValue> = {};
}
