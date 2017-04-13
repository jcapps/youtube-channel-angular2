import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from '../../app/app.component';

@Component({
    selector: 'app-header',
    template: '<div></div>'
})
export class StubHeaderComponent {}

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ AppComponent, StubHeaderComponent ]
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('Should load AppComponent', () => {
        expect(component instanceof AppComponent).toBe(true);
    });

    it('Should create an \'app-header\' tag', () => {
        let appHeader: DebugElement = fixture.debugElement.query(By.css('app-header'));
        expect(appHeader.name).toBe('app-header');
    });

    it('Should create a \'router-outlet\' tag contained in a \'div#content\' tag', () => {
        let divContent: DebugElement = fixture.debugElement.query(By.css('div#content'));
        expect(divContent.name).toBe('div');
        let routerOutlet: DebugElement = divContent.children[0];
        expect(routerOutlet.name).toBe('router-outlet');
    });
});
