import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  filter: string;

  @Output() filterChanged = new EventEmitter();
  @Output() orderChanged = new EventEmitter();

  constructor() {
    this.filter = '';
  }

  // Funcion que se dispara cuando se clica sobre un filtro, cambia el valor de filter.
  updateFilter(value: string): void {
    this.filter = value;
    this.filterChanged.emit(this.filter);
  }

  updateOrder(value:string){
    this.orderChanged.emit(value);
  }
  

}
