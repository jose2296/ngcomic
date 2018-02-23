import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-cookie-alert',
    templateUrl: './cookie-alert.component.html',
    styleUrls: ['./cookie-alert.component.css']
})
export class CookieAlertComponent implements OnInit {

    accept: boolean;

    constructor() {
        this.accept = localStorage.getItem('cookie') == 'true';
    }

    ngOnInit() {
    }


    acceptCookies() {
        localStorage.setItem('cookie', 'true');
        this.accept = true;
    }

}
