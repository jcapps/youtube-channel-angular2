import { Component, OnInit } from '@angular/core';
import { YouTubeLogic } from '../../logic/youtube.logic';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    public pageTitle: string = `Acme Product Management`;
    public allPlaylists: Array<Object>;

    constructor(private youtubeLogic: YouTubeLogic) {}

    ngOnInit(): void {
        this.youtubeLogic.getAllPlaylists().subscribe(playlists => {
            this.allPlaylists = playlists.items.slice(0, 5);
        });
    }

    showSubmenu(e: any): void {
        let element = e.target;
        while (!element.classList.contains('has-submenu')) {
            element = element.parentNode;
        }
        element.children[1].classList.remove('hidden');
    }

    hideSubmenu(e: any): void {
        let element = e.target;
        while (!element.classList.contains('has-submenu')) {
            element = element.parentNode;
        }
        element.children[1].classList.add('hidden');
    }
}
