import { Injectable } from '@angular/core';
import { YouTubeApi } from '../api/youtube.api';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class YouTubeLogic {
    constructor(private youtubeApi: YouTubeApi) {}

    getAllPlaylists(pageToken = ''): Observable<any> {
        return this.youtubeApi.getAllPlaylists(pageToken);
    }

    getChannelDetails(): Observable<any> {
        return this.youtubeApi.getChannelDetails();
    }

    getChannelInfo(): Observable<any> {
        return this.youtubeApi.getChannelInfo();
    }

    getPlaylist(id: string, pageToken = ''): Observable<any> {
        return this.youtubeApi.getPlaylist(id, pageToken);
    }

    getPlaylistInfo(id: string): Observable<any> {
        return this.youtubeApi.getPlaylistInfo(id);
    }

    getVideo(id: string): Observable<any> {
        return this.youtubeApi.getVideo(id);
    }

    subscribeToChannel(): Observable<any> {
        return this.youtubeApi.subscribe();
    }
}
