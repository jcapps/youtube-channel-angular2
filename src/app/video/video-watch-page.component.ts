import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    templateUrl: './video-watch-page.component.html'
})
export class VideoWatchPageComponent implements OnInit {
    public video: Object = null;
    constructor(
        private route: ActivatedRoute,
        private youtubeLogic: YouTubeLogic
    ) {}

    ngOnInit(): void {
        const videoId = this.route.snapshot.params['id'];

        this.youtubeLogic.getVideo(videoId).subscribe((video: any) => {
            this.video = video.items[0];
        });
    }
}
