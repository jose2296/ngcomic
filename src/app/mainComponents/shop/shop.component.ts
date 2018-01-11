import { Component } from '@angular/core';

import { AngularFireDatabase  } from "angularfire2/database";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  filter: string;
/*
  datosPadre: any = [
    {
      issueName: 'Escuadrón suicida',
      issueImage: 'https://buhomag-cms.imgix.net/2016/01/18125609/Escuadr%C3%B3n-Suicida-2.jpg?w=200&fit=max',
      gener: 'accion',
      price: 20,
      coverDate: '1997-03-12',
      rate: 5
    },
    {
      issueName: 'Batman',
      issueImage: 'http://needcoffee.cachefly.net/needcoffee/uploads/2008/05/vietnamese-batman-comic.jpg',
      gener: 'comedia',
      price: 14,
      coverDate: '1997-03-11',
      rate: 1
    },
    {
      issueName: 'Captain America',
      issueImage: 'https://www.passionepericoltelli.com/3174-home_default/tin-signs-captain-america-cover.jpg',
      gener: 'drama',
      price: 7,
      coverDate: '2001-10-15',
      rate: 3
    },
    {
      issueName: 'Superman',
      issueImage: 'https://10deb7fbfece20ff53da-95da5b03499e7e5b086c55c243f676a1.ssl.cf1.rackcdn.com/d32ba389c2eae17369bc1d2cc49852a8_s.jpg',
      gener: 'terror',
      price: 7,
      coverDate: '1963-01-28',
      rate: 4
    }
  ];
*/
  datosPadre= [];
  constructor(private af:AngularFireDatabase) { 

    af.list("/issues").valueChanges().subscribe(data =>{
     
    let array = data;
    for (let i = 0; i < array.length; i++) {
      this.datosPadre.push(array[i])
      
    }
    //this.datosPadre =  data; //--> esto seria un objeto no un array
    console.log(this.datosPadre);
        
  });


  }

  // Funcion que se ejecuta cuando cambia el valor de filter en alguno de sus componentes hijos.
  updateFilter(event): void {
    this.filter = event;
  }

}
