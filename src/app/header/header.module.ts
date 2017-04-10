import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { TitlebarComponent } from './titlebar.component';
import { SubscribeComponent } from './subscribe.component';
import { NavbarComponent } from './navbar.component';
import { PlaylistLinkComponent } from './playlist-link.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TitlebarComponent,
        SubscribeComponent,
        NavbarComponent,
        PlaylistLinkComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        HeaderComponent
    ]
})

export class HeaderModule {}
