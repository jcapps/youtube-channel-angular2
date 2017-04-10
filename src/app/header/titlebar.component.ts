import { Component, OnInit } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'titlebar',
    templateUrl: './titlebar.component.html'
})
export class TitlebarComponent implements OnInit {
    public profilePicUrl: string;
    public headerTitle: string = 'James Capps\' YouTube Channel';

    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.youtubeLogic.getChannelInfo().subscribe(channel => {
            this.profilePicUrl = channel.items[0].snippet.thumbnails.default.url;
        });
    }
}
