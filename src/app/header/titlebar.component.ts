import { Component, OnInit } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    selector: 'titlebar',
    templateUrl: './titlebar.component.html'
})
export class TitlebarComponent implements OnInit {
    public profilePicUrl: string;
    public headerTitle: string = 'James Capps\' YouTube Channel';

    constructor(private youtubeApi: YouTubeApi) {}

    ngOnInit(): void {
        this.youtubeApi.getChannelInfo()
            .subscribe(channel => {
                this.profilePicUrl = channel.items[0].snippet.thumbnails.default.url;
            });
    }
}
