import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { VideoResultComponent } from '../../../app/video/video-result.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('VideoResultComponent', () => {
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
    let fixture: ComponentFixture<VideoResultComponent>;
    let component: VideoResultComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getVideo(): Observable<any> {
            return Observable.of(video);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VideoResultComponent ]
        }).overrideComponent(VideoResultComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(VideoResultComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getVideo').and.returnValue(Observable.of(video));
    });

    it('Should load VideoResultComponent', () => {
        expect(component instanceof VideoResultComponent).toBe(true);
    });

    it('Should getVideo on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getVideo).toHaveBeenCalledTimes(1);
    });

    it('Should create an image thumbnail', () => {
        fixture.detectChanges();
        const image: DebugElement = fixture.debugElement.query(By.css('img'));
        const imageElement: HTMLElement = image.nativeElement;

        expect(image.name).toBe('img');
        expect(imageElement.getAttribute('height')).toBe('90');
        expect(imageElement.getAttribute('width')).toBe('160');
        expect(imageElement.getAttribute('src')).toBe(video.items[0].snippet.thumbnails.medium.url);
        expect(imageElement.getAttribute('title')).toBe(video.items[0].snippet.title);
        expect(imageElement.getAttribute('alt')).toBe(video.items[0].snippet.title);
    });

    it('Should create a title for the result', () => {
        fixture.detectChanges();
        const title: DebugElement = fixture.debugElement.query(By.css('h4'));

        expect(title.nativeElement.textContent).toEqual(video.items[0].snippet.title);
    });

    it('Should create a description for the result', () => {
        fixture.detectChanges();
        const description: DebugElement = fixture.debugElement.query(By.css('p'));

        expect(description.nativeElement.textContent).toEqual(video.items[0].snippet.description);
    });
});
