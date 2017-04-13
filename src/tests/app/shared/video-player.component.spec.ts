import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VideoPlayerComponent } from '../../../app/shared/video-player.component';
import { VideoPlayerDescriptionComponent } from '../../../app/shared/video-player-description.component';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VideoPlayerComponent, VideoPlayerDescriptionComponent ]
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
});
