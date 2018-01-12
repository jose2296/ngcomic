import {Component, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

    filter: string;
    order: boolean;

    @Output() filterChanged = new EventEmitter();
    @Output() orderChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.filter = '';
    }

    // Funcion que se dispara cuando se clica sobre un filtro, cambia el valor de filter.
    updateFilter(value: string): void {
        this.filter = value;
        this.filterChanged.emit(this.filter);

    }

    updateOrder(value: boolean) {
        this.order = value;
        this.orderChanged.emit(value);
    }

}
