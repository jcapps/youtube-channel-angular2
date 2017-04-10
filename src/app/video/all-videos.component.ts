import { Component, OnInit } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './all-videos.component.html'
})
export class AllVideosComponent implements OnInit {
    public nextPageToken: string = null;
    public pageTitle: string = 'Videos';
    public playlist: Array<Object> = null;
    private playlistId: string;
    constructor(private youtubeApi: YouTubeApi) {}

    ngOnInit(): void {
        this.getRecentUploadsPlaylist()
            .subscribe((playlist: any) => {
                this.playlist = playlist.items;
                this.nextPageToken = playlist.nextPageToken;
            });
    }

    loadMoreVideos(): void {
        this.youtubeApi.getPlaylist(this.playlistId, this.nextPageToken)
            .subscribe((nextVideos: any) => {
                this.playlist = this.playlist.concat(nextVideos.items);
                this.nextPageToken = nextVideos.nextPageToken;
            });
    }

    getRecentUploadsPlaylist(): Observable<any> {
        return Observable.create((observer: any) => {
            this.getRecentUploadsPlaylistId()
                .subscribe((playlistId: any) => {
                    this.youtubeApi.getPlaylist(playlistId)
                        .subscribe(playlist => {
                            observer.next(playlist);
                            observer.complete();
                        });
                });
        });
    }

    getRecentUploadsPlaylistId(): Observable<any> {
        return Observable.create((observer: any) => {
            this.youtubeApi.getChannelDetails()
                .subscribe(channelDetails => {
                    const playlistId = channelDetails.items[0].contentDetails.relatedPlaylists.uploads;
                    this.playlistId = playlistId;

                    observer.next(playlistId);
                    observer.complete();
                });
        });
    }
}
