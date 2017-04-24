import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchbarComponent } from '../../../app/header/searchbar.component';

describe('SearchbarComponent', () => {
    let fixture: ComponentFixture<SearchbarComponent>;
    let component: SearchbarComponent;

    const mockRouter = {
        navigateByUrl(): void {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchbarComponent ],
            imports: [ FormsModule ]
        }).overrideComponent(SearchbarComponent, {
            set: {
                providers: [
                    { provide: Router, useValue: mockRouter }
                ]
            }
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SearchbarComponent);
        component = fixture.componentInstance;
    });

    it('Should load SearchbarComponent', () => {
        expect(component instanceof SearchbarComponent).toBe(true);
    });

    it('Should create a search form', () => {
        const form: DebugElement = fixture.debugElement.query(By.css('form'));
        expect(form.name).toBe('form');
    });

    it('Should create a search image', () => {
        const image: DebugElement = fixture.debugElement.query(By.css('img'));

        expect(image.name).toBe('img');
        expect(image.nativeElement.alt).toBe('Search');
    });

    it('Should create a search field', () => {
        const textInput: DebugElement = fixture.debugElement.query(By.css('input'));

        expect(textInput.name).toBe('input');
        expect(textInput.nativeElement.name).toBe('search');
        expect(textInput.nativeElement.value).toBe('');
        expect(textInput.nativeElement.placeholder).toBe('Search channel...');
    });

    it('Should toggle input width on image click', () => {
        const image: DebugElement = fixture.debugElement.query(By.css('img'));
        const textInput: DebugElement = fixture.debugElement.query(By.css('input'));
        const inputAttrs = textInput.nativeElement.attributes;

        expect(inputAttrs.getNamedItem('style').value).toBe('width: 0px;');

        image.triggerEventHandler('click', null);
        expect(inputAttrs.getNamedItem('style').value).toBe('width: 200px;');

        image.triggerEventHandler('click', null);
        expect(inputAttrs.getNamedItem('style').value).toBe('width: 0px;');
    });

    it('Should route to search results page onSubmit', () => {
        const router = fixture.debugElement.injector.get(Router);
        spyOn(router, 'navigateByUrl').and.returnValue('Routed!');

        const form: DebugElement = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);

        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });
});
