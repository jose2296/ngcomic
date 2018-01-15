import {Component, OnInit, Input} from '@angular/core';

import {DataservicesService} from '../_services/dataservices.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    @Input() type: string;

    @Input()
    set filter(filter: string) {
        this.switchFilter(filter);
    }


    @Input()
    set order(order: boolean) {
        this.orderFilter(order);
    }

    defaultPage = 1;
    lastComics: number;
    result: any = [];
    comics: any = [];
    localOrder: boolean;
    wordSearch: string;

    searchCondition(str,searchWord=this.wordSearch) {
        return (str.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0)
    }

    search(): void {

        this.result = this.comics.filter((a) => {

            if (this.searchCondition(a.issueDescription)||
                this.searchCondition(a.issueName)||
                this.searchCondition(a.volumeName)){
                return a
            }
        })
        console.log(this.result)
    }


    constructor(private _ds: DataservicesService) {
        this.lastComics = 4;
        this.localOrder = false;
    }

    /* Valore la variable type para las distintas vistas */
    ngOnInit() {

        this._ds.issues.valueChanges().subscribe(data => {
            let array = data;
            this.comics = array.slice();
            switch (this.type) {
                /*Muestra los ultimos 3 (lastComics) comics ordenados por fecha*/
                case 'last':
                    this.result = this.orderArray(this.comics, 'date').slice(0, this.lastComics);
                    break;
                /*Los inputs radio pasan a estra visibles (visible) y por rate(default)*/
                case'shop':
                    this.switchFilter('rate');
                    break;
            }

        });
    }

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

    orderFilter(order): void {
        if (this.localOrder !== order) {
            this.result = this.result.reverse();
            this.localOrder = !this.localOrder;
        }
    }

    /*Función que me permite cambiar el array result cuando se hace click */
    switchFilter(filter): void {
        this.result = this.orderArray(this.comics, filter)
        if (!this.localOrder) this.result = this.result.reverse();
    }

}

