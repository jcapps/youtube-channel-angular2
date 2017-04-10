import { Component, OnInit } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public pageTitle: string = 'Most Recent Upload';
    public video: Object;
    constructor(private youtubeApi: YouTubeApi) {}

    ngOnInit(): void {
        this.getMostRecentUpload()
            .subscribe((video: any) => {
                this.video = video.items[0];
            });
    }

    getMostRecentUpload(): Observable<any> {
        return Observable.create((observer: any) => {
            this.getRecentUploadsPlaylist()
                .subscribe((playlist: any) => {
                    let videoId = playlist.items[0].snippet.resourceId.videoId;

                    this.youtubeApi.getVideo(videoId)
                        .subscribe(video => {
                            observer.next(video);
                            observer.complete();
                        });
                });
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
                    let playlistId = channelDetails.items[0].contentDetails.relatedPlaylists.uploads;
                    observer.next(playlistId);
                    observer.complete();
                });
        });
    }
}
