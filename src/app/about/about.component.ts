import { Component, OnInit } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
    public description: Array<string>;
    public profilePicUrl: string;
    public pageTitle: string = 'About My Channel';
    constructor(private youtubeApi: YouTubeApi) {}

    ngOnInit(): void {
        this.youtubeApi.getChannelInfo()
            .subscribe(channel => {
                this.description = channel.items[0].snippet.description.split('\n');
                this.profilePicUrl = channel.items[0].snippet.thumbnails.medium.url;
            });
    }
}
