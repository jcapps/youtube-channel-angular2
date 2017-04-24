import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    templateUrl: './search-results.component.html'
})

export class SearchResultsComponent implements OnInit {
    public nextPageToken: string = null;
    public pageTitle: string = 'Search results for: ';
    public results: any;
    public resultsCount: number = 0;
    private query: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private youtubeLogic: YouTubeLogic
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                this.query = this.route.snapshot.params['q'];
                this.youtubeLogic.searchChannel(this.query).subscribe(result => {
                    this.results = result.items;
                    this.resultsCount = result.pageInfo.totalResults;
                    this.nextPageToken = result.nextPageToken;
                });
            }
        });
    }

    loadMoreResults(): void {
        this.youtubeLogic.searchChannel(this.query, this.nextPageToken).subscribe((result: any) => {
            this.results = this.results.concat(result.items);
            this.nextPageToken = result.nextPageToken;
        });
    }
}
