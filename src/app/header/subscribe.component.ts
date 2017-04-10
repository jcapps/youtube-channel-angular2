import { Component } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'subscribe-button',
    templateUrl: './subscribe.component.html'
})
export class SubscribeComponent {
    constructor(private youtubeLogic: YouTubeLogic) {}

    subscribe(): void {
        this.youtubeLogic.subscribeToChannel().subscribe(() => {
            return;
        });
    }
}
