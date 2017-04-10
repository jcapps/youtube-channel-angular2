import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    templateUrl: './video-watch-page.component.html'
})
export class VideoWatchPageComponent implements OnInit {
    public video: Object = null;
    constructor(
        private route: ActivatedRoute,
        private youtubeApi: YouTubeApi
    ) {}

    ngOnInit(): void {
        const videoId = this.route.snapshot.params['id'];

        this.youtubeApi.getVideo(videoId)
            .subscribe((video: any) => {
                this.video = video.items[0];
            });
    }
}
