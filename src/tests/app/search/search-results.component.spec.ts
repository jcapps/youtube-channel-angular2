import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Directive, Injectable, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SearchResultsComponent } from '../../../app/search/search-results.component';
import { PlaylistResultComponent } from '../../../app/playlist/playlist-result.component';
import { VideoResultComponent } from '../../../app/video/video-result.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('SearchResultsComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const playlist = {
        id: {playlistId: '1'},
        snippet: {
            description: 'Playlist Description',
            title: 'Playlist Title',
            thumbnails: {
                medium: {
                    url: testUrl
    }}}};
    const video = {
        items: [
            { snippet: {
                title: 'Title | Test Video',
                description: 'Video Description',
                thumbnails: {
                    medium: {
                        url: testUrl
    }}}}]};
    const query = 'QUERY';
    const navigationEnd = new NavigationEnd(0, 'http://localhost:3000/search/' + query, null);
    const searchResults = {
        items: [
            {id: {videoId: '0'}},
            playlist
        ],
        pageInfo: {totalResults: 10},
        nextPageToken: 'TOKEN'
    };
    let fixture: ComponentFixture<SearchResultsComponent>;
    let component: SearchResultsComponent;
    let youtubeLogic: any;

    @Directive({
        selector: '[routerLink]',
        host: {
            '(click)': 'onClick()'
        }
    })
    class RouterLinkStubDirective {
        @Input('routerLink') linkParams: any;
        navigatedTo: any = null;

        onClick() {
            this.navigatedTo = this.linkParams;
        }
    }

    @Injectable()
    class MockYouTubeLogic {
        public getVideo(): Observable<any> {
            return Observable.of(video);
        }
        public searchChannel(): Observable<any> {
            return Observable.of(searchResults);
        }
    }

    const mockActivatedRoute = {
        snapshot: {
            params: {
                q: query
    }}};
    const mockRouterEvent = {
        events: Observable.of(navigationEnd)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchResultsComponent,
                PlaylistResultComponent,
                VideoResultComponent,
                RouterLinkStubDirective
            ]
        }).overrideComponent(SearchResultsComponent, {
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
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'searchChannel').and.returnValue(Observable.of(searchResults));
    });

    it('Should load SearchResultsComponent', () => {
        expect(component instanceof SearchResultsComponent).toBe(true);
    });

    it('Should searchChannel on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.searchChannel).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.searchChannel).toHaveBeenCalledWith(query);
    });

    it('Should create page heading if results found', () => {
        fixture.detectChanges();
        const title: DebugElement = fixture.debugElement.query(By.css('h3'));
        const querySpan: DebugElement = title.children[1];
        const resultsCount: DebugElement = fixture.debugElement.query(By.css('h4'));

        const queryText = querySpan.nativeElement.textContent.replace(/\r?\n|\r|\s/g, '').trim();

        expect(title.children[0].nativeElement.textContent).toEqual('Search results for: ');
        expect(queryText).toEqual('QUERY');
        expect(querySpan.nativeElement.classList.contains('results-found')).toEqual(true);
        expect(querySpan.nativeElement.classList.contains('no-results')).toEqual(false);
        expect(resultsCount.nativeElement.textContent).toEqual('Results found: 10');
    });

    it('Should create page heading if no results found', () => {
        let noSearchResults = Object.assign({}, searchResults);
        noSearchResults.items = [];
        noSearchResults.pageInfo = {totalResults: 0};
        youtubeLogic.searchChannel.and.returnValue(Observable.of(noSearchResults));

        fixture.detectChanges();
        const title: DebugElement = fixture.debugElement.query(By.css('h3'));
        const querySpan: DebugElement = title.children[1];
        const resultsCount: DebugElement = fixture.debugElement.query(By.css('h4'));

        const queryText = querySpan.nativeElement.textContent.replace(/\r?\n|\r|\s/g, '').trim();

        expect(title.children[0].nativeElement.textContent).toEqual('Search results for: ');
        expect(queryText).toEqual('QUERY');
        expect(querySpan.nativeElement.classList.contains('results-found')).toEqual(false);
        expect(querySpan.nativeElement.classList.contains('no-results')).toEqual(true);
        expect(resultsCount.nativeElement.textContent).toEqual('Results found: 0');
    });

    it('Should create list of results', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('.search-list'));
        const linkDebugElems: Array<DebugElement> = list.queryAll(By.directive(RouterLinkStubDirective));
        const links: Array<RouterLinkStubDirective> = linkDebugElems.map(de =>
            de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(links.length).toEqual(2);
            expect(links[0].linkParams).toEqual(['/watch', '0']);
            expect(links[1].linkParams).toEqual(['/playlist', '1']);
            expect(linkDebugElems[0].query(By.css('video-result')).name).toEqual('video-result');
            expect(linkDebugElems[1].query(By.css('playlist-result')).name).toEqual('playlist-result');

            const result1 = linkDebugElems[0].query(By.css('video-result')).componentInstance;
            const result2 = linkDebugElems[1].query(By.css('playlist-result')).componentInstance;
            expect(result1.videoId).toEqual('0');
            expect(result2.playlist).toEqual(playlist);
        });
    });

    it('Should create \'View More\' link if has nextPageToken', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('.search-list'));
        const link: DebugElement = list.queryAll(By.css('a'))[2];

        expect(link.query(By.css('div')).nativeElement.textContent).toEqual('View More');
    });

    it('Should load more results when \'View More\' is clicked', () => {
        fixture.detectChanges();
        const list: DebugElement = fixture.debugElement.query(By.css('.search-list'));
        const link: DebugElement = list.queryAll(By.css('a'))[2];

        youtubeLogic.searchChannel.calls.reset();
        link.triggerEventHandler('click', null);

        expect(youtubeLogic.searchChannel).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.searchChannel).toHaveBeenCalledWith(query, searchResults.nextPageToken);
    });
});
