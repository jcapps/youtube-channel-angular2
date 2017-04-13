import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, EventEmitter, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PlaylistComponent } from '../../../app/playlist/playlist.component';
import { VideoThumbnailComponent } from '../../../app/playlist/video-thumbnail.component';
import { SharedModule } from '../../../app/shared/shared.module';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('PlaylistComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const currentVideo = {
        items: [
            { snippet: {
                title: 'Title | Test Video',
                description: 'Video Description',
                thumbnails: {
                    medium: {
                        url: testUrl
    }}}}]};
    const playlist = {
        items: [
            { snippet: {
                position: 0,
                resourceId: { videoId: '0' },
                channelTitle: 'Channel Title',
                title: 'Title | Test Video',
                description: 'Video Description',
                thumbnails: {
                    medium: {
                        url: testUrl
            }}}},
            { snippet: {
                position: 1,
                resourceId: { videoId: '1' },
                channelTitle: 'Channel Title',
                title: 'Title | Test Video',
                description: 'Video Description',
                thumbnails: {
                    medium: {
                        url: testUrl
            }}}}
        ],
        nextPageToken: 'TOKEN'
    };
    const playlistInfo = {
        items: [
            { snippet: { title: 'Playlist Title' } }
        ]
    };
    const playlistId = 'PLrsVhZnOhipXeQt7DTD-u5I1S9n2arcdq';
    const navigationEnd = new NavigationEnd(0, 'http://localhost:3000/playlist/' + playlistId, null);
    let fixture: ComponentFixture<PlaylistComponent>;
    let component: PlaylistComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getPlaylist(): Observable<any> {
            return Observable.of(playlist);
        }
        public getPlaylistInfo(): Observable<any> {
            return Observable.of(playlistInfo);
        }
        public getVideo(): Observable<any> {
            return Observable.of(currentVideo);
        }
    }

    const mockActivatedRoute = {
        snapshot: {
            params: {
                id: playlistId
    }}};
    const mockRouterEvent = {
        events: Observable.of(navigationEnd)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ SharedModule ],
            declarations: [ PlaylistComponent, VideoThumbnailComponent ]
        }).overrideComponent(PlaylistComponent, {
            set: {
                providers: [
                    { provide: ActivatedRoute, useValue: mockActivatedRoute },
                    { provide: Router, useValue: mockRouterEvent },
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PlaylistComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getPlaylist').and.returnValue(Observable.of(playlist));
        spyOn(youtubeLogic, 'getPlaylistInfo').and.returnValue(Observable.of(playlistInfo));
        spyOn(youtubeLogic, 'getVideo').and.returnValue(Observable.of(currentVideo));
    });

    it('Should load PlaylistComponent', () => {
        expect(component instanceof PlaylistComponent).toBe(true);
    });

    it('Should getPlaylist, getPlaylistInfo, and getVideo on init', () => {
        fixture.detectChanges();
        expect(component.playlistId).toEqual(playlistId);
        expect(youtubeLogic.getPlaylist).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getPlaylistInfo).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getVideo).toHaveBeenCalledTimes(1);
    });

    it('Should create playlist title', () => {
        fixture.detectChanges();
        const title: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;

        expect(title).toEqual('Playlist Title');
    });

    it('Should create the video list', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const videoList: DebugElement = fixture.debugElement.query(By.css('#video-list'));
            const videoDivs: Array<DebugElement> = videoList.children.filter(child => child.name === 'div');

            const video1 = playlist.items[0];
            const video2 = playlist.items[1];

            expect(videoList.name).toEqual('div');
            expect(videoDivs.length).toEqual(2);

            const videoDiv1: DebugElement = videoDivs[0].children[0];
            const videoDiv2: DebugElement = videoDivs[1].children[0];

            expect(videoDiv1.nativeElement.classList.contains('playlist-video')).toBeTruthy();
            expect(videoDiv2.nativeElement.classList.contains('playlist-video')).toBeTruthy();
            expect(videoDiv1.nativeElement.classList.contains('selected')).toBeTruthy();
            expect(videoDiv2.nativeElement.classList.contains('selected')).toBeFalsy();
            expect(videoDiv1.nativeElement.getAttribute('id')).toEqual('0');
            expect(videoDiv2.nativeElement.getAttribute('id')).toEqual('1');

            const thumbnail1: DebugElement = videoDiv1.query(By.css('video-thumbnail'));
            const thumbnail2: DebugElement = videoDiv2.query(By.css('video-thumbnail'));

            expect(thumbnail1.name).toEqual('video-thumbnail');
            expect(thumbnail2.name).toEqual('video-thumbnail');

            const instance1 = thumbnail1.componentInstance;
            const instance2 = thumbnail2.componentInstance;

            expect(instance1.video).toBe(video1);
            expect(instance2.video).toBe(video2);
            expect(instance1.position).toEqual(video1.snippet.position);
            expect(instance2.position).toEqual(video2.snippet.position);
        });
    });

    it('Should create a "View More" link if nextPageToken exists', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const videoList: DebugElement = fixture.debugElement.query(By.css('#video-list'));
            const viewMoreLink: DebugElement = videoList.query(By.css('a'));

            expect(viewMoreLink.name).toEqual('a');
            expect(viewMoreLink.query(By.css('div')).nativeElement.textContent).toEqual('View More');
        });
    });

    it('Should not create a "View More" link if no nextPageToken exists', () => {
        const tempPlaylist = {
            items: playlist.items,
            nextPageToken: ''
        };
        youtubeLogic.getPlaylist.and.returnValue(Observable.of(tempPlaylist));

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const videoList: DebugElement = fixture.debugElement.query(By.css('#video-list'));
            const viewMoreLink: DebugElement = videoList.query(By.css('a'));

            expect(viewMoreLink).toBeNull();
        });
    });

    it('Should create a VideoPlayer', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const player: DebugElement = fixture.debugElement.query(By.css('video-player'));
            const playerInstance = player.componentInstance;

            expect(player.name).toEqual('video-player');
            expect(playerInstance.video).toBe(currentVideo.items[0]);
            expect(playerInstance.playlistIndex).toEqual(0);
            expect(playerInstance.playlistId).toEqual(playlistId);
            expect(playerInstance.updatePlaylist instanceof EventEmitter).toBeTruthy();
        });
    });

    it('Should change video on VideoThumbnail click', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let videoList: DebugElement = fixture.debugElement.query(By.css('#video-list'));
            const nextVideo: DebugElement = videoList.children.filter(child => child.name === 'div')[1].children[0];
            const mockTarget = {id: nextVideo.nativeElement.getAttribute('id'), className: 'playlist-video'};

            youtubeLogic.getVideo.calls.reset();
            nextVideo.triggerEventHandler('click', {target: mockTarget});

            fixture.detectChanges();
            videoList = fixture.debugElement.query(By.css('#video-list'));
            const videoDivs: Array<DebugElement> = videoList.children.filter(child => child.name === 'div');
            const playerInstance = fixture.debugElement.query(By.css('video-player')).componentInstance;

            expect(youtubeLogic.getVideo).toHaveBeenCalledTimes(1);
            expect(youtubeLogic.getVideo).toHaveBeenCalledWith('1');
            expect(videoDivs[0].children[0].nativeElement.classList.contains('selected')).toBeFalsy();
            expect(videoDivs[1].children[0].nativeElement.classList.contains('selected')).toBeTruthy();
            expect(playerInstance.playlistIndex).toEqual(1);
        });
    });

    it('Should update playlist on state change', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            youtubeLogic.getVideo.calls.reset();

            const playlistIndex = 1;
            component.updatePlaylist(playlistIndex);

            expect(youtubeLogic.getVideo).toHaveBeenCalledTimes(1);
            expect(youtubeLogic.getVideo).toHaveBeenCalledWith('1');
        });
    });

    it('Should load more videos when "View More" is clicked', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const videoList: DebugElement = fixture.debugElement.query(By.css('#video-list'));
            const viewMoreLink: DebugElement = videoList.query(By.css('a'));

            youtubeLogic.getPlaylist.calls.reset();
            viewMoreLink.triggerEventHandler('click', null);

            expect(youtubeLogic.getPlaylist).toHaveBeenCalledTimes(1);
            expect(youtubeLogic.getPlaylist).toHaveBeenCalledWith(playlistId, playlist.nextPageToken);
        });
    });
});
