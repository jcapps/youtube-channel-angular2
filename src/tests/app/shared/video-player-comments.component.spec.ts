import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { VideoPlayerCommentsComponent } from '../../../app/shared/video-player-comments.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('VideoPlayerCommentsComponent', () => {
    const videoSeek = Function();
    let comments = {
        items: [
            {id: '11'},
            {id: '22'}
        ],
        nextPageToken: 'TOKEN'
    };
    const video = {
        id: '1',
        statistics: {
            commentCount: 2
        }
    };
    let fixture: ComponentFixture<WrapperComponent>;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getComments(): Observable<any> {
            return Observable.of(comments);
        }
    }

    @Component({
        template: `<video-player-comments [video]="mockVideo" (videoSeekEmitter)="mockVideoSeek($event)"></video-player-comments>`
    })
    class WrapperComponent {
        mockVideo = video;
        mockVideoSeek = videoSeek;
    }

    @Component({
        selector: 'comment-thread',
        template: `<div></div>`
    })
    class DummyThreadComponent {
        @Input() public thread: any;
        @Input() public videoId: string;
        @Output() public videoSeekEmitter: EventEmitter<string> = new EventEmitter<string>();
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WrapperComponent,
                DummyThreadComponent,
                VideoPlayerCommentsComponent
            ]
        }).overrideComponent(VideoPlayerCommentsComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WrapperComponent);

        youtubeLogic = fixture.debugElement.query(By.css('video-player-comments')).injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getComments').and.returnValue(Observable.of(comments));
    });

    it('Should load VideoPlayerCommentsComponent', () => {
        const commentsFixture = TestBed.createComponent(VideoPlayerCommentsComponent);
        const component = commentsFixture.componentInstance;

        expect(component instanceof VideoPlayerCommentsComponent).toBe(true);
    });

    it('Should getComments on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getComments).toHaveBeenCalled();
        expect(youtubeLogic.getComments).toHaveBeenCalledWith(video.id, 'relevance');
    });

    it('Should create \'Loading comments...\' div when still retrieving data', () => {
        comments.items = null;

        fixture.detectChanges();
        const component: DebugElement = fixture.debugElement.query(By.css('video-player-comments'));

        expect(component.nativeElement.innerText).toEqual('(Loading comments...)');

        comments.items = [
            {id: '11'},
            {id: '22'}
        ];
    });

    it('Should create \'Comments: 0\' div when video has no comments', () => {
        comments.items = [];

        fixture.detectChanges();
        const component: DebugElement = fixture.debugElement.query(By.css('video-player-comments'));

        expect(component.nativeElement.innerText).toEqual('Comments: 0');

        comments.items = [
            {id: '11'},
            {id: '22'}
        ];
    });

    it('Should create comments header', () => {
        fixture.detectChanges();
        const commentHeader: DebugElement = fixture.debugElement.query(By.css('div.comment-header'));
        const commentStats: DebugElement = commentHeader.query(By.css('div.comment-stats'));
        const commentSort: DebugElement = commentHeader.query(By.css('select.comment-sort'));

        expect(commentStats.name).toEqual('div');
        expect(commentSort.name).toEqual('select');
        expect(commentStats.nativeElement.textContent).toEqual('Comments: 2');
        expect(commentSort.nativeElement.value).toEqual('relevance');
        expect(commentSort.children.length).toEqual(2);
        expect(commentSort.children[0].nativeElement.value).toEqual('relevance');
        expect(commentSort.children[1].nativeElement.value).toEqual('time');
        expect(commentSort.children[0].nativeElement.textContent).toEqual('Relevance');
        expect(commentSort.children[1].nativeElement.textContent).toEqual('Most Recent');

        youtubeLogic.getComments.calls.reset();
        commentSort.triggerEventHandler('change', {target: {value: 'time'}});

        expect(youtubeLogic.getComments).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getComments).toHaveBeenCalledWith(video.id, 'time');
    });

    it('Should create comments section', () => {
        fixture.detectChanges();
        const commentSection: DebugElement = fixture.debugElement.query(By.css('div.comment-section'));
        const commentThreads: DebugElement[] = commentSection.queryAll(By.css('comment-thread'));

        expect(commentThreads.length).toEqual(2);
        expect(commentThreads[0].componentInstance.thread).toEqual(comments.items[0]);
        expect(commentThreads[1].componentInstance.thread).toEqual(comments.items[1]);
        expect(commentThreads[0].componentInstance.videoId).toEqual(video.id);
        expect(commentThreads[1].componentInstance.videoId).toEqual(video.id);
    });

    it('Should create a \'View More\' link if has nextPageToken', () => {
        fixture.detectChanges();
        const commentSection: DebugElement = fixture.debugElement.query(By.css('div.comment-section'));
        const viewMore: DebugElement = commentSection.query(By.css('#view-more-comments'));

        expect(viewMore.name).toEqual('a');
        expect(viewMore.query(By.css('div')).nativeElement.textContent).toEqual('View More');
    });

    it('Should not create a \'View More\' link if no nextPageToken exists', () => {
        comments.nextPageToken = '';

        fixture.detectChanges();
        const commentSection: DebugElement = fixture.debugElement.query(By.css('div.comment-section'));
        const viewMore: DebugElement = commentSection.query(By.css('#view-more-comments'));

        expect(viewMore).toBeNull();

        comments.nextPageToken = 'TOKEN';
    });

    it('Should load more comments when \'View More\' is clicked', () => {
        fixture.detectChanges();
        const commentSection: DebugElement = fixture.debugElement.query(By.css('div.comment-section'));
        const viewMore: DebugElement = commentSection.query(By.css('#view-more-comments'));

        youtubeLogic.getComments.calls.reset();
        viewMore.triggerEventHandler('click', null);

        expect(youtubeLogic.getComments).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getComments).toHaveBeenCalledWith(video.id, 'relevance', comments.nextPageToken);
    });
});
