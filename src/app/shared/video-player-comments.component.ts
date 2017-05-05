import { Component, EventEmitter,
        Input, Output, OnInit, OnChanges } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'video-player-comments',
    templateUrl: './video-player-comments.component.html'
})

export class VideoPlayerCommentsComponent implements OnInit, OnChanges {
    @Input() public video: any;
    @Output() public videoSeekEmitter: EventEmitter<string> = new EventEmitter<string>();
    public commentThreads: Array<Object>;
    public nextPageToken: string;
    public sortOrder: string = 'relevance';
    public stats: Object;

    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.stats = this.video.statistics;
        this.youtubeLogic.getComments(this.video.id, this.sortOrder).subscribe((comments: any) => {
            this.commentThreads = comments.items;
            this.nextPageToken = comments.nextPageToken;
        });
    }

    ngOnChanges(): void {
        this.youtubeLogic.getComments(this.video.id, this.sortOrder).subscribe((comments: any) => {
            this.commentThreads = comments.items;
            this.nextPageToken = comments.nextPageToken;
        });
    }

    changeOrder(e: any): void {
        this.sortOrder = e.target.value;
        this.youtubeLogic.getComments(this.video.id, this.sortOrder).subscribe((comments: any) => {
            this.commentThreads = comments.items;
            this.nextPageToken = comments.nextPageToken;
        });
    }

    videoSeek(time: string): void {
        this.videoSeekEmitter.emit(time);
    }

    loadMoreComments(): void {
        this.youtubeLogic.getComments(this.video.id, this.sortOrder, this.nextPageToken).subscribe((comments: any) => {
            this.commentThreads = this.commentThreads.concat(comments.items);
            this.nextPageToken = comments.nextPageToken;
        });
    }
}
