import { Component, Input } from '@angular/core';

@Component({
    selector: 'playlist-result',
    templateUrl: './playlist-result.component.html'
})
export class PlaylistResultComponent {
    @Input() public playlist: any;
}
