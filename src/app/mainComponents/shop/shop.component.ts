import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {

    filter: string;
    order: boolean;

    ngOnInit() {
        localStorage.setItem('currentComponent', 'shop');
    }

    constructor() {
    }

    // Funcion que se ejecuta cuando cambia el valor de filter en alguno de sus componentes hijos.
    updateFilter(event): void {
        this.filter = event;
    }

    updateOrder(event): void {
        this.order = event;

    }

}
