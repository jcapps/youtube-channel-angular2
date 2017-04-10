import { Component, OnInit } from '@angular/core';
import { YouTubeApi } from '../../api/YouTubeApi';

@Component({
    templateUrl: './all-playlists.component.html'
})
export class AllPlaylistsComponent implements OnInit {
    public nextPageToken: string = null;
    public pageTitle: string = 'Playlists';
    public playlists: Array<Object> = null;
    constructor(private youtubeApi: YouTubeApi) {}

    ngOnInit(): void {
        this.youtubeApi.getAllPlaylists()
            .subscribe((playlists: any) => {
                this.playlists = playlists.items;
                this.nextPageToken = playlists.nextPageToken;
            });
    }

    loadMorePlaylists(): void {
        this.youtubeApi.getAllPlaylists(this.nextPageToken)
            .subscribe((nextPlaylists: any) => {
                this.playlists = this.playlists.concat(nextPlaylists.items);
                this.nextPageToken = nextPlaylists.nextPageToken;
            });
    }
}
