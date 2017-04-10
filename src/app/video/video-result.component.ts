import { Component, Input, OnInit } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    selector: 'video-result',
    templateUrl: './video-result.component.html'
})
export class VideoResultComponent implements OnInit {
    @Input() private videoId: string;
    public video: Object = null;
    constructor(private youtubeApi: YouTubeApi) {}

    ngOnInit(): void {
        this.youtubeApi.getVideo(this.videoId)
            .subscribe((video: any) => {
                this.video = video.items[0];
            });
    }
}
