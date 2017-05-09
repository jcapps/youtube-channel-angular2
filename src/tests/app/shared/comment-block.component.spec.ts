import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CommentBlockComponent } from '../../../app/shared/comment-block.component';

describe('CommentBlockComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/s28/photo.jpg';
    const channelUrl = 'https://www.youtube.com/channel/1234567890';
    const videoId = 'q60pO0nOLn8';
    let comment = {
        snippet: {
            authorDisplayName: 'NAME',
            authorChannelUrl: channelUrl,
            authorProfileImageUrl: testUrl,
            likeCount: 3,
            textDisplay: 'Test Comment',
            updatedAt: '2017-01-01T10:00:00.000Z'
        }
    };

    @Component({
        template: `<comment-block
                       [comment]="mockComment"
                       [videoId]="mockId"
                       (videoSeekEmitter)="mockVideoSeek($event)">
                   </comment-block>`
    })
    class WrapperComponent {
        mockComment = comment;
        mockId = videoId;
        mockVideoSeek = Function();
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WrapperComponent, CommentBlockComponent ]
        });
    }));

    it('Should load CommentBlockComponent', () => {
        const fixture: ComponentFixture<CommentBlockComponent>
            = TestBed.createComponent(CommentBlockComponent);
        const component: CommentBlockComponent = fixture.componentInstance;

        expect(component instanceof CommentBlockComponent).toBe(true);
    });

    it('Should create a comment div', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentDiv: DebugElement = fixture.debugElement.query(By.css('div.comment'));

        expect(commentDiv.name).toEqual('div');
    });

    it('Should create user image', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentDiv: DebugElement = fixture.debugElement.query(By.css('div.comment'));
        const userImageLink: DebugElement = commentDiv.children[0];
        const userImage: DebugElement = userImageLink.query(By.css('img'));

        expect(userImageLink.name).toEqual('a');
        expect(userImage.name).toEqual('img');
        expect(userImageLink.nativeElement.getAttribute('href')).toEqual(comment.snippet.authorChannelUrl);
        expect(userImageLink.nativeElement.getAttribute('target')).toEqual('_blank');
        expect(userImage.nativeElement.getAttribute('src')).toEqual('https://yt3.ggpht.com/s60/photo.jpg');
        expect(userImage.nativeElement.getAttribute('alt')).toEqual('Profile Image');
    });

    it('Should create comment details', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));

        expect(commentInfo.name).toEqual('div');
    });

    it('Should create channel name', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const userChannel: DebugElement = commentInfo.query(By.css('a.user-channel'));
        const userName: DebugElement = userChannel.query(By.css('div'));

        expect(userChannel.name).toEqual('a');
        expect(userName.name).toEqual('div');
        expect(userChannel.nativeElement.getAttribute('href')).toEqual(comment.snippet.authorChannelUrl);
        expect(userChannel.nativeElement.getAttribute('target')).toEqual('_blank');
        expect(userName.nativeElement.textContent).toEqual(comment.snippet.authorDisplayName);
    });

    it('Should create time elapsed since comment was updated', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const timeElapsed: DebugElement = commentInfo.query(By.css('div.time-elapsed'));

        expect(timeElapsed.name).toEqual('div');
    });

    it('Should create comment text', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const commentText: DebugElement = commentInfo.query(By.css('div.comment-text'));

        expect(commentText.name).toEqual('div');
        expect(commentText.nativeElement.textContent).toEqual(comment.snippet.textDisplay);
    });

    it('Should create new timestamp link if comment contains a timestamp', () => {
        comment.snippet.textDisplay = 'Test <a href="http://www.youtube.com/watch?v=' + videoId + '&amp;t=1m30s">1:30</a> Text';

        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const commentText: DebugElement = commentInfo.query(By.css('div.comment-text'));
        const timestamp: DebugElement = commentText.query(By.css('a'));

        expect(timestamp.name).toEqual('a');
        expect(commentText.name).toEqual('div');
        expect(commentText.nativeElement.innerText).toEqual('Test 1:30 Text');

        comment.snippet.textDisplay = 'Test Comment';
    });

    it('Should call videoSeek if timestamp is clicked', () => {
        comment.snippet.textDisplay = 'Test <a href="http://www.youtube.com/watch?v=' + videoId + '&amp;t=1m30s">1:30</a> Text';
        spyOn(CommentBlockComponent.prototype, 'clickTimeStamp');

        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const commentText: DebugElement = commentInfo.query(By.css('div.comment-text'));
        const timestamp: DebugElement = commentText.query(By.css('a'));

        timestamp.triggerEventHandler('click', {target: {value: '1m30s'}});

        expect(CommentBlockComponent.prototype.clickTimeStamp).toHaveBeenCalledTimes(1);
        expect(CommentBlockComponent.prototype.clickTimeStamp).toHaveBeenCalledWith('1m30s');

        comment.snippet.textDisplay = 'Test Comment';
    });

    it('Should not have ability to expand comment when comment is small', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const readMore: DebugElement = commentInfo.query(By.css('a.read-more'));

        expect(readMore.name).toEqual('a');
        expect(readMore.nativeElement.classList.contains('hidden')).toEqual(true);
    });

    it('Should create comment likes if likeCount > 0', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const commentLikeLabel = commentInfo.query(By.css('span.like-label'));
        const commentLikes = commentInfo.query(By.css('span.like-count'));

        expect(commentLikeLabel.name).toEqual('span');
        expect(commentLikes.name).toEqual('span');
        expect(commentLikeLabel.nativeElement.textContent).toEqual('Likes: ');
        expect(commentLikes.nativeElement.textContent).toEqual('3');
    });

    it('Should not create comment likes if likeCount = 0', () => {
        comment.snippet.likeCount = 0;

        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const commentInfo: DebugElement = fixture.debugElement.query(By.css('div.comment-info'));
        const commentLikeLabel = commentInfo.query(By.css('span.like-label'));
        const commentLikes = commentInfo.query(By.css('span.like-count'));

        expect(commentLikeLabel).toBeNull();
        expect(commentLikes).toBeNull();
    });
});
