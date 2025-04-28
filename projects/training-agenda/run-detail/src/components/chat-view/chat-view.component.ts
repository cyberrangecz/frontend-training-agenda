import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Team, TeamMessage, TrainingUser } from '@crczp/training-model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'crczp-chat-view',
    templateUrl: './chat-view.component.html',
    styleUrl: './chat-view.component.css',
})
export class ChatViewComponent implements OnChanges, AfterViewInit {
    @Input({ required: true }) messages: TeamMessage[];
    @Input({ required: true }) team: Team;
    @Input({ required: true }) currentUserId: TrainingUser['id'];
    @Input() numberOfMessagesToDisplay: number = 20;

    teamUsersById: { [key: number]: TrainingUser } = {};

    @ViewChild('chatWrapper') chatWrapper: ElementRef<HTMLDivElement>;
    @ViewChild('chatInput') chatInput: ElementRef<HTMLInputElement>;

    getMessageId: (item: TeamMessage) => number = (item) => item.id;
    chatFormControl: FormControl = new FormControl('');

    ngOnChanges(changes: SimpleChanges): void {
        if ('team' in changes) {
            this.team.members.forEach((member) => (this.teamUsersById[member.id] = member));
        }
    }

    ngAfterViewInit() {
        this.updateChatInputHeight();
        this.chatFormControl.valueChanges.subscribe((value) => {
            this.updateChatInputHeight();
        });
    }

    private updateChatInputHeight() {
        if (this.chatInput) {
            this.chatInput.nativeElement.style.height = '1px';
            this.chatInput.nativeElement.style.height = this.chatInput.nativeElement.scrollHeight + 'px';
        }
    }

    onScroll(scrollEvent: Event) {
        console.log('scroll', scrollEvent);
    }

    isCurrentUser(userId: number): boolean {
        return this.currentUserId === userId;
    }

    getUserImage(userId: number): string {
        return this.teamUsersById[userId].picture;
    }

    messageUpdated($event: Event) {}

    messageContent() {}
}
