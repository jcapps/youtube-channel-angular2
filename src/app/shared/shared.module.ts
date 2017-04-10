import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoPlayerComponent } from './video-player.component';
import { VideoPlayerDescriptionComponent } from './video-player-description.component';

@NgModule({
    declarations: [
        VideoPlayerComponent,
        VideoPlayerDescriptionComponent
    ],
    imports: [ CommonModule ],
    exports: [
        CommonModule,
        VideoPlayerComponent,
        VideoPlayerDescriptionComponent
    ]
})

export class SharedModule {}
