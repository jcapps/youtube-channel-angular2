import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'video-player-description',
    templateUrl: './video-player-description.component.html'
})

export class VideoPlayerDescriptionComponent implements OnInit, OnChanges {
    @Input() private video: any;
    public title: string;
    public subtitle: string;
    public description: Array<string>;
    public date: string;

    ngOnInit(): void {
        this.buildDescription();
    }

    ngOnChanges(): void {
        this.buildDescription();
    }

    buildDescription(): void {
        const vidTitle = this.video.snippet.title.split(/\|(.+)/);
        this.title = vidTitle[0].trim();
        this.subtitle = vidTitle[1].trim();

        this.description = this.video.snippet.description.split('\n');

        const date = new Date(this.video.snippet.publishedAt);
        this.date = date.toLocaleString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}
