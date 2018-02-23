import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    mainTittle: string;

    constructor() {
    }

    ngOnInit() {
        localStorage.setItem('filter', 'rate');
        localStorage.setItem('defaultPage', '1');
        localStorage.setItem('currentComponent', 'home');
        this.mainTittle = (this.getCookie('username') == '') ? 'NGCOMIC' : this.getCookie('username') + ' Welcome to NGCOMICS';
    }

    getCookie(cname) {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

}
