import { Component, OnInit } from '@angular/core';
import { RecentUploadsLogic } from '../../logic/recent-uploads.logic';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public pageTitle: string = 'Most Recent Upload';
    public video: Object;
    constructor(private recentUploadsLogic: RecentUploadsLogic) {}

    ngOnInit(): void {
        document.title = 'Home: ' + this.pageTitle;
        this.recentUploadsLogic.getMostRecentUpload().subscribe((video: any) => {
            this.video = video.items[0];
        });
    }
}
