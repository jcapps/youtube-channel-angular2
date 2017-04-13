import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlaylistLinkComponent } from '../../../app/header/playlist-link.component';

describe('PlaylistLinkComponent', () => {
    let fixture: ComponentFixture<PlaylistLinkComponent>;
    let component: PlaylistLinkComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ PlaylistLinkComponent ]
        });

        fixture = TestBed.createComponent(PlaylistLinkComponent);
        component = fixture.componentInstance;
    });

    it('Should load PlaylistLinkComponent', () => {
        expect(component instanceof PlaylistLinkComponent).toBe(true);
    });
});
