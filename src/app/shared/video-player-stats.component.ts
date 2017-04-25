import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'video-player-stats',
    templateUrl: './video-player-stats.component.html'
})

export class VideoPlayerStatsComponent implements AfterViewInit, OnChanges {
    @Input() public video: any;

    ngAfterViewInit(): void {
        this.setLikeBarWidths();
    }

    ngOnChanges(): void {
        this.setLikeBarWidths();
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
                    const totalCount = parseInt(this.video.statistics.likeCount, 10) + parseInt(this.video.statistics.dislikeCount, 10);
                    const likePercentage = 100 * (this.video.statistics.likeCount / totalCount);
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
