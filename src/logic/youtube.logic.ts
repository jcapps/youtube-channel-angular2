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

    getComments(videoId: string, sortOrder: string, pageToken = ''): Observable<any> {
        return this.youtubeApi.getCommentThreads(videoId, sortOrder, pageToken);
    }

    getReplies(commentId: string, maxResults: number, pageToken = ''): Observable<any> {
        return this.youtubeApi.getReplyThreads(commentId, maxResults, pageToken);
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

    searchChannel(query: string, pageToken = ''): Observable<any> {
        return this.youtubeApi.search(query, pageToken);
    }

    subscribeToChannel(): Observable<any> {
        return this.youtubeApi.subscribe();
    }
}
