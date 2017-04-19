import { AfterViewInit, Component, Input, OnInit, OnChanges } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'video-player-stats',
    templateUrl: './video-player-stats.component.html'
})

export class VideoPlayerStatsComponent implements AfterViewInit, OnInit, OnChanges {
    @Input() private videoId: string;
    public stats: any;
    private observer: MutationObserver;
    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.getStatistics();
    }

    ngAfterViewInit(): void {
        this.prepareStatistics();
    }

    ngOnChanges(): void {
        this.getStatistics();
    }

    getStatistics(): void {
        this.youtubeLogic.getVideoStats(this.videoId).subscribe(statistics => {
            this.stats = statistics;
            this.setLikeBarWidths();
        });
    }

    prepareStatistics(): void {
        // Necessary for when Playlist changes video
        // (because page does not refresh, and ngOnChanges is not called)
        this.observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && this.stats) {
                    this.setLikeBarWidths();
                }
            });
        });
        const rootElement = document.getElementById('video-statistics');
        const mutationConfig = { childList: true };
        this.observer.observe(rootElement, mutationConfig);
    }

    setLikeBarWidths(): void {
        setTimeout(() => {
            const likeBar = document.getElementById('like-bar');
            const dislikeBar = document.getElementById('dislike-bar');

            if (likeBar && dislikeBar) {
                likeBar.removeAttribute('class');
                dislikeBar.removeAttribute('class');
                likeBar.removeAttribute('style');
                dislikeBar.removeAttribute('style');

                setTimeout(() => {
                    const totalCount = parseInt(this.stats.likeCount, 10) + parseInt(this.stats.dislikeCount, 10);
                    const likePercentage = 100 * (this.stats.likeCount / totalCount);
                    const dislikePercentage = 100 - likePercentage;

                    likeBar.setAttribute('style', 'width: ' + likePercentage + '%;');
                    dislikeBar.setAttribute('style', 'width: ' + dislikePercentage + '%;');
                    likeBar.setAttribute('class', 'displayed');
                    dislikeBar.setAttribute('class', 'displayed');
                }, 10);
            }
        }, 10);
    }

    formatNumberString(number: string): string {
        return parseInt(number, 10).toLocaleString();
    }
}
