import {Component, OnInit, Input} from '@angular/core';

import {DataservicesService} from '../_services/dataservices.service';
import {SearchService} from "../_services/search.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    @Input() type: string;

    /*Lanza la función swichFilter cada vez que filter cambia de valor*/
    @Input()
    set filter(filter: string) {
        this.switchFilter(filter);
    }

    /*Lanza la función swichFilter cada vez que order cambia de valor*/
    @Input()
    set order(order: boolean) {
        this.orderFilter(order);
    }

    defaultPage = 1;
    lastComics: number;
    result: any = [];
    comics: any = [];
    localOrder: boolean;
    stringSearch: string;

    constructor(private _ds: DataservicesService, private searchservice: SearchService) {
        this.lastComics = 4;
        this.localOrder = false;

        /*Servicio que me permite utilizar los datos introducidos en el input del componente header
         y lanzar la función search cada vez que el usuario pulse una tecla en dicho input*/
        this.searchservice.event.subscribe(() => {
            this.stringSearch = searchservice.stringSearch
            this.search()
        })

    }

    /* Valore la variable type para las distintas vistas */
    ngOnInit() {
        /*Extrae los datos del servicio DataservicesService y los almacena en el array comics*/
        this._ds.issues.valueChanges().subscribe(data => {
            let array = data;
            this.comics = array.slice();
            switch (this.type) {
                /*Muestra los ultimos 3 (lastComics) comics ordenados por fecha*/
                case 'last':
                    this.result = this.orderArray(this.comics, 'date').slice(0, this.lastComics);
                    break;
                /*Filtado por rate(default) o lanza la función search con el ultimo valor de string search del servicio*/
                case'shop':
                    this.result=this.orderArray(this.comics,'rate')
                    this.stringSearch = this.searchservice.stringSearch
                    if(this.stringSearch) this.search()
                    break;
            }
        });
    }

    /*Función que busca si el segundo parametro está contenido en el primero*/
    searchCondition(str, searchWord = this.stringSearch) {
        return (str.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0)
    }

    /*Función que filtra el array result, */
    search(): void {
        this.result = this.comics.filter((a) => {
            if (this.searchCondition(a.issueDescription) ||
                this.searchCondition(a.issueName) ||
                this.searchCondition(a.volumeName)) {
                return a
            }
        })
    }

    /*Me permite convertir una fecha, tipo string, en un número*/
    dateToNumber(str): any {
        return new Date(str).getTime();
    }

    /*Función que retorna un array de objetos (arr) ordenado por un atributo(atr) */
    orderArray(arr, atr = ''): any {
        return arr.sort((a, b) => {
                switch (atr) {
                    case 'price':
                        return (b.price - a.price);
                    case 'name':
                        return (b.issueName.charCodeAt(0) - a.issueName.charCodeAt(0));
                    case'date':
                        let f1 = this.dateToNumber(b.coverDate);
                        let f2 = this.dateToNumber(a.coverDate);
                        return (f1 - f2);
                    default :
                        return (b.rate - a.rate);
                }
            }
        );
    }

    /*Función que cambia el orden entre ascedente o descendiente*/
    orderFilter(order): void {
        if (this.localOrder !== order) {
            this.result = this.result.reverse();
            this.localOrder = !this.localOrder;
        }
    }

    /*Función que me permite cambiar el array result cuando se haga click */
    switchFilter(filter): void {
        this.result = this.orderArray(this.result, filter)
        if (!this.localOrder) this.result = this.result.reverse();
    }

}

