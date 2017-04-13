import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SubscribeComponent } from '../../../app/header/subscribe.component';
import { YouTubeLogic } from '../../../logic/youtube.logic';

describe('SubscribeComponent', () => {
    let fixture: ComponentFixture<SubscribeComponent>;
    let component: SubscribeComponent;
    let youtubeLogic: any;

    @Injectable()
    class MockYouTubeLogic {
        public subscribeToChannel(): Observable<any> {
            return Observable.of(true);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SubscribeComponent ]
        }).overrideComponent(SubscribeComponent, {
            set: {
                providers: [
                    { provide: YouTubeLogic, useClass: MockYouTubeLogic }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SubscribeComponent);
        component = fixture.componentInstance;

        youtubeLogic = fixture.debugElement.injector.get(YouTubeLogic);
        spyOn(youtubeLogic, 'subscribeToChannel').and.returnValue(Observable.of(true));
    });

    it('Should load SubscribeComponent', () => {
        expect(component instanceof SubscribeComponent).toBe(true);
    });

    it('Should create a \'Subscribe\' button', () => {
        const button: DebugElement = fixture.debugElement.query(By.css('button'));
        const buttonElement: HTMLElement = button.nativeElement;

        expect(button.name).toBe('button');
        expect(buttonElement.textContent).toBe('Subscribe');
    });

    it('Should call subscribe method when clicked', () => {
        const button: DebugElement = fixture.debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);

        expect(youtubeLogic.subscribeToChannel).toHaveBeenCalledTimes(1);
    });
});
