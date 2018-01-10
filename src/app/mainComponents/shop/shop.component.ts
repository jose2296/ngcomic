import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  filter: string;

  constructor() { }

  // Funcion que se ejecuta cuando cambia el valor de filter en alguno de sus componentes hijos.
  updateFilter(event): void {
    this.filter = event;
  }

}
