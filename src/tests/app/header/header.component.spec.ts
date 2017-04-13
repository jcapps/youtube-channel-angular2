import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from '../../../app/header/header.component';
import { HeaderModule } from '../../../app/header/header.module';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;

    @Injectable()
    class MockYouTubeLogic {}

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HeaderModule ]
        }).overrideComponent(HeaderComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
    });

    it('Should load HeaderComponent', () => {
        expect(component instanceof HeaderComponent).toBe(true);
    });

    it('Should create the TitleBar', () => {
        const titlebar: DebugElement = fixture.debugElement.query(By.css('titlebar'));
        expect(titlebar.name).toEqual('titlebar');
    });

    it('Should create the SubscribeButton', () => {
        const subscribeButton: DebugElement = fixture.debugElement.query(By.css('subscribe-button'));
        expect(subscribeButton.name).toEqual('subscribe-button');
    });

    it('Should create the NavBar', () => {
        const navbar: DebugElement = fixture.debugElement.query(By.css('navbar'));
        expect(navbar.name).toEqual('navbar');
    });
});
