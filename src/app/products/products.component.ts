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
  comics: any = [
    {
      name: 'Escuadrón suicida',
      url: 'https://buhomag-cms.imgix.net/2016/01/18125609/Escuadr%C3%B3n-Suicida-2.jpg?w=200&fit=max',
      gener: 'accion',
      price: 20,
      date: '1997-03-12',
      rate: 5
    },
    {
      name: 'Batman',
      url: 'http://needcoffee.cachefly.net/needcoffee/uploads/2008/05/vietnamese-batman-comic.jpg',
      gener: 'comedia',
      price: 14,
      date: '1997-03-11',
      rate: 1
    },
    {
      name: 'Captain America',
      url: 'https://www.passionepericoltelli.com/3174-home_default/tin-signs-captain-america-cover.jpg',
      gener: 'drama',
      price: 7,
      date: '2001-10-15',
      rate: 3
    },
    {
      name: 'Superman',
      url: 'https://10deb7fbfece20ff53da-95da5b03499e7e5b086c55c243f676a1.ssl.cf1.rackcdn.com/d32ba389c2eae17369bc1d2cc49852a8_s.jpg',
      gener: 'terror',
      price: 7,
      date: '1963-01-28',
      rate: 4
    }
  ];

  constructor() {
    this.lastComics = 5;
    this.visible = 'none';
  }

  /*Función que retorna un array de objetos (arr) ordenado por un atributo(atr) */
  orderArray(arr, atr = '') {
    return arr.sort((a, b) => {
        switch (atr) {
          case 'price':
            return (b.price - a.price);
          case 'name':
            return (b.name > a.name);
          case'date':
            return (b.date > a.date);
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
    switch (this.type) {
      /*Muestra los ultimos 3 (lastComics) comics ordenados por fecha*/
      case 'last':
        this.result = this.orderArray(this.comics, 'date').slice(0, this.lastComics);
        break;
      /*Los inputs radio pasan a estra visibles (visible) y por rate(default)*/
      case'shop':
        this.visible = 'block';
        this.switchFilter('rate');
        break;
      default:

        this.result = this.comics;

    }
  }
}

