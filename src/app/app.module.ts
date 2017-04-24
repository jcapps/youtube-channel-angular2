import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AboutModule } from './about/about.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { VideoModule } from './video/video.module';

import { AppComponent }  from './app.component';
import { YouTubeApi } from '../api/youtube.api';
import { RecentUploadsLogic } from '../logic/recent-uploads.logic';
import { YouTubeLogic } from '../logic/youtube.logic';
import { routes } from './routes';

@NgModule({
  imports: [
    AboutModule,
    BrowserModule,
    HeaderModule,
    HomeModule,
    HttpModule,
    PlaylistModule,
    RouterModule.forRoot(routes),
    SearchModule,
    SharedModule,
    VideoModule
  ],
  declarations: [ AppComponent ],
  providers: [
    RecentUploadsLogic,
    YouTubeApi,
    YouTubeLogic
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
