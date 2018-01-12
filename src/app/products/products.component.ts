import {Component, OnInit, Input} from '@angular/core';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    @Input() type: string;
    @Input() datos: string;

    @Input()
    set filter(filter: string) {
        this.switchFilter(filter);
    }

    defaultPage = 1;
    lastComics: number;
    result: any = [];
    comics: any = [];

    constructor() {
        this.lastComics = 10;

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
                this.switchFilter('price');
                break;
            default:
                this.result = this.comics;
        }
    }

    dateToNumber(str): any {

        return new Date(str).getTime()

    }

    /*Función que retorna un array de objetos (arr) ordenado por un atributo(atr) */
    orderArray(arr, atr = ''): any {
        return arr.sort((a, b) => {
                switch (atr) {
                    case 'price':
                        return (b.price - a.price);
                    case 'name':
                        return (b.issueName.charCodeAt(0) > a.issueName.charCodeAt(0));
                    case'date':
                        let f1 = this.dateToNumber(b.coverDate)
                        let f2 = this.dateToNumber(a.coverDate)
                        return (f1 > f2);
                    default :
                        return (b.rate - a.rate);
                }
            }
        );
    }

    orderFilter(order): void {
        this.result = this.result.reverse();
    }

    /*Función que me permite cambiar el array result cuando se hace click */
    switchFilter(filter): void {
        setTimeout(() => this.result = this.orderArray(this.comics, filter), 0);
    }
}

