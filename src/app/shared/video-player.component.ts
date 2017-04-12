import { Component, EventEmitter, OnInit,
        OnChanges, SimpleChanges,
        Input, Output, NgZone } from '@angular/core';
const YouTubePlayer = require('youtube-player');

let player: any;

@Component({
    selector: 'video-player',
    templateUrl: './video-player.component.html'
})

export class VideoPlayerComponent implements OnInit, OnChanges {
    private isInitialized: boolean = false;
    @Input() public video: any;
    @Input() private playlistId: string;
    @Input() private playlistIndex: number;
    @Output() private updatePlaylist: EventEmitter<number> = new EventEmitter<number>();

    constructor(private ngZone: NgZone) {}

    ngOnInit(): void {
        this.initializePlayer();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isInitialized && this.playlistIndex > -1) {
            if (changes.playlistId) {
                this.initializePlayer();
            } else if (changes.playlistIndex) {
                player.playVideoAt(this.playlistIndex);
            }
        }
    }

    initializePlayer(): void {
        let params: any = {
            height: '360',
            width: '640',
            videoId: this.video.id
        };

        if (this.playlistId) {
            params = {
                height: '360',
                width: '640',
                playerVars: {
                    listType: 'playlist',
                    list: this.playlistId
                }
            };
        }

        if (player) { player.destroy(); }
        player = YouTubePlayer('player-iframe', params);
        player.on('stateChange', (e: any) => {
            let newIndex = e.target.getPlaylistIndex(); // -1 if not a playlist
            if (newIndex > -1 && newIndex !== this.playlistIndex) {
                this.ngZone.run(() => {
                    this.updatePlaylist.emit(newIndex);
                });
            }
        });
        this.isInitialized = true;
    }
}
