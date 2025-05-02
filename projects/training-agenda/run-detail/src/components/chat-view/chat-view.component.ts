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
    /**
     * The page size needs to be enforced to be larger than 20, because
     * the dynamic loading of messages relies on scrollbar.
     * If the messages don't fill the page, the scrollbar will not be
     * visible and the old messages will not be loaded.
     */
    private static readonly MIN_MESSAGE_PAGE_SIZE = 20;

    messages = input.required<TeamMessage[]>();
    team = input.required<Team>();

    @Input({ required: true }) currentUserId: TrainingUser['id'];
    @Input() scrollThreshold = 500;
    @Input() pageSize = 20;
    @Output() sendMessage = new EventEmitter<string>();

    @ViewChild('chatWrapper') chatWrapper: ElementRef<HTMLDivElement>;
    @ViewChild('chatInput') chatInput: ElementRef<HTMLInputElement>;

    visibleMessages: TeamMessage[] = [];
    teamUsersById: { [key: number]: TrainingUser } = {};
    showJumpToBottom = false;

    chatFormControl = new FormControl('');
    private shouldScrollToBottom = false;
    private startIndex = 0;

    constructor(private ngZone: NgZone) {
        toObservable(this.messages).subscribe(() => {
            this.recalculateVisibleMessages();
            if (this.isNearBottom()) {
                this.shouldScrollToBottom = true;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('team' in changes) {
            this.team().members.forEach((m) => (this.teamUsersById[m.id] = m));
        }
        if ('pageSize' in changes && this.pageSize < ChatViewComponent.MIN_MESSAGE_PAGE_SIZE) {
            this.pageSize = ChatViewComponent.MIN_MESSAGE_PAGE_SIZE;
        }
    }

    ngAfterViewInit() {
        this.updateChatInputHeight();
        this.chatFormControl.valueChanges.subscribe(() => {
            this.updateChatInputHeight();
        });

        this.chatWrapper.nativeElement.addEventListener('scroll', () => {
            this.onScroll();
        });
    }

    ngAfterViewChecked() {
        if (this.shouldScrollToBottom) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.scrollToBottom();
                this.shouldScrollToBottom = false;
            });
        }
    }

    private recalculateVisibleMessages() {
        if (!this.messages) return;
        const full = this.messages();
        const tailCount = Math.min(full.length, this.pageSize);
        const tail = full.slice(-tailCount);

        const availableHead = full.length - tail.length;
        const headStart = Math.max(0, availableHead - this.startIndex);
        const head = full.slice(headStart, availableHead);

        this.visibleMessages = [...head, ...tail];
    }

    private onScroll() {
        const el = this.chatWrapper.nativeElement;

        this.showJumpToBottom = !this.isNearBottom();

        if (el.scrollTop < this.scrollThreshold) {
            this.loadMoreAbove();
        }
    }

    private loadMoreAbove() {
        const full = this.messages();
        const maxHeadSize = full.length - this.pageSize;
        if (this.startIndex >= maxHeadSize) return;

        const previousHeight = this.chatWrapper.nativeElement.scrollHeight;

        this.startIndex += this.pageSize;
        this.recalculateVisibleMessages();

        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            const el = this.chatWrapper.nativeElement;
            const newHeight = el.scrollHeight;
            el.scrollTop = newHeight - previousHeight + el.scrollTop;
        });
    }

    private isNearBottom(): boolean {
        const el = this.chatWrapper.nativeElement;
        return el.scrollTop + el.clientHeight >= el.scrollHeight - this.scrollThreshold;
    }

    jumpToBottom() {
        this.shouldScrollToBottom = true;
        this.scrollToBottom();
        this.showJumpToBottom = false;
    }

    private scrollToBottom() {
        const el = this.chatWrapper.nativeElement;
        el.scrollTop = el.scrollHeight;
    }

    private updateChatInputHeight() {
        const input = this.chatInput.nativeElement;
        input.style.height = '1px';
        input.style.height = input.scrollHeight + 'px';
    }

    emitSendMessage() {
        if (!this.chatFormControl.value?.trim()) return;
        this.sendMessage.emit(this.chatFormControl.value);
        this.chatFormControl.setValue('');
        if (this.isNearBottom()) {
            this.shouldScrollToBottom = true;
        }
    }

    isCurrentUser(userId: number): boolean {
        return this.currentUserId === userId;
    }

    getUserImage(userId: number): string {
        return this.teamUsersById[userId]?.picture;
    }

    getUserName(userId: number) {
        return this.teamUsersById[userId]?.name;
    }

    getMessageId = (item: TeamMessage) => item.id;
}
