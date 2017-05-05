import { Component, EventEmitter,
        Input, Output, OnInit } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'comment-thread',
    templateUrl: './comment-thread.component.html'
})

export class CommentThreadComponent implements OnInit {
    @Input() private thread: any;
    @Input() public videoId: string;
    @Output() public videoSeekEmitter: EventEmitter<string> = new EventEmitter<string>();
    public canHideReplies: boolean = false;
    public parentComment: any;
    public replies: Array<any>;
    public nextPageToken: string;

    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.parentComment = this.thread.snippet.topLevelComment;
        this.youtubeLogic.getReplies(this.parentComment.id, 2).subscribe((replies: any) => {
            this.replies = replies.items.reverse();
            this.nextPageToken = replies.nextPageToken;
        });
    }

    videoSeek(time: string): void {
        this.videoSeekEmitter.emit(time);
    }

    loadMoreReplies(): void {
        this.youtubeLogic.getReplies(this.parentComment.id, 10, this.nextPageToken).subscribe((replies: any) => {
            if (this.replies[0].id === replies.items[0].id) {
                this.replies.shift(); // API sometimes returns a duplicate of the previous array.
            }
            this.replies = replies.items.reverse().concat(this.replies);
            this.nextPageToken = replies.nextPageToken;
            this.canHideReplies = true;
        });
    }

    hideReplies(): void {
        this.youtubeLogic.getReplies(this.parentComment.id, 2).subscribe((replies: any) => {
            this.replies = replies.items.reverse();
            this.nextPageToken = replies.nextPageToken;
            this.canHideReplies = false;
        });
    }
}
