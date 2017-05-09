import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VideoPlayerComponent } from '../../../app/shared/video-player.component';

describe('VideoPlayerComponent', () => {
    const video = {
        id: 'q60pO0nOLn8',
        snippet: {
            title: 'Title | Test Video',
            description: 'Test Description\nCreated by: Me\nAssembled by: Me'
        }
    };
    let fixture: ComponentFixture<VideoPlayerComponent>;
    let component: VideoPlayerComponent;

    @Component({
        selector: 'video-player-description',
        template: `<div></div>`
    })
    class DummyDescriptionComponent {
        @Input() public video: any;
    }

    @Component({
        selector: 'video-player-stats',
        template: `<div></div>`
    })
    class DummyStatsComponent {
        @Input() public video: any;
    }

    @Component({
        selector: 'video-player-comments',
        template: `<div></div>`
    })
    class DummyCommentsComponent {
        @Input() public video: any;
        @Output() public videoSeekEmitter: EventEmitter<string> = new EventEmitter<string>();
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VideoPlayerComponent,
                DummyDescriptionComponent,
                DummyStatsComponent,
                DummyCommentsComponent
            ]
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(VideoPlayerComponent);
        component = fixture.componentInstance;
        component.video = video;
    });

    it('Should load VideoPlayerComponent', () => {
        expect(component instanceof VideoPlayerComponent).toBe(true);
    });

    it('Should create a \'player-iframe\' div', () => {
        fixture.detectChanges();
        const iframe: DebugElement = fixture.debugElement.query(By.css('#player-iframe'));

        expect(iframe.name).toEqual('div');
    });

    it('Should create a video-player-description element', () => {
        fixture.detectChanges();
        const description: DebugElement = fixture.debugElement.query(By.css('video-player-description'));
        const descriptionInstance = description.componentInstance;

        expect(description.name).toEqual('video-player-description');
        expect(descriptionInstance.video).toBe(video);
    });

    it('Should create a video-player-description element', () => {
        fixture.detectChanges();
        const stats: DebugElement = fixture.debugElement.query(By.css('video-player-stats'));
        const statsInstance = stats.componentInstance;

        expect(stats.name).toEqual('video-player-stats');
        expect(statsInstance.video).toBe(video);
    });

    it('Should create a video-player-comments element', () => {
        fixture.detectChanges();
        const comments: DebugElement = fixture.debugElement.query(By.css('video-player-comments'));
        const commentsInstance = comments.componentInstance;

        expect(comments.name).toEqual('video-player-comments');
        expect(commentsInstance.video).toBe(video);
    });
});
