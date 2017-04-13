import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TitlebarComponent } from '../../../app/header/titlebar.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('TitlebarComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const channelInfo = {
        items: [{
            snippet: {
                thumbnails: {
                    default: {
                        url: testUrl
                }},
                description: 'Dummy description.\nThis is a test.'
    }}]};
    let fixture: ComponentFixture<TitlebarComponent>;
    let component: TitlebarComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getChannelInfo(): Observable<any> {
            return Observable.of(channelInfo);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TitlebarComponent ]
        }).overrideComponent(TitlebarComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TitlebarComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getChannelInfo').and.returnValue(Observable.of(channelInfo));
    });

    it('Should load TitlebarComponent', () => {
        expect(component instanceof TitlebarComponent).toBe(true);
    });

    it('Should getChannelInfo on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getChannelInfo).toHaveBeenCalledTimes(1);
    });

    it('Should create profile img avatar', () => {
        const image: DebugElement = fixture.debugElement.query(By.css('img'));
        const imageElement: HTMLElement = image.nativeElement;
        expect(image.name).toBe('img');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(imageElement.getAttribute('src')).toBe(channelInfo.items[0].snippet.thumbnails.default.url);
            expect(imageElement.getAttribute('id')).toBe('profile-thumbnail');
            expect(imageElement.getAttribute('alt')).toBe('Profile Thumbnail');
        });
    });

    it('Should create website title', () => {
        const title: DebugElement = fixture.debugElement.query(By.css('h3'));
        const titleElement: HTMLElement = title.nativeElement;
        expect(title.name).toBe('h3');

        fixture.detectChanges();
        expect(titleElement.textContent).toBe('James Capps\' YouTube Channel');
    });
});
