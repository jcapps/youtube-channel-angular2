import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoPlayerComponent } from './video-player.component';
import { VideoPlayerCommentsComponent } from './video-player-comments.component';
import { VideoPlayerDescriptionComponent } from './video-player-description.component';
import { VideoPlayerStatsComponent } from './video-player-stats.component';
import { CommentThreadComponent } from './comment-thread.component';
import { CommentBlockComponent } from './comment-block.component';

@NgModule({
    declarations: [
        VideoPlayerComponent,
        VideoPlayerCommentsComponent,
        VideoPlayerDescriptionComponent,
        VideoPlayerStatsComponent,
        CommentThreadComponent,
        CommentBlockComponent
    ],
    imports: [ CommonModule ],
    exports: [
        CommonModule,
        VideoPlayerComponent,
        VideoPlayerCommentsComponent,
        VideoPlayerDescriptionComponent,
        VideoPlayerStatsComponent,
        CommentThreadComponent,
        CommentBlockComponent
    ]
})

export class SharedModule {}
