import { async, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { YouTubeApi } from '../../api/youtube.api';

describe('YouTube API', () => {
    let youtubeApi: YouTubeApi;
    let mockHttp: any;

    @Injectable()
    class MockHttp {
        public get(): Observable<Response> {
            return Observable.of(new Response(new ResponseOptions({})));
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                YouTubeApi,
                { provide: Http, useClass: MockHttp }
            ]
        });
        youtubeApi = TestBed.get(YouTubeApi);
        mockHttp = TestBed.get(Http);
    }));

    describe('getChannelDetails', () => {
        it('Should make call to YouTube API and get channelDetails', () => {
            const expectedResult = {channelDetails: [{ id: 'XXXXX' }]};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getChannelDetails().subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('getChannelInfo', () => {
        it('Should make call to YouTube API and get channelInfo', () => {
            const expectedResult = {channelInfo: [{ id: 'XXXXX' }]};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getChannelInfo().subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('getAllPlaylists', () => {
        it('Should make call to YouTube API and get allPlaylists', () => {
            const expectedResult = {playlists: [{ id: 'XXXXX' }]};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getAllPlaylists().subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });

        it('Should make call to YouTube API and get allPlaylists when passed a pageToken', () => {
            const expectedResult = {playlists: [{ id: 'XXXXX' }]};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getAllPlaylists('TOKEN').subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('getPlaylist', () => {
        it('Should make call to YouTube API and get playlist when passed a playlistId', () => {
            const expectedResult = {playlist: [{ id: 'XXXXX' }]};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getPlaylist('ID').subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });

        it('Should make call to YouTube API and get playlist when passed a playlistId and a pageToken', () => {
            const expectedResult = {playlist: [{ id: 'XXXXX' }]};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getPlaylist('ID', 'TOKEN').subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('getPlaylistInfo', () => {
        it('Should make call to YouTube API and get playlistInfo when passed a playlistId', () => {
            const expectedResult = {playlistInfo: { id: 'XXXXX' }};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getPlaylistInfo('ID').subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('getVideo', () => {
        it('Should make call to YouTube API and get video when passed a videoId', () => {
            const expectedResult = {video: { id: 'XXXXX' }};
            spyOn(mockHttp, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
                body: expectedResult
            }))));

            youtubeApi.getVideo('ID').subscribe(result => {
                expect(result).toEqual(expectedResult);
            });
        });
    });
});
