import {Component} from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  filter: string;
  datosPadre = [];

  constructor(private af: AngularFireDatabase) {

    af.list('/issues').valueChanges().subscribe(data => {

      let array = data;
      for (let i = 0; i < array.length; i++) {
        this.datosPadre.push(array[i]);

      }
      //this.datosPadre =  data; //--> esto seria un objeto no un array
      // console.log(this.datosPadre);

    });


  }

  // Funcion que se ejecuta cuando cambia el valor de filter en alguno de sus componentes hijos.
  updateFilter(event): void {
    this.filter = event;
  }

}
