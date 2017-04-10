import { Component, Input } from '@angular/core';

@Component({
    selector: 'video-thumbnail',
    templateUrl: './video-thumbnail.component.html'
})
export class VideoThumbnailComponent {
    @Input() public position: number;
    @Input() public video: Object;
}
