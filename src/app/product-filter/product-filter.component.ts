import {Component, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

    filter: string;
    order: boolean;
    element: any;
    active: any;

    @Output() filterChanged = new EventEmitter();
    @Output() orderChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.filter = '';
        this.element = (<HTMLInputElement>document.getElementById(localStorage.getItem('filter')));
        this.active = document.getElementsByClassName('active')[2];
        this.active.classList.remove('active');
        this.element.classList.add('active');
    }

    // Funcion que se dispara cuando se clica sobre un filtro, cambia el valor de filter.
    updateFilter(value: string): void {
        localStorage.setItem('filter', value);
        this.filter = value;
        this.filterChanged.emit(this.filter);

    }

    updateOrder(value: boolean) {
        this.order = value;
        this.orderChanged.emit(value);
    }

}
