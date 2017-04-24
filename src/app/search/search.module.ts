import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaylistModule } from '../playlist/playlist.module';
import { VideoModule } from '../video/video.module';

import { SearchResultsComponent } from './search-results.component';

@NgModule({
    declarations: [ SearchResultsComponent ],
    imports: [
        CommonModule,
        RouterModule,
        PlaylistModule,
        VideoModule
    ],
    exports: [ CommonModule ]
})

export class SearchModule {}
