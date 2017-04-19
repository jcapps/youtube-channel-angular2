import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HomeComponent } from '../../../app/home/home.component';
import { HomeModule } from '../../../app/home/home.module';
import { RecentUploadsLogic } from '../../../logic/recent-uploads.logic';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('HomeComponent', () => {
    const mostRecentUpload = {
        items: [{
            snippet: {
                title: 'Title | Test Video',
                description: 'Video Description'
        }}]
    };
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let recentUploadsLogic: any;

    @Injectable()
    class MockRecentUploadsLogic {
        public getMostRecentUpload(): Observable<any> {
            return Observable.of(mostRecentUpload);
        }
    }

    @Injectable()
    class MockYouTubeLogic {
        public getVideoStats(): Observable<any> {
            return Observable.of({});
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HomeModule ]
        }).overrideComponent(HomeComponent, {
            set: {
                providers: [
                    { provide: RecentUploadsLogic, useClass: MockRecentUploadsLogic },
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        recentUploadsLogic = fixture.debugElement.injector.get(RecentUploadsLogic);
        spyOn(recentUploadsLogic, 'getMostRecentUpload').and.returnValue(Observable.of(mostRecentUpload));
    });

    it('Should load HomeComponent', () => {
        expect(component instanceof HomeComponent).toBe(true);
    });

    it('Should getMostRecentUpload on init', () => {
        fixture.detectChanges();
        expect(recentUploadsLogic.getMostRecentUpload).toHaveBeenCalledTimes(1);
    });

    it('Should create page heading', () => {
        fixture.detectChanges();
        const title: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;

        expect(title).toEqual('Most Recent Upload');
    });

    it('Should create a VideoPlayer', () => {
        fixture.detectChanges();
        const player: DebugElement = fixture.debugElement.query(By.css('video-player'));

        expect(player.name).toEqual('video-player');
    });
});
