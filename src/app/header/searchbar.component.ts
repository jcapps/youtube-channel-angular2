import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'searchbar',
    templateUrl: './searchbar.component.html'
})
export class SearchbarComponent {
    public searchImgUrl = require('../../images/search.png');
    constructor(private router: Router) {}

    onSubmit(form: NgForm): void {
        const query = form.value.search;
        this.router.navigateByUrl('/search/' + query);
    }

    toggleSearchBar(): void {
        const searchBar = document.getElementById('search');
        if (searchBar.style.width === '200px') {
            searchBar.style.width = '0';
        } else {
            searchBar.style.width = '200px';
            searchBar.focus();
        }
    }
}
