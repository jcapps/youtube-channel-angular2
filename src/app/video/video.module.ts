import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AllVideosComponent } from './all-videos.component';
import { VideoResultComponent } from './video-result.component';
import { VideoWatchPageComponent } from './video-watch-page.component';

@NgModule({
    declarations: [
        AllVideosComponent,
        VideoResultComponent,
        VideoWatchPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [ CommonModule ]
})

export class VideoModule {}
