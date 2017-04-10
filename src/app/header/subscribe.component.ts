import { Component } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    selector: 'subscribe-button',
    templateUrl: './subscribe.component.html'
})
export class SubscribeComponent {
    constructor(private youtubeApi: YouTubeApi) {}

    subscribe(): void {
        this.youtubeApi.subscribe()
            .subscribe(() => {
                console.log('finished');
            });
    }
}
