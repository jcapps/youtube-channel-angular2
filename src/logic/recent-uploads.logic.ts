import { Injectable } from '@angular/core';
import { YouTubeLogic } from './youtube.logic';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class RecentUploadsLogic {
    constructor(private youtubeLogic: YouTubeLogic) {}

    getMostRecentUpload(): Observable<any> {
        return Observable.create((observer: any) => {
            this.getRecentUploadsPlaylist().subscribe((playlist: any) => {
                let videoId = playlist.items[0].snippet.resourceId.videoId;

                this.youtubeLogic.getVideo(videoId).subscribe(video => {
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
                    this.youtubeLogic.getPlaylist(playlistId).subscribe(playlist => {
                        observer.next(playlist);
                        observer.complete();
                    });
                });
        });
    }

    getRecentUploadsPlaylistId(): Observable<any> {
        return Observable.create((observer: any) => {
            this.youtubeLogic.getChannelDetails().subscribe(channelDetails => {
                let playlistId = channelDetails.items[0].contentDetails.relatedPlaylists.uploads;
                observer.next(playlistId);
                observer.complete();
            });
        });
    }
}
