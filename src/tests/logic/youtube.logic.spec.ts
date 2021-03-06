import { async, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { YouTubeApi } from '../../api/youtube.api';
import { YouTubeLogic } from '../../logic/youtube.logic';

describe('YouTubeLogic', () => {
    let youtubeApi: YouTubeApi;
    let youtubeLogic: YouTubeLogic;

    @Injectable()
    class MockYouTubeApi {
        public getAllPlaylists():   Observable<any> { return Observable.of(); }
        public getChannelInfo():    Observable<any> { return Observable.of(); }
        public getChannelDetails(): Observable<any> { return Observable.of(); }
        public getCommentThreads(): Observable<any> { return Observable.of(); }
        public getPlaylist():       Observable<any> { return Observable.of(); }
        public getPlaylistInfo():   Observable<any> { return Observable.of(); }
        public getReplyThreads():   Observable<any> { return Observable.of(); }
        public getVideo():          Observable<any> { return Observable.of(); }
        public search():            Observable<any> { return Observable.of(); }
        public subscribe():         Observable<any> { return Observable.of(); }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                YouTubeLogic,
                { provide: YouTubeApi, useClass: MockYouTubeApi }
            ]
        });
        youtubeLogic = TestBed.get(YouTubeLogic);
        youtubeApi = TestBed.get(YouTubeApi);
    }));

    describe('getAllPlaylists', () => {
        const pageToken = 'TOKEN';
        const playlists = Observable.of([]);
        beforeEach(() => {
            spyOn(youtubeApi, 'getAllPlaylists').and.returnValue(Observable.of(playlists));
        });

        it('Should return playlists', () => {
            youtubeLogic.getAllPlaylists().subscribe(result => {
                expect(result).toEqual(playlists);
                expect(youtubeApi.getAllPlaylists).toHaveBeenCalled();
            });
        });

        it('Should return playlists when given a pageToken', () => {
            youtubeLogic.getAllPlaylists(pageToken).subscribe(result => {
                expect(result).toEqual(playlists);
                expect(youtubeApi.getAllPlaylists).toHaveBeenCalledWith(pageToken);
            });
        });
    });

    describe('getChannelInfo', () => {
        it('Should return channelInfo', () => {
            const channelInfo = Observable.of({});
            spyOn(youtubeApi, 'getChannelInfo').and.returnValue(Observable.of(channelInfo));

            youtubeLogic.getChannelInfo().subscribe(result => {
                expect(result).toEqual(channelInfo);
                expect(youtubeApi.getChannelInfo).toHaveBeenCalled();
            });
        });
    });

    describe('getChannelDetails', () => {
        it('Should return channelDetails', () => {
            const channelDetails = Observable.of({});
            spyOn(youtubeApi, 'getChannelDetails').and.returnValue(Observable.of(channelDetails));

            youtubeLogic.getChannelDetails().subscribe(result => {
                expect(result).toEqual(channelDetails);
                expect(youtubeApi.getChannelDetails).toHaveBeenCalled();
            });
        });
    });

    describe('getComments', () => {
        it('Should return comments when given a videoId and sortOrder', () => {
            const videoId = '1';
            const sortOrder = 'relevance';
            const comments = Observable.of({});
            spyOn(youtubeApi, 'getCommentThreads').and.returnValue(Observable.of(comments));

            youtubeLogic.getComments(videoId, sortOrder).subscribe(result => {
                expect(result).toEqual(comments);
                expect(youtubeApi.getCommentThreads).toHaveBeenCalledWith(videoId, sortOrder, '');
            });
        });

        it('Should return comments when given a videoId, sortOrder, and pageToken', () => {
            const videoId = '1';
            const sortOrder = 'relevance';
            const pageToken = 'TOKEN';
            const comments = Observable.of({});
            spyOn(youtubeApi, 'getCommentThreads').and.returnValue(Observable.of(comments));

            youtubeLogic.getComments(videoId, sortOrder, pageToken).subscribe(result => {
                expect(result).toEqual(comments);
                expect(youtubeApi.getCommentThreads).toHaveBeenCalledWith(videoId, sortOrder, pageToken);
            });
        });
    });

    describe('getReplies', () => {
        it('Should return replies when given a commentId and maxResults', () => {
            const commentId = '11';
            const maxResults = 2;
            const replies = Observable.of({});
            spyOn(youtubeApi, 'getReplyThreads').and.returnValue(Observable.of(replies));

            youtubeLogic.getReplies(commentId, maxResults).subscribe(result => {
                expect(result).toEqual(replies);
                expect(youtubeApi.getReplyThreads).toHaveBeenCalledWith(commentId, maxResults, '');
            });
        });

        it('Should return replies when given a commentId, maxResults, and pageToken', () => {
            const commentId = '11';
            const maxResults = 10;
            const pageToken = 'TOKEN';
            const replies = Observable.of({});
            spyOn(youtubeApi, 'getReplyThreads').and.returnValue(Observable.of(replies));

            youtubeLogic.getReplies(commentId, maxResults, pageToken).subscribe(result => {
                expect(result).toEqual(replies);
                expect(youtubeApi.getReplyThreads).toHaveBeenCalledWith(commentId, maxResults, pageToken);
            });
        });
    });

    describe('getPlaylist', () => {
        const playlistId = '1';
        const pageToken = 'TOKEN';
        const playlist = Observable.of([]);
        beforeEach(() => {
            spyOn(youtubeApi, 'getPlaylist').and.returnValue(Observable.of(playlist));
        });

        it('Should return a playlist when given a playlistId', () => {
            youtubeLogic.getPlaylist(playlistId).subscribe(result => {
                expect(result).toEqual(playlist);
                expect(youtubeApi.getPlaylist).toHaveBeenCalledWith(playlistId, '');
            });
        });

        it('Should return a playlist when given a playlistId and a pageToken', () => {
            youtubeLogic.getPlaylist(playlistId, pageToken).subscribe(result => {
                expect(result).toEqual(playlist);
                expect(youtubeApi.getPlaylist).toHaveBeenCalledWith(playlistId, pageToken);
            });
        });
    });

    describe('getPlaylistInfo', () => {
        it('Should return playlistInfo when given a playlistId', () => {
            const playlistId = '1';
            const playlistInfo = Observable.of({});
            spyOn(youtubeApi, 'getPlaylistInfo').and.returnValue(Observable.of(playlistInfo));

            youtubeLogic.getPlaylistInfo(playlistId).subscribe(result => {
                expect(result).toEqual(playlistInfo);
                expect(youtubeApi.getPlaylistInfo).toHaveBeenCalledWith(playlistId);
            });
        });
    });

    describe('getVideo', () => {
        it('Should return a video when given a videoId', () => {
            const videoId = '1';
            const video = Observable.of({});
            spyOn(youtubeApi, 'getVideo').and.returnValue(Observable.of(video));

            youtubeLogic.getVideo(videoId).subscribe(result => {
                expect(result).toEqual(video);
                expect(youtubeApi.getVideo).toHaveBeenCalledWith(videoId);
            });
        });
    });

    describe('searchChannel', () => {
        const query = 'QUERY';
        const pageToken = 'TOKEN';
        const results = Observable.of({});
        beforeEach(() => {
            spyOn(youtubeApi, 'search').and.returnValue(Observable.of(results));
        });

        it('Should return search results when given a query string', () => {
            youtubeLogic.searchChannel(query).subscribe(result => {
                expect(result).toEqual(results);
                expect(youtubeApi.search).toHaveBeenCalledWith(query, '');
            });
        });

        it('Should return search results when given a query string and a pageToken', () => {
            youtubeLogic.searchChannel(query, pageToken).subscribe(result => {
                expect(result).toEqual(results);
                expect(youtubeApi.search).toHaveBeenCalledWith(query, pageToken);
            });
        });
    });

    describe('subscribeToChannel', () => {
        it('Should call the API but not return a value', () => {
            spyOn(youtubeApi, 'subscribe').and.returnValue(Observable.of());

            youtubeLogic.subscribeToChannel().subscribe(() => {
                expect(youtubeApi.subscribe).toHaveBeenCalled();
            });
        });
    });
});
