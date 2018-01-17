
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../_services/search.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    stringSearch: string;


    constructor(private searchService: SearchService,private router:Router) {

    }


    updateString(): void {
        /*Modifica el valor de strignSearch del servicio*/
        this.searchService.setStringSearch(this.stringSearch)
        /*Enruta  al componente shop*/
        this.router.navigate(['shop'])

    }

    ngOnInit() {


    }

}
