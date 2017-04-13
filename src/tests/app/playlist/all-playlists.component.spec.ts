import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AllPlaylistsComponent } from '../../../app/playlist/all-playlists.component';
import { PlaylistResultComponent } from '../../../app/playlist/playlist-result.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('AllPlaylistsComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const allPlaylists = {
        items: [
            {id: '1', snippet: {title: 'Title 1', thumbnails: {medium: {url: testUrl}}}},
            {id: '2', snippet: {title: 'Title 2', thumbnails: {medium: {url: testUrl}}}},
            {id: '3', snippet: {title: 'Title 3', thumbnails: {medium: {url: testUrl}}}}
        ],
        nextPageToken: 'TOKEN'
    };
    let fixture: ComponentFixture<AllPlaylistsComponent>;
    let component: AllPlaylistsComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getAllPlaylists(): Observable<any> {
            return Observable.of(allPlaylists);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ AllPlaylistsComponent, PlaylistResultComponent ]
        }).overrideComponent(AllPlaylistsComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AllPlaylistsComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getAllPlaylists').and.returnValue(Observable.of(allPlaylists));
    });

    it('Should load AllPlaylistsComponent', () => {
        expect(component instanceof AllPlaylistsComponent).toBe(true);
    });

    it('Should getAllPlaylists on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getAllPlaylists).toHaveBeenCalledTimes(1);
    });

    it('Should create page heading', () => {
        fixture.detectChanges();
        const title: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;

        expect(title).toEqual('Playlists');
    });

    it('Should create list of playlists', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('#playlists-list'));
        const links: Array<DebugElement> = list.queryAll(By.css('a'));

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(links.length).toEqual(4); // Has pageToken, so View More link is also created
            expect(links[0].nativeElement.getAttribute('href')).toEqual('/playlist/1');
            expect(links[1].nativeElement.getAttribute('href')).toEqual('/playlist/2');
            expect(links[2].nativeElement.getAttribute('href')).toEqual('/playlist/3');
            expect(links[0].query(By.css('playlist-result')).name).toEqual('playlist-result');
            expect(links[1].query(By.css('playlist-result')).name).toEqual('playlist-result');
            expect(links[2].query(By.css('playlist-result')).name).toEqual('playlist-result');

            const result1 = links[0].query(By.css('playlist-result')).componentInstance;
            const result2 = links[1].query(By.css('playlist-result')).componentInstance;
            const result3 = links[2].query(By.css('playlist-result')).componentInstance;
            expect(result1.playlist).toEqual(allPlaylists.items[0]);
            expect(result2.playlist).toEqual(allPlaylists.items[1]);
            expect(result3.playlist).toEqual(allPlaylists.items[2]);
        });
    });

    it('Should create \'View More\' link if has nextPageToken', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('#playlists-list'));
        const link: DebugElement = list.queryAll(By.css('a'))[3];

        expect(link.query(By.css('div')).nativeElement.textContent).toEqual('View More');
    });

    it('Should load more results when \'View More\' is clicked', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('#playlists-list'));
        const link: DebugElement = list.queryAll(By.css('a'))[3];

        youtubeLogic.getAllPlaylists.calls.reset();
        link.triggerEventHandler('click', null);

        expect(youtubeLogic.getAllPlaylists).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getAllPlaylists).toHaveBeenCalledWith(allPlaylists.nextPageToken);
    });
});
