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

    ngOnInit(): void {
        this.buildDescription();
    }

    ngOnChanges(): void {
        this.buildDescription();
    }

    buildDescription(): void {
        const vidTitle = this.video.snippet.title.split(/\|(.+)/);
        this.title = vidTitle[0];
        this.subtitle = vidTitle[1];
        this.description = this.video.snippet.description.split('\n');
    }
}
