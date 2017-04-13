import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { NavbarComponent } from '../../../app/header/navbar.component';
import { PlaylistLinkComponent } from '../../../app/header/playlist-link.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('NavbarComponent', () => {
    const allPlaylists = {
        items: [
            {id: '1', snippet: {title: 'Title 1'}},
            {id: '2', snippet: {title: 'Title 2'}},
            {id: '3', snippet: {title: 'Title 3'}},
            {id: '4', snippet: {title: 'Title 4'}},
            {id: '5', snippet: {title: 'Title 5'}},
            {id: '6', snippet: {title: 'Title 6'}},
            {id: '7', snippet: {title: 'Title 7'}},
            {id: '8', snippet: {title: 'Title 8'}},
            {id: '9', snippet: {title: 'Title 9'}}
        ]
    };
    let fixture: ComponentFixture<NavbarComponent>;
    let component: NavbarComponent;
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
            declarations: [ NavbarComponent, PlaylistLinkComponent ]
        }).overrideComponent(NavbarComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'getAllPlaylists').and.returnValue(Observable.of(allPlaylists));
    });

    it('Should load NavbarComponent', () => {
        expect(component instanceof NavbarComponent).toBe(true);
    });

    it('Should getAllPlaylists on init', () => {
        fixture.detectChanges();
        expect(youtubeLogic.getAllPlaylists).toHaveBeenCalledTimes(1);
    });

    it('Should create \'Home\' link', () => {
        fixture.detectChanges();
        const menu: DebugElement = fixture.debugElement.queryAll(By.css('ul'))[0];
        const menuItems: Array<DebugElement> = menu.children;

        expect(menuItems[0].nativeElement.textContent).toBe('Home');
        expect(menuItems[0].children[0].nativeElement.getAttribute('href')).toBe('/');
    });

    it('Should create \'Playlists\' link', () => {
        fixture.detectChanges();
        const menu: DebugElement = fixture.debugElement.queryAll(By.css('ul'))[0];
        const menuItems: Array<DebugElement> = menu.children;

        expect(menuItems[1].children[0].nativeElement.textContent).toBe('Playlists');
        expect(menuItems[1].children[0].nativeElement.getAttribute('href')).toBe('/playlists');
    });

    it('Should create \'Videos\' link', () => {
        fixture.detectChanges();
        const menu: DebugElement = fixture.debugElement.queryAll(By.css('ul'))[0];
        const menuItems: Array<DebugElement> = menu.children;

        expect(menuItems[2].nativeElement.textContent).toBe('Videos');
        expect(menuItems[2].children[0].nativeElement.getAttribute('href')).toBe('/videos');
    });

    it('Should create \'About\' link', () => {
        fixture.detectChanges();
        const menu: DebugElement = fixture.debugElement.queryAll(By.css('ul'))[0];
        const menuItems: Array<DebugElement> = menu.children;

        expect(menuItems[3].nativeElement.textContent).toBe('About');
        expect(menuItems[3].children[0].nativeElement.getAttribute('href')).toBe('/about');
    });

    it('Should create Playlist submenu of first 5 playlists', () => {
        fixture.detectChanges();
        const playlistMenu: DebugElement = fixture.debugElement.query(By.css('li.has-submenu'));
        const submenu: DebugElement = playlistMenu.query(By.css('ul'));
        const submenuItems: Array<DebugElement> = submenu.children;

        expect(submenuItems.length).toEqual(6);
        expect(submenuItems[0].query(By.css('div')).nativeElement.textContent).toEqual('Title 1');
        expect(submenuItems[1].query(By.css('div')).nativeElement.textContent).toEqual('Title 2');
        expect(submenuItems[2].query(By.css('div')).nativeElement.textContent).toEqual('Title 3');
        expect(submenuItems[3].query(By.css('div')).nativeElement.textContent).toEqual('Title 4');
        expect(submenuItems[4].query(By.css('div')).nativeElement.textContent).toEqual('Title 5');

        expect(submenuItems[0].query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/playlist/1');
        expect(submenuItems[1].query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/playlist/2');
        expect(submenuItems[2].query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/playlist/3');
        expect(submenuItems[3].query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/playlist/4');
        expect(submenuItems[4].query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/playlist/5');
    });

    it('Should create \'View All\' link in Playlist submenu', () => {
        fixture.detectChanges();
        const playlistMenu: DebugElement = fixture.debugElement.query(By.css('li.has-submenu'));
        const submenu: DebugElement = playlistMenu.query(By.css('ul'));
        const submenuItems: Array<DebugElement> = submenu.children;

        expect(submenuItems[5].query(By.css('div')).nativeElement.textContent).toEqual('View All');
        expect(submenuItems[5].query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/playlists');
    });

    it('Should initially hide submenu', () => {
        fixture.detectChanges();
        const playlistMenu: DebugElement = fixture.debugElement.query(By.css('li.has-submenu'));
        const submenu: DebugElement = playlistMenu.query(By.css('ul'));

        expect(submenu.nativeElement.classList.contains('hidden')).toBeTruthy();
    });

    it('Should show submenu on mouseOver', () => {
        fixture.detectChanges();
        const playlistMenu: DebugElement = fixture.debugElement.query(By.css('li.has-submenu'));
        const submenu: DebugElement = playlistMenu.query(By.css('ul'));

        playlistMenu.triggerEventHandler('mouseover', { target: playlistMenu.nativeElement });
        expect(submenu.nativeElement.classList.contains('hidden')).toBeFalsy();
    });

    it('Should hide submenu on mouseOut', () => {
        fixture.detectChanges();
        const playlistMenu: DebugElement = fixture.debugElement.query(By.css('li.has-submenu'));
        const submenu: DebugElement = playlistMenu.query(By.css('ul'));

        playlistMenu.triggerEventHandler('mouseout', { target: playlistMenu.nativeElement });
        expect(submenu.nativeElement.classList.contains('hidden')).toBeTruthy();
    });
});
