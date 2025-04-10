import {
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    Output,
    signal,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { MatCardAppearance } from '@angular/material/card';
import { Team } from '@crczp/training-model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'crczp-team-overview-component',
    templateUrl: './team-overview.component.html',
    styleUrl: './team-overview.component.scss',
})
export class TeamOverviewComponent<T> implements OnChanges {
    @Input({ required: true }) team: Team;
    @Input() editMode: boolean = false;
    @Input() disabled: boolean = false;
    @Input() appearance: MatCardAppearance;
    @Input() template: TemplateRef<T>;

    @Output() lockTeam: EventEmitter<void> = new EventEmitter();
    @Output() updateName: EventEmitter<string> = new EventEmitter();
    @Input()
    set nameError(error: string | undefined) {
        this.nameErrorSignal.set(error);
    }

    playerTrackBy: (item: any) => any = (item) => item.id;
    highlighted = signal(false);
    titleHovered = signal(false);
    contentHovered = signal(false);
    nameErrorSignal = signal<string | undefined>(undefined);
    confirmingLock = signal(false);

    private cancelErrorHideSignal = new Subject<void>();

    private readonly destroyRef = inject(DestroyRef);

    teamNameFormControl: FormControl<string> = new FormControl('');

    constructor() {
        toObservable(this.nameErrorSignal).subscribe((errorShown) => {
            if (errorShown) {
                timer(3000)
                    .pipe(
                        takeUntil(this.cancelErrorHideSignal.asObservable()),
                        takeUntilDestroyed(this.destroyRef),
                        take(1),
                    )
                    .subscribe(() => {
                        this.nameErrorSignal.set(undefined);
                        this.nameError = undefined;
                    });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('team' in changes && this.teamNameFormControl) {
            this.teamNameFormControl.setValue(this.team.name);
        }
    }

    onEnterPressed() {}

    submit() {
        if (!this.highlighted()) {
            this.highlighted.set(true);
        } else {
            if (this.teamNameFormControl.value !== this.team.name) {
                this.updateName.emit(this.teamNameFormControl.value);
                this.teamNameFormControl.setValue(this.team.name);
            }
            this.highlighted.set(false);
        }
    }

    onLockClicked() {
        if (!this.confirmingLock()) {
            this.confirmingLock.set(true);
        } else {
            this.lockTeam.emit();
            this.confirmingLock.set(false);
        }
    }
}
