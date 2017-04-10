import { Component, OnInit } from '@angular/core';
import { RecentUploadsLogic } from '../../logic/recent-uploads.logic';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    templateUrl: './all-videos.component.html'
})
export class AllVideosComponent implements OnInit {
    public nextPageToken: string = null;
    public pageTitle: string = 'Videos';
    public playlist: Array<Object> = null;
    private playlistId: string;
    constructor(
        private recentUploadsLogic: RecentUploadsLogic,
        private youtubeLogic: YouTubeLogic
    ) {}

    ngOnInit(): void {
        this.recentUploadsLogic.getRecentUploadsPlaylist().subscribe((playlist: any) => {
            this.playlist = playlist.items;
            this.nextPageToken = playlist.nextPageToken;
        });
    }

    loadMoreVideos(): void {
        this.youtubeLogic.getPlaylist(this.playlistId, this.nextPageToken).subscribe((nextVideos: any) => {
            this.playlist = this.playlist.concat(nextVideos.items);
            this.nextPageToken = nextVideos.nextPageToken;
        });
    }
}
