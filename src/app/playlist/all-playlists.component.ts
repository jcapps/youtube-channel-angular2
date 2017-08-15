import { Component, OnInit } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    templateUrl: './all-playlists.component.html'
})
export class AllPlaylistsComponent implements OnInit {
    public nextPageToken: string = null;
    public pageTitle: string = 'Playlists';
    public playlists: Array<Object> = null;
    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        document.title = this.pageTitle;
        this.youtubeLogic.getAllPlaylists().subscribe((playlists: any) => {
            this.playlists = playlists.items;
            this.nextPageToken = playlists.nextPageToken;
        });
    }

    loadMorePlaylists(): void {
        this.youtubeLogic.getAllPlaylists(this.nextPageToken).subscribe((nextPlaylists: any) => {
            this.playlists = this.playlists.concat(nextPlaylists.items);
            this.nextPageToken = nextPlaylists.nextPageToken;
        });
    }
}
