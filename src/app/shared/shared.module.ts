import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoPlayerComponent } from './video-player.component';
import { VideoPlayerDescriptionComponent } from './video-player-description.component';
import { VideoPlayerStatsComponent } from './video-player-stats.component';

@NgModule({
    declarations: [
        VideoPlayerComponent,
        VideoPlayerDescriptionComponent,
        VideoPlayerStatsComponent
    ],
    imports: [ CommonModule ],
    exports: [
        CommonModule,
        VideoPlayerComponent,
        VideoPlayerDescriptionComponent,
        VideoPlayerStatsComponent
    ]
})

export class SharedModule {}
