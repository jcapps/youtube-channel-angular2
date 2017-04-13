import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AboutComponent } from '../../../app/about/about.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('AboutComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const channelInfo = {
        items: [{
            snippet: {
                thumbnails: {
                    medium: {
                        url: testUrl
                }},
                description: 'Dummy description.\nThis is a test.'
    }}]};
    let fixture: ComponentFixture<AboutComponent>;
    let component: AboutComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getChannelInfo(): Observable<any> {
            return Observable.of(channelInfo);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AboutComponent ]
        }).overrideComponent(AboutComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getChannelInfo').and.returnValue(Observable.of(channelInfo));
    });

    it('Should load AboutComponent', () => {
        expect(component instanceof AboutComponent).toBe(true);
    });

    it('Should getChannelInfo on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getChannelInfo).toHaveBeenCalledTimes(1);
    });

    it('Should create profile image', () => {
        const image: DebugElement = fixture.debugElement.query(By.css('img'));
        const imageElement: HTMLElement = image.nativeElement;
        expect(image.name).toBe('img');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(imageElement.getAttribute('src')).toBe(channelInfo.items[0].snippet.thumbnails.medium.url);
            expect(imageElement.getAttribute('id')).toBe('profile-pic');
            expect(imageElement.getAttribute('alt')).toBe('Profile Picture');
        });
    });

    it('Should create pageTitle', () => {
        const title: DebugElement = fixture.debugElement.query(By.css('h3'));
        const titleElement: HTMLElement = title.nativeElement;
        expect(title.name).toBe('h3');

        fixture.detectChanges();
        expect(titleElement.textContent).toBe('About My Channel');
    });

    it('Should create channel description', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const description: DebugElement = fixture.debugElement.query(By.css('p'));
            const descriptionParts: Array<DebugElement> = description.queryAll(By.css('span'));

            expect(descriptionParts.length).toEqual(2);
            expect(descriptionParts[0].nativeElement.textContent).toEqual('Dummy description.');
            expect(descriptionParts[1].nativeElement.textContent).toEqual('This is a test.');
        });
    });
});
