import { async, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { RecentUploadsLogic } from '../../logic/recent-uploads.logic';
import { YouTubeLogic } from '../../logic/youtube.logic';

describe('RecentUploadsLogic', () => {
    let recentUploadsLogic: RecentUploadsLogic;
    let youtubeLogic: YouTubeLogic;

    @Injectable()
    class MockYouTubeLogic {
        public getChannelDetails(): Observable<any> { return Observable.of(); }
        public getPlaylist():       Observable<any> { return Observable.of(); }
        public getVideo():          Observable<any> { return Observable.of(); }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                RecentUploadsLogic,
                { provide: YouTubeLogic, useClass: MockYouTubeLogic }
            ]
        });
        recentUploadsLogic = TestBed.get(RecentUploadsLogic);
        youtubeLogic = TestBed.get(YouTubeLogic);
    }));

    describe('getMostRecentUpload', () => {
        it('Should return video of most recent upload', () => {
            const videoId = '1';
            const video = {};
            const playlist = {
                items: [
                    { snippet: {
                        resourceId: {
                            videoId: videoId
            }}}]};
            spyOn(recentUploadsLogic, 'getRecentUploadsPlaylist').and.returnValue(Observable.of(playlist));
            spyOn(youtubeLogic, 'getVideo').and.returnValue(Observable.of(video));

            recentUploadsLogic.getMostRecentUpload().subscribe(result => {
                expect(result).toBe(video);
                expect(recentUploadsLogic.getRecentUploadsPlaylist).toHaveBeenCalled();
                expect(youtubeLogic.getVideo).toHaveBeenCalledWith(videoId);
            });
        });
    });

    describe('getRecentUploadPlaylist', () => {
        it('Should return playlist of most recent uploads', () => {
            const playlistId = '1';
            const playlist: Array<any> = [];
            spyOn(recentUploadsLogic, 'getRecentUploadsPlaylistId').and.returnValue(Observable.of(playlistId));
            spyOn(youtubeLogic, 'getPlaylist').and.returnValue(Observable.of(playlist));

            recentUploadsLogic.getRecentUploadsPlaylist().subscribe(result => {
                expect(result).toBe(playlist);
                expect(recentUploadsLogic.getRecentUploadsPlaylistId).toHaveBeenCalled();
                expect(youtubeLogic.getPlaylist).toHaveBeenCalledWith(playlistId);
            });
        });
    });

    describe('getRecentUploadPlaylistId', () => {
        it('Should return playlist of most recent uploads', () => {
            const playlistId = '1';
            const channelDetails = {
                items: [
                    { contentDetails: {
                        relatedPlaylists: {
                            uploads: playlistId
            }}}]};
            spyOn(youtubeLogic, 'getChannelDetails').and.returnValue(Observable.of(channelDetails));

            recentUploadsLogic.getRecentUploadsPlaylistId().subscribe(result => {
                expect(result).toBe(playlistId);
                expect(youtubeLogic.getChannelDetails).toHaveBeenCalled();
            });
        });
    });
});
