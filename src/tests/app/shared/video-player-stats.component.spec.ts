import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { VideoPlayerStatsComponent } from '../../../app/shared/video-player-stats.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('VideoPlayerStatsComponent', () => {
    const statistics = {
        viewCount: '1000',
        likeCount: '10',
        dislikeCount: '1'
    };
    let fixture: ComponentFixture<VideoPlayerStatsComponent>;
    let component: VideoPlayerStatsComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getVideoStats(): Observable<any> {
            return Observable.of({});
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VideoPlayerStatsComponent ]
        }).overrideComponent(VideoPlayerStatsComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(VideoPlayerStatsComponent);
        component = fixture.componentInstance;
        spyOn(component, 'getStatistics').and.callThrough();
        spyOn(component, 'prepareStatistics').and.callThrough();
        spyOn(component, 'setLikeBarWidths').and.callThrough();

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getVideoStats').and.returnValue(Observable.of(statistics));
    });

    it('Should load VideoPlayerStatsComponent', () => {
        expect(component instanceof VideoPlayerStatsComponent).toBe(true);
    });

    it('Should getVideoStats via getStatistics on init', () => {
        fixture.detectChanges();
        expect(component.getStatistics).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getVideoStats).toHaveBeenCalledTimes(1);
    });

    it('Should setLikeBarWidths after getting stats', (done: Function) => {
        fixture.detectChanges();
        const container: DebugElement = fixture.debugElement.query(By.css('#like-bar-container'));
        const likeBar: DebugElement = container.query(By.css('#like-bar'));
        const dislikeBar: DebugElement = container.query(By.css('#dislike-bar'));

        const likeCount = parseInt(statistics.likeCount, 10);
        const totalCount = likeCount + parseInt(statistics.dislikeCount, 10);
        const likePercentage = 100 * (likeCount / totalCount);
        const dislikePercentage = 100 - likePercentage;

        setTimeout(() => {
            expect(component.setLikeBarWidths).toHaveBeenCalledTimes(1);
            expect(likeBar.nativeElement.getAttribute('style')).toEqual('width: ' + likePercentage + '%;');
            expect(dislikeBar.nativeElement.getAttribute('style')).toEqual('width: ' + dislikePercentage + '%;');
            expect(likeBar.nativeElement.classList.contains('displayed')).toEqual(true);
            expect(dislikeBar.nativeElement.classList.contains('displayed')).toEqual(true);
            done();
        }, 100);
    });

    it('Should prepareStatistics after view loads', () => {
        fixture.detectChanges();
        expect(component.prepareStatistics).toHaveBeenCalledTimes(1);
    });

    it('Should create video-stats div', () => {
        fixture.detectChanges();
        const videoStats: DebugElement = fixture.debugElement.query(By.css('.video-stats'));

        expect(videoStats.name).toEqual('div');
    });

    it('Should create like-bar container div', () => {
        fixture.detectChanges();
        const container: DebugElement = fixture.debugElement.query(By.css('#like-bar-container'));
        const likeBar: DebugElement = container.query(By.css('#like-bar'));
        const dislikeBar: DebugElement = container.query(By.css('#dislike-bar'));
        const emptyBar: DebugElement = container.query(By.css('#empty-bar'));

        expect(container.name).toEqual('div');
        expect(likeBar.name).toEqual('div');
        expect(dislikeBar.name).toEqual('div');
        expect(emptyBar).toBeNull();
    });

    it('Should create an \'empty\' like bar when likes and dislikes are 0', () => {
        const likelessStats = {
            viewCount: '1000',
            likeCount: '0',
            dislikeCount: '0'
        };
        youtubeLogic.getVideoStats.and.returnValue(Observable.of(likelessStats));

        fixture.detectChanges();
        const container: DebugElement = fixture.debugElement.query(By.css('#like-bar-container'));
        const emptyBar: DebugElement = container.query(By.css('#empty-bar'));

        expect(container.name).toEqual('div');
        expect(emptyBar.name).toEqual('div');
    });

    it('Should create stats div', () => {
        fixture.detectChanges();
        const stats: DebugElement = fixture.debugElement.query(By.css('#stats'));
        const likesDislikes: DebugElement = stats.query(By.css('#likes-dislikes'));
        const likes: DebugElement = likesDislikes.query(By.css('#likes'));
        const dislikes: DebugElement = likesDislikes.query(By.css('#dislikes'));
        const views: DebugElement = stats.query(By.css('#views'));
        const endDiv: DebugElement = stats.query(By.css('#end-stats'));

        const likesText = likesDislikes.nativeElement.textContent.replace(/\r?\n|\r|\s/g, '').trim();
        const viewsText = views.nativeElement.textContent.replace(/\r?\n|\r|\s/g, '').trim();

        expect(stats.name).toEqual('div');
        expect(likesDislikes.name).toEqual('div');
        expect(likes.name).toEqual('span');
        expect(dislikes.name).toEqual('span');
        expect(views.name).toEqual('div');
        expect(endDiv.name).toEqual('div');
        expect(likesText).toEqual('Likes:10-1');
        expect(viewsText).toEqual('Views:1,000');
    });
});
