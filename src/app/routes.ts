import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AllPlaylistsComponent } from './playlist/all-playlists.component';
import { AllVideosComponent } from './video/all-videos.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoWatchPageComponent } from './video/video-watch-page.component';
import { SearchResultsComponent } from './search/search-results.component';

export const routes: Routes = [
    { path: 'playlists', component: AllPlaylistsComponent },
    { path: 'playlist/:id', component: PlaylistComponent },
    { path: 'videos', component: AllVideosComponent },
    { path: 'watch/:id', component: VideoWatchPageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search/:q', component: SearchResultsComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
