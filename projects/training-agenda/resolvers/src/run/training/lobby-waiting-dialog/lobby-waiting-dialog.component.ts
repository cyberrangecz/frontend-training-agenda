import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'crczp-lobby-waiting-dialog',
    standalone: true,
    imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle, AsyncPipe],
    templateUrl: './lobby-waiting-dialog.component.html',
    styleUrl: './lobby-waiting-dialog.component.css',
})
export class LobbyWaitingDialogComponent {
    timeToStart$: Observable<number>;

    closeDialog() {}
}
