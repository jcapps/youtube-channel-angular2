import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit {
    public currentVideo: Object;
    public nextPageToken: string;
    public playlist: any;
    public playlistId: string;
    public playlistInfo: Object;
    public videoInPlaylist: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private youtubeApi: YouTubeApi
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                this.initializePlaylist();
            }
        });
    }

    initializePlaylist(): void {
        this.playlistId = this.route.snapshot.params['id'];
        this.videoInPlaylist = 0;

        this.youtubeApi.getPlaylist(this.playlistId)
            .subscribe((playlist: any) => {
                this.playlist = playlist.items;
                this.nextPageToken = playlist.nextPageToken;

                const videoId = this.playlist[this.videoInPlaylist].snippet.resourceId.videoId;
                this.youtubeApi.getVideo(videoId)
                    .subscribe((video: any) => {
                        this.currentVideo = video.items[0];
                    });
            });

        this.youtubeApi.getPlaylistInfo(this.playlistId)
            .subscribe((playlistInfo: any) => {
                this.playlistInfo = playlistInfo.items[0];
            });
    }

    changeVideo(e: any) {
        let element = e.target;
        while (element.className.indexOf('playlist-video') < 0) {
            element = element.parentNode;
        }
        this.updateVideoInPlaylist(parseInt(element.id, 10));
    }

    updatePlaylist(playlistIndex: number): void {
        if (this.videoInPlaylist !== playlistIndex) {
            this.updateVideoInPlaylist(playlistIndex);
        }
    }

    updateVideoInPlaylist(playlistIndex: number): void {
        const videoId = this.playlist[playlistIndex].snippet.resourceId.videoId;
        this.youtubeApi.getVideo(videoId)
            .subscribe((video: any) => {
                this.currentVideo = video.items[0];
                this.videoInPlaylist = playlistIndex;
            });
    }

    loadMoreVideos(): void {
        this.youtubeApi.getPlaylist(this.playlistId, this.nextPageToken)
            .subscribe((nextVideos: any) => {
                this.playlist = this.playlist.concat(nextVideos.items);
                this.nextPageToken = nextVideos.nextPageToken;
            });
    }
}
