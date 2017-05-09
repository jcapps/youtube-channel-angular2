import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { VideoWatchPageComponent } from '../../../app/video/video-watch-page.component';
import { SharedModule } from '../../../app/shared/shared.module';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('VideoWatchPageComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const video = {
        items: [
            { snippet: {
                title: 'Title | Test Video',
                description: 'Video Description',
                thumbnails: {
                    medium: {
                        url: testUrl
    }}}}]};
    const videoId = 'q60pO0nOLn8';
    const navigationEnd = new NavigationEnd(0, 'http://localhost:3000/watch/' + videoId, null);
    let fixture: ComponentFixture<VideoWatchPageComponent>;
    let component: VideoWatchPageComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getComments(): Observable<any> {
            return Observable.of({});
        }
        public getVideo(): Observable<any> {
            return Observable.of(video);
        }
        public getVideoStats(): Observable<any> {
            return Observable.of({});
        }
    }

    const mockActivatedRoute = {
        snapshot: {
            params: {
                id: videoId
    }}};
    const mockRouterEvent = {
        events: Observable.of(navigationEnd)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ SharedModule ],
            declarations: [ VideoWatchPageComponent ]
        }).overrideComponent(VideoWatchPageComponent, {
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
        fixture = TestBed.createComponent(VideoWatchPageComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getVideo').and.returnValue(Observable.of(video));
    });

    it('Should load VideoWatchPageComponent', () => {
        expect(component instanceof VideoWatchPageComponent).toBe(true);
    });

    it('Should getVideo on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getVideo).toHaveBeenCalledTimes(1);
    });

    it('Should create a VideoPlayer', () => {
        fixture.detectChanges();
        const player: DebugElement = fixture.debugElement.query(By.css('video-player'));

        expect(player.name).toEqual('video-player');
    });
});
