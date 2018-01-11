import {Component, OnInit, Input} from '@angular/core';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() type: string;
  @Input() set filter(filter: string) {
    this.switchFilter(filter);
  }

  lastComics: number;
  visible: string;
  result: any = [];

  comics:any = [];

  @Input() datos:String;


  constructor() {
      this.lastComics = 10;
      this.visible = 'none';  
  }

  /*Función que retorna un array de objetos (arr) ordenado por un atributo(atr) */
  orderArray(arr, atr = '') {
    return arr.sort((a, b) => {
        switch (atr) {
          case 'price':
            return (b.price - a.price);
          case 'name':
            return (b.issueName > a.issueName);
          case'date':
            return (b.coverDate > a.coverDate);
          default :
            return (b.rate - a.rate);

        }
      }
    );
  }

  orderFilter(order) {
      this.result = this.result.reverse();
  }

  /*Función que me permite cambiar el array result cuando se hace click */
  switchFilter(filter) {
    setTimeout(() => this.result = this.orderArray(this.comics, filter), 0);
  }

  /* Valore la variable type para las distintas vistas */
  ngOnInit() {

    this.comics = this.datos;


    switch (this.type) {
      /*Muestra los ultimos 3 (lastComics) comics ordenados por fecha*/
      case 'last':
        this.result = this.orderArray(this.comics, 'date').slice(0, this.lastComics);
        break;
      /*Los inputs radio pasan a estra visibles (visible) y por rate(default)*/
      case'shop':
        this.visible = 'block';
        this.switchFilter('price');
        break;
      default:
        this.result = this.comics;

    }
  }
}

