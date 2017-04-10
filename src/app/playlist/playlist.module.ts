import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AllPlaylistsComponent } from './all-playlists.component';
import { PlaylistComponent } from './playlist.component';
import { PlaylistResultComponent } from './playlist-result.component';
import { VideoThumbnailComponent } from './video-thumbnail.component';

@NgModule({
    declarations: [
        AllPlaylistsComponent,
        PlaylistComponent,
        PlaylistResultComponent,
        VideoThumbnailComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [ CommonModule ]
})

export class PlaylistModule {}
