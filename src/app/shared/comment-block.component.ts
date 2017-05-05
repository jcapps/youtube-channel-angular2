import { Component, EventEmitter,
        AfterViewInit, OnInit,
        ViewChild, ElementRef,
        Input, Output } from '@angular/core';
const DOMPurify = require('dompurify')(window);

@Component({
    selector: 'comment-block',
    templateUrl: './comment-block.component.html'
})

export class CommentBlockComponent implements OnInit, AfterViewInit {
    @ViewChild('text') commentText: ElementRef;
    @ViewChild('expand') expandComment: ElementRef;
    @Input() private comment: any;
    @Input() private videoId: string;
    @Output() public videoSeekEmitter: EventEmitter<string> = new EventEmitter<string>();
    public cleanComment: string;
    public commentPieces: Array<string>;
    public commentUserImage: string;
    public commentUserName: string;
    public commentUserUrl: string;
    public likeCount: string;
    public timeElapsed: string;
    public times: Array<string>;
    public timestamps: Array<string>;
    public readMoreClick: Function;
    public readMoreText: string;

    ngOnInit(): void {
        const comment = this.comment.snippet;

        this.commentUserName = comment.authorDisplayName;
        this.commentUserUrl = comment.authorChannelUrl;
        const smallUserImage = comment.authorProfileImageUrl;
        this.commentUserImage = smallUserImage.replace('s28', 's60');

        const commentDate = new Date(comment.updatedAt);
        this.timeElapsed = this.getTimeElapsed(commentDate);

        this.likeCount = comment.likeCount;

        this.readMoreClick = this.showFullComment;
        this.readMoreText = 'Read More';

        this.prepareComment(comment);
    }

    ngAfterViewInit(): void {
        if (this.commentText && this.commentText.nativeElement.scrollHeight > 100) {
            this.expandComment.nativeElement.classList.remove('hidden');
        }
    }

    prepareComment(comment: any): void {
        let cleanComment = DOMPurify.sanitize(comment.textDisplay);

        // Handle video timestamp links in comments
        let timestamps: Array<string>;
        let times: Array<string>;
        let commentPieces: Array<string> = [];
        let timestampLinkLocation = cleanComment.indexOf('<a href="http://www.youtube.com/watch?v=' + this.videoId + '&amp;t=');

        if (timestampLinkLocation >= 0) {
            times = cleanComment.match(/(([0-9]+h)?([0-9]+m)?([0-9]+s))/g);
            timestamps = cleanComment.match(/(?:([01]?\d|2[0-3]):)?([0-5]?\d):([0-5]\d)/g);

            const regexTimeStampLink = new RegExp('<a href="http://www.youtube.com/watch\\?v=' + this.videoId + '&amp;t=');
            const regexTime = new RegExp(/(([0-9]+h)?([0-9]+m)?([0-9]+s))/);
            const regexCloseLink = new RegExp('">');
            const regexTimeStamp = new RegExp(/(?:([01]?\d|2[0-3]):)?([0-5]?\d):([0-5]\d)/);
            const regexCloseTag = new RegExp('</a>');
            const links = cleanComment.match(new RegExp(
                regexTimeStampLink.source
                + regexTime.source
                + regexCloseLink.source
                + regexTimeStamp.source
                + regexCloseTag.source, 'g')); // Find all occurrences of linked timestamps

            if (links.length === timestamps.length) { // Confirm: number of timestamps == number of linked timestamps
                for (let i = 0; i < links.length; i++) { // Remove linked timestamps from comment
                    let cleanComment1 = cleanComment.split(links[i])[0];
                    cleanComment = cleanComment.split(links[i])[1];
                    commentPieces = commentPieces.concat(cleanComment1);
                }
                commentPieces = commentPieces.concat(cleanComment);
            }
        }
        this.cleanComment = cleanComment;
        this.commentPieces = commentPieces;
        this.timestamps = timestamps;
        this.times = times;
    }

    minimizeComment(e: any): void {
        const text = e.target.previousElementSibling;
        text.classList.add('comment-text');
        this.readMoreClick = this.showFullComment;
        this.readMoreText = 'Read More';
    }

    showFullComment(e: any): void {
        const text = e.target.previousElementSibling;
        text.classList.remove('comment-text');
        this.readMoreClick = this.minimizeComment;
        this.readMoreText = 'Show Less';
    }

    clickTimeStamp(time: string): void {
        this.videoSeekEmitter.emit(time);
    }

    getTimeElapsed(date: Date): string {
        let timeElapsed = '';
        const dateDiffSecs = Math.floor((Date.now().valueOf() - date.valueOf()) / 1000);
        const dateDiffMins = Math.floor(dateDiffSecs / 60);
        const dateDiffHrs = Math.floor(dateDiffMins / 60);
        const dateDiffDays = Math.floor(dateDiffHrs / 24);
        const dateDiffWks = Math.floor(dateDiffDays / 7);
        const dateDiffMths = Math.floor(dateDiffDays / 30);
        const dateDiffYrs = Math.floor(dateDiffDays / 365);
        if (dateDiffSecs < 5) { timeElapsed = 'just now'; }
        if (dateDiffSecs >= 5 && dateDiffSecs < 60) { timeElapsed = dateDiffSecs + ' seconds ago'; }
        if (dateDiffMins === 1) { timeElapsed = dateDiffMins + ' minute ago'; }
        if (dateDiffMins > 1 && dateDiffMins < 60) { timeElapsed = dateDiffMins + ' minutes ago'; }
        if (dateDiffHrs === 1) { timeElapsed = dateDiffHrs + ' hour ago'; }
        if (dateDiffHrs > 1 && dateDiffHrs < 24) { timeElapsed = dateDiffHrs + ' hours ago'; }
        if (dateDiffDays === 1) { timeElapsed = dateDiffDays + ' day ago'; }
        if (dateDiffDays > 1 && dateDiffDays < 7) { timeElapsed = dateDiffDays + ' days ago'; }
        if (dateDiffWks === 1) { timeElapsed = dateDiffWks + ' week ago'; }
        if (dateDiffWks > 1 && dateDiffMths === 0) { timeElapsed = dateDiffWks + ' weeks ago'; }
        if (dateDiffMths === 1) { timeElapsed = dateDiffMths + ' month ago'; }
        if (dateDiffMths > 1 && dateDiffYrs === 0) { timeElapsed = dateDiffMths + ' months ago'; }
        if (dateDiffYrs === 1) { timeElapsed = dateDiffYrs + ' year ago'; }
        if (dateDiffYrs > 1) { timeElapsed = dateDiffYrs + ' years ago'; }
        return timeElapsed;
    }
}
