import { Component, Input, OnInit } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'video-result',
    templateUrl: './video-result.component.html'
})
export class VideoResultComponent implements OnInit {
    @Input() private videoId: string;
    public video: Object = null;
    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.youtubeLogic.getVideo(this.videoId).subscribe((video: any) => {
            this.video = video.items[0];
        });
    }
}
