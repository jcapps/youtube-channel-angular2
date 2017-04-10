import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import gapiHelper from './gapi-helper';

const KEY = process.env.YOUTUBE_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const apiUrl = 'https://www.googleapis.com/youtube/v3/';
const channelUrl = apiUrl + 'channels';
const playlistsUrl = apiUrl + 'playlists';
const playlistUrl = apiUrl + 'playlistItems';
const videoUrl = apiUrl + 'videos';

@Injectable()

export class YouTubeApi {
    constructor(private _http: Http) {}

    getChannelDetails(): Observable<any> {
        let params = new URLSearchParams();
        params.set('key', KEY);
        params.set('id', CHANNEL_ID);
        params.set('part', 'contentDetails');

        return this._http.get(channelUrl, { search: params })
            .map((response: Response) => response.json());
    }

    getChannelInfo(): Observable<any> {
        let params = new URLSearchParams();
        params.set('key', KEY);
        params.set('id', CHANNEL_ID);
        params.set('part', 'snippet');

        return this._http.get(channelUrl, { search: params })
            .map((response: Response) => response.json());
    }

    getAllPlaylists(pageToken = ''): Observable<any> {
        let params = new URLSearchParams();
        params.set('key', KEY);
        params.set('channelId', CHANNEL_ID);
        params.set('part', 'snippet');
        params.set('maxResults', '5');
        params.set('pageToken', pageToken);

        return this._http.get(playlistsUrl, { search: params })
            .map((response: Response) => response.json());
    }

    getPlaylist(id: string, pageToken = ''): Observable<any> {
        let params = new URLSearchParams();
        params.set('key', KEY);
        params.set('playlistId', id);
        params.set('part', 'snippet');
        params.set('maxResults', '25');
        params.set('pageToken', pageToken);

        return this._http.get(playlistUrl, { search: params })
            .map((response: Response) => response.json());
    }

    getPlaylistInfo(id: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('key', KEY);
        params.set('id', id);
        params.set('part', 'snippet');

        return this._http.get(playlistsUrl, { search: params })
            .map((response: Response) => response.json());
    }

    getVideo(id: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('key', KEY);
        params.set('id', id);
        params.set('part', 'snippet');

        return this._http.get(videoUrl, { search: params })
            .map((response: Response) => response.json());
    }

    subscribe(): Observable<any> {
        return gapiHelper();
    }
}
