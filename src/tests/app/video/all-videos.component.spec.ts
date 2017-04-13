import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AllVideosComponent } from '../../../app/video/all-videos.component';
import { VideoResultComponent } from '../../../app/video/video-result.component';
import { RecentUploadsLogic } from '../../../logic/recent-uploads.logic';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('AllVideosComponent', () => {
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
    const playlist = {
        items: [
            {snippet: {title: 'Title 1', resourceId: {videoId: '1'}}},
            {snippet: {title: 'Title 2', resourceId: {videoId: '2'}}},
            {snippet: {title: 'Title 3', resourceId: {videoId: '3'}}}
        ],
        nextPageToken: 'TOKEN'
    };
    let fixture: ComponentFixture<AllVideosComponent>;
    let component: AllVideosComponent;
    let recentUploadsLogic: any;
    let youtubeLogic: any;

    @Injectable()
    class MockRecentUploadsLogic {
        public getRecentUploadsPlaylist(): Observable<any> {
            return Observable.of(playlist);
        }
    }

    @Injectable()
    class MockYouTubeLogic {
        public getPlaylist(): Observable<any> {
            return Observable.of(playlist);
        }
        public getVideo(): Observable<any> {
            return Observable.of(video);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ AllVideosComponent, VideoResultComponent ]
        }).overrideComponent(AllVideosComponent, {
            set: {
                providers: [
                    { provide: RecentUploadsLogic, useClass: MockRecentUploadsLogic },
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AllVideosComponent);
        component = fixture.componentInstance;

        recentUploadsLogic = fixture.debugElement.injector.get(RecentUploadsLogic);
        spyOn(recentUploadsLogic, 'getRecentUploadsPlaylist').and.returnValue(Observable.of(playlist));

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getPlaylist').and.returnValue(Observable.of(playlist));
    });

    it('Should load AllVideosComponent', () => {
        expect(component instanceof AllVideosComponent).toBe(true);
    });

    it('Should getRecentUploadsPlaylist on init', () => {
        fixture.detectChanges();
        expect(recentUploadsLogic.getRecentUploadsPlaylist).toHaveBeenCalledTimes(1);
    });

    it('Should create page heading', () => {
        fixture.detectChanges();
        const title: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;

        expect(title).toEqual('Videos');
    });

    it('Should create list of videos', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('#video-list'));
        const links: Array<DebugElement> = list.queryAll(By.css('a'));

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(links.length).toEqual(4); // Has pageToken, so View More link is also created
            expect(links[0].nativeElement.getAttribute('href')).toEqual('/watch/1');
            expect(links[1].nativeElement.getAttribute('href')).toEqual('/watch/2');
            expect(links[2].nativeElement.getAttribute('href')).toEqual('/watch/3');
            expect(links[0].query(By.css('video-result')).name).toEqual('video-result');
            expect(links[1].query(By.css('video-result')).name).toEqual('video-result');
            expect(links[2].query(By.css('video-result')).name).toEqual('video-result');

            const result1 = links[0].query(By.css('video-result')).componentInstance;
            const result2 = links[1].query(By.css('video-result')).componentInstance;
            const result3 = links[2].query(By.css('video-result')).componentInstance;
            expect(result1.videoId).toEqual(playlist.items[0].snippet.resourceId.videoId);
            expect(result2.videoId).toEqual(playlist.items[1].snippet.resourceId.videoId);
            expect(result3.videoId).toEqual(playlist.items[2].snippet.resourceId.videoId);
        });
    });

    it('Should create \'View More\' link if has nextPageToken', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('#video-list'));
        const link: DebugElement = list.queryAll(By.css('a'))[3];

        expect(link.query(By.css('div')).nativeElement.textContent).toEqual('View More');
    });

    it('Should load more results when \'View More\' is clicked', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('#video-list'));
        const link: DebugElement = list.queryAll(By.css('a'))[3];

        link.triggerEventHandler('click', null);

        expect(youtubeLogic.getPlaylist).toHaveBeenCalledTimes(1);
    });
});
