import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PlaylistResultComponent } from '../../../app/playlist/playlist-result.component';

describe('PlaylistResultComponent', () => {
    const testUrl = 'https://yt3.ggpht.com/-cav15vB-sPU/AAAAAAAAAAI/AAAAAAAAAAA/ggnwAXGmHow/s88-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const playlist = {
        snippet: {
            description: 'Playlist Description',
            title: 'Playlist Title',
            thumbnails: {
                medium: {
                    url: testUrl
    }}}};
    let fixture: ComponentFixture<PlaylistResultComponent>;
    let component: PlaylistResultComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PlaylistResultComponent ]
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PlaylistResultComponent);
        component = fixture.componentInstance;
        component.playlist = playlist;
    });

    it('Should load PlaylistResultComponent', () => {
        expect(component instanceof PlaylistResultComponent).toBe(true);
    });

    it('Should create an image thumbnail', () => {
        fixture.detectChanges();
        const image: DebugElement = fixture.debugElement.query(By.css('img'));
        const imageElement: HTMLElement = image.nativeElement;

        expect(image.name).toBe('img');
        expect(imageElement.getAttribute('height')).toBe('90');
        expect(imageElement.getAttribute('width')).toBe('160');
        expect(imageElement.getAttribute('src')).toBe(playlist.snippet.thumbnails.medium.url);
        expect(imageElement.getAttribute('title')).toBe('Playlist Title');
        expect(imageElement.getAttribute('alt')).toBe('Playlist Title');
    });

    it('Should create a title for the result', () => {
        fixture.detectChanges();
        const title: DebugElement = fixture.debugElement.query(By.css('h3'));

        expect(title.nativeElement.textContent).toEqual('Playlist Title');
    });

    it('Should create a description for the result', () => {
        fixture.detectChanges();
        const description: DebugElement = fixture.debugElement.query(By.css('p'));

        expect(description.nativeElement.textContent).toEqual('Playlist Description');
    });
});
