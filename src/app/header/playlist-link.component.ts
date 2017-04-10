import { Component, Input } from '@angular/core';

@Component({
    selector: 'playlist-link',
    templateUrl: './playlist-link.component.html'
})
export class PlaylistLinkComponent {
    @Input() public playlist: Object;
}
