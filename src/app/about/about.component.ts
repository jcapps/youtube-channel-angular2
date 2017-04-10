import { Component, OnInit } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
    public description: Array<string>;
    public profilePicUrl: string;
    public pageTitle: string = 'About My Channel';
    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.youtubeLogic.getChannelInfo().subscribe(channel => {
            this.description = channel.items[0].snippet.description.split('\n');
            this.profilePicUrl = channel.items[0].snippet.thumbnails.medium.url;
        });
    }
}
