import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VideoPlayerDescriptionComponent } from '../../../app/shared/video-player-description.component';

describe('VideoPlayerDescriptionComponent', () => {
    const video = {
        id: 'q60pO0nOLn8',
        snippet: {
            title: 'Title | Test Video',
            description: 'Test Description\nCreated by: Me\nAssembled by: Me'
        }
    };

    @Component({
        template: `<video-player-description [video]='mockVideo'></video-player-description>`
    })
    class WrapperComponent {
        mockVideo = video;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WrapperComponent, VideoPlayerDescriptionComponent ]
        });
    }));

    it('Should load VideoPlayerDescriptionComponent', () => {
        const fixture: ComponentFixture<VideoPlayerDescriptionComponent>
            = TestBed.createComponent(VideoPlayerDescriptionComponent);
        const component: VideoPlayerDescriptionComponent = fixture.componentInstance;

        expect(component instanceof VideoPlayerDescriptionComponent).toBe(true);
    });

    it('Should create a details div', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const detailsDiv: DebugElement = fixture.debugElement.query(By.css('div.video-details'));

        expect(detailsDiv.name).toEqual('div');
    });

    it('Should create title in details', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const detailsDiv: DebugElement = fixture.debugElement.query(By.css('div.video-details'));
        const title: DebugElement = detailsDiv.query(By.css('h3'));
        const subTitle: DebugElement = detailsDiv.query(By.css('h4'));

        expect(title.nativeElement.textContent).toEqual('Title');
        expect(subTitle.nativeElement.textContent).toEqual('Test Video');
    });

    it('Should create description in details', () => {
        const fixture: ComponentFixture<WrapperComponent>
            = TestBed.createComponent(WrapperComponent);

        fixture.detectChanges();
        const detailsDiv: DebugElement = fixture.debugElement.query(By.css('div.video-details'));
        const description: DebugElement = detailsDiv.query(By.css('p'));
        const descriptionParts: Array<DebugElement> = description.queryAll(By.css('span'));

        expect(descriptionParts.length).toEqual(3);
        expect(descriptionParts[0].nativeElement.textContent).toEqual('Test Description');
        expect(descriptionParts[1].nativeElement.textContent).toEqual('Created by: Me');
        expect(descriptionParts[2].nativeElement.textContent).toEqual('Assembled by: Me');
    });
});
