import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VideoThumbnailComponent } from '../../../app/playlist/video-thumbnail.component';

describe('VideoThumbnailComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const video = {
        snippet: {
                title: 'Video Title',
                channelTitle: 'Channel Title',
                description: 'Video Description',
                thumbnails: {
                    medium: {
                        url: testUrl
    }}}};
    const position = 0;
    let fixture: ComponentFixture<VideoThumbnailComponent>;
    let component: VideoThumbnailComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VideoThumbnailComponent ]
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(VideoThumbnailComponent);
        component = fixture.componentInstance;
        component.video = video;
        component.position = position;
    });

    it('Should load VideoThumbnailComponent', () => {
        expect(component instanceof VideoThumbnailComponent).toBe(true);
    });

    it('Should create an image thumbnail', () => {
        fixture.detectChanges();
        const image: DebugElement = fixture.debugElement.query(By.css('img'));
        const imageElement: HTMLElement = image.nativeElement;

        expect(image.name).toBe('img');
        expect(imageElement.getAttribute('height')).toBe('67.5');
        expect(imageElement.getAttribute('width')).toBe('120');
        expect(imageElement.getAttribute('src')).toBe(video.snippet.thumbnails.medium.url);
        expect(imageElement.getAttribute('title')).toBe(video.snippet.title);
        expect(imageElement.getAttribute('alt')).toBe(video.snippet.title);
    });

    it('Should create thumbnail info', () => {
        fixture.detectChanges();
        const videoTitle: DebugElement = fixture.debugElement.query(By.css('h3'));
        const channelName: DebugElement = fixture.debugElement.query(By.css('p'));

        expect(videoTitle.name).toEqual('h3');
        expect(channelName.name).toEqual('p');
        expect(videoTitle.nativeElement.textContent).toEqual(+position + 1 + '. ' + video.snippet.title);
        expect(channelName.nativeElement.textContent).toEqual(video.snippet.channelTitle);
    });
});
