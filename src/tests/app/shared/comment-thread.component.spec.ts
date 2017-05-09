import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CommentBlockComponent } from '../../../app/shared/comment-block.component';
import { CommentThreadComponent } from '../../../app/shared/comment-thread.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('CommentThreadComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/s28/photo.jpg';
    const channelUrl = 'https://www.youtube.com/channel/1234567890';
    const videoId = '1';
    const videoSeek = Function();
    const thread = {
        snippet: {
            topLevelComment: {
                id: '000',
                snippet: {
                    authorDisplayName: 'NAME',
                    authorChannelUrl: channelUrl,
                    authorProfileImageUrl: testUrl,
                    likeCount: 3,
                    textDisplay: 'Test Comment',
                    updatedAt: '2017-01-01T10:00:00.000Z'
            }},
            totalReplyCount: '2'
        }
    };
    const replies = {
        items: [
            {snippet: {
                authorDisplayName: 'NAME',
                authorChannelUrl: channelUrl,
                authorProfileImageUrl: testUrl,
                likeCount: 3,
                textDisplay: 'Test Reply 1',
                updatedAt: '2017-01-01T10:00:00.000Z'
            }},
            {snippet: {
                authorDisplayName: 'NAME',
                authorChannelUrl: channelUrl,
                authorProfileImageUrl: testUrl,
                likeCount: 3,
                textDisplay: 'Test Reply 1',
                updatedAt: '2017-01-01T10:00:00.000Z'
            }}
        ],
        nextPageToken: 'TOKEN'
    };
    let fixture: ComponentFixture<WrapperComponent>;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public getReplies(): Observable<any> {
            return Observable.of(replies);
        }
    }

    @Component({
        template: `<comment-thread
                       [thread]="mockThread"
                       [videoId]="mockId"
                       (videoSeekEmitter)="mockVideoSeek($event)">
                   </comment-thread>`
    })
    class WrapperComponent {
        mockThread = thread;
        mockId = videoId;
        mockVideoSeek = videoSeek;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WrapperComponent,
                CommentBlockComponent,
                CommentThreadComponent
            ]
        }).overrideComponent(CommentThreadComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WrapperComponent);

        youtubeLogic = fixture.debugElement.query(By.css('comment-thread')).injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getReplies').and.returnValue(Observable.of(replies));
    });

    it('Should load CommentThreadComponent', () => {
        const threadFixture = TestBed.createComponent(CommentThreadComponent);
        const component = threadFixture.componentInstance;

        expect(component instanceof CommentThreadComponent).toBe(true);
    });

    it('Should getReplies on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getReplies).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getReplies).toHaveBeenCalledWith(thread.snippet.topLevelComment.id, 2);
    });

    it('Should create the parent comment', () => {
        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const parentComment: DebugElement = commentThread.queryAll(By.css('comment-block'))[0];

        expect(parentComment.name).toEqual('comment-block');
        expect(parentComment.componentInstance.comment).toEqual(thread.snippet.topLevelComment);
        expect(parentComment.componentInstance.videoId).toEqual(videoId);
    });

    it('Should create replies', () => {
        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const replyDivs: DebugElement[] = replySection.children;

        expect(replySection.name).toEqual('div');
        expect(replyDivs.length).toEqual(3); // 2 replies, 1 'View More' link
        expect(replyDivs[2].query(By.css('comment-block')).componentInstance.comment).toEqual(replies.items[0]);
        expect(replyDivs[2].query(By.css('comment-block')).componentInstance.videoId).toEqual(videoId);
    });

    it('Should create replies in descending order', () => {
        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const replyDivs: DebugElement[] = replySection.children;

        expect(replyDivs[1].query(By.css('comment-block')).componentInstance.comment).toEqual(replies.items[1]);
        expect(replyDivs[2].query(By.css('comment-block')).componentInstance.comment).toEqual(replies.items[0]);
    });

    it('Should create a \'View More Replies\' link if has nextPageToken', () => {
        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const viewMore: DebugElement = replySection.query(By.css('a.view-more-replies'));

        expect(viewMore.name).toEqual('a');
        expect(viewMore.query(By.css('div')).nativeElement.textContent).toEqual('View More Replies');
    });

    it('Should not create a \'View More\' link if no nextPageToken exists', () => {
        replies.nextPageToken = '';

        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const viewMore: DebugElement = replySection.query(By.css('a.view-more-replies'));

        expect(viewMore).toBeNull();

        replies.nextPageToken = 'TOKEN';
    });

    it('Should load more replies when \'View More Replies\' is clicked', () => {
        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const viewMore: DebugElement = replySection.query(By.css('a.view-more-replies'));

        youtubeLogic.getReplies.calls.reset();
        viewMore.triggerEventHandler('click', null);

        expect(youtubeLogic.getReplies).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getReplies).toHaveBeenCalledWith(thread.snippet.topLevelComment.id, 10, replies.nextPageToken);
    });

    it('Should show \'Hide Replies\' when canHideReplies = true', () => {
        const component = fixture.debugElement.query(By.css('comment-thread')).componentInstance;
        component.canHideReplies = true;

        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const hideReplies: DebugElement = replySection.query(By.css('a.hide-replies'));

        expect(hideReplies.name).toEqual('a');
        expect(hideReplies.query(By.css('div')).nativeElement.textContent).toEqual('Hide Replies');
    });

    it('Should hide all but the most recent replies when \'Hide Replies\' is clicked', () => {
        const component = fixture.debugElement.query(By.css('comment-thread')).componentInstance;
        component.canHideReplies = true;

        fixture.detectChanges();
        const commentThread: DebugElement = fixture.debugElement.query(By.css('comment-thread'));
        const replySection: DebugElement = commentThread.query(By.css('div.replies'));
        const viewMore: DebugElement = replySection.query(By.css('a.view-more-replies'));
        const hideReplies: DebugElement = replySection.query(By.css('a.hide-replies'));

        youtubeLogic.getReplies.calls.reset();
        hideReplies.triggerEventHandler('click', null);

        expect(youtubeLogic.getReplies).toHaveBeenCalledTimes(1);
        expect(youtubeLogic.getReplies).toHaveBeenCalledWith(thread.snippet.topLevelComment.id, 2);
        expect(viewMore.name).toEqual('a');
    });
});
