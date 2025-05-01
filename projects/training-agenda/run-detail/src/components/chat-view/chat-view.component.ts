import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    input,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Team, TeamMessage, TrainingUser } from '@crczp/training-model';
import { FormControl } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { take } from 'rxjs/operators';

@Component({
    selector: 'crczp-chat-view',
    templateUrl: './chat-view.component.html',
    styleUrl: './chat-view.component.css',
})
export class ChatViewComponent implements OnChanges, AfterViewInit, AfterViewChecked {
    messages = input.required<TeamMessage[]>();
    team = input.required<Team>();

    @Input({ required: true }) currentUserId: TrainingUser['id'];

    @Output() sendMessage = new EventEmitter<string>();

    teamUsersById: { [key: number]: TrainingUser } = {};

    @ViewChild('chatWrapper') chatWrapper: ElementRef<HTMLDivElement>;
    @ViewChild('chatInput') chatInput: ElementRef<HTMLInputElement>;

    private shouldScrollToBottom = false;

    constructor(private ngZone: NgZone) {
        toObservable(this.messages).subscribe(() => {
            this.shouldScrollToBottom = this.isNearBottom();
        });
    }

    getMessageId: (item: TeamMessage) => number = (item) => item.id;
    chatFormControl: FormControl = new FormControl('');

    ngOnChanges(changes: SimpleChanges): void {
        if ('team' in changes) {
            this.team().members.forEach((member) => (this.teamUsersById[member.id] = member));
        }
    }

    ngAfterViewInit() {
        this.updateChatInputHeight();
        this.chatFormControl.valueChanges.subscribe((value) => {
            this.updateChatInputHeight();
        });
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        if (this.shouldScrollToBottom) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.scrollToBottom();
                this.shouldScrollToBottom = false;
            });
        }
    }

    private isNearBottom(): boolean {
        const chatElement = this.chatWrapper?.nativeElement;
        if (!chatElement) return false;
        const threshold = 100;
        return chatElement.scrollTop + chatElement.clientHeight >= chatElement.scrollHeight - threshold;
    }

    private scrollToBottom() {
        if (this.chatWrapper) {
            this.chatWrapper.nativeElement.scrollTop = this.chatWrapper.nativeElement.scrollHeight;
        }
    }

    private updateChatInputHeight() {
        if (this.chatInput) {
            this.chatInput.nativeElement.style.height = '1px';
            this.chatInput.nativeElement.style.height = this.chatInput.nativeElement.scrollHeight + 'px';
        }
    }

    isCurrentUser(userId: number): boolean {
        return this.currentUserId === userId;
    }

    getUserImage(userId: number): string {
        return this.teamUsersById[userId]?.picture;
    }

    emitSendMessage() {
        if (!this.chatFormControl.value) {
            return;
        }
        this.sendMessage.emit(this.chatFormControl.value);
        this.chatFormControl.setValue('');
        this.scrollToBottom();
    }

    getUserName(userId: any) {
        return this.teamUsersById[userId]?.name;
    }
}
