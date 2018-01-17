import {Component,OnInit} from '@angular/core';

import {DataservicesService} from '../../_services/dataservices.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartComics = [];

  cartComicsId: any;

  quantity: any = [];

  total:number = 0;

  constructor(private _ds:DataservicesService) {

    this.total = 0;

    let cCartIds = localStorage.getItem("cart") ? localStorage.getItem("cart").split(",") : [];

    for (let i = 0; i < cCartIds.length; i++) {
      this.quantity[cCartIds[i]] = 1;
    }

    
    for (let i = 0; i < cCartIds.length; i++) {
      for (let j = i+1; j < cCartIds.length; j++) {
        if (cCartIds[i] == cCartIds[j]) {
          console.log("igual");
          this.quantity[cCartIds[i]]++;
          cCartIds.splice(i,1);
          i--;
          j--;
        } 
      }     
    }

    this.cartComicsId = cCartIds;


    
    _ds.issuesId.valueChanges().subscribe(comics=>{

      for (let i = 0; i < this.cartComicsId.length; i++) {
        this.cartComics.push(comics[this.cartComicsId[i]]);
        this.total += comics[this.cartComicsId[i]].price * this.quantity[comics[this.cartComicsId[i]].issueId]
      }

    })

  }

  ngOnInit() {}



  deleteQuantity(id){
    
    let cCartIds = localStorage.getItem("cart") ? localStorage.getItem("cart").split(",") : [];
    console.log(cCartIds,id);

    cCartIds.splice(cCartIds.indexOf(id.toString()),1);

    localStorage.setItem("cart",cCartIds.join(","));
    

    for (let i = 0; i < cCartIds.length; i++) {
      this.quantity[cCartIds[i]] = 1;
    }

    
    for (let i = 0; i < cCartIds.length; i++) {
      for (let j = i+1; j < cCartIds.length; j++) {
        if (cCartIds[i] == cCartIds[j]) {
          console.log("igual");
          this.quantity[cCartIds[i]]++;
          cCartIds.splice(i,1);
          i--;
          j--;
        } 
      }     
    }


    

    this.cartComicsId = cCartIds;
    
    this.total = 0;

    this.cartComics = []

    this._ds.issuesId.valueChanges().subscribe(comics=>{

      for (let i = 0; i < this.cartComicsId.length; i++) {
        this.cartComics.push(comics[this.cartComicsId[i]]);
        this.total += comics[this.cartComicsId[i]].price * this.quantity[comics[this.cartComicsId[i]].issueId]
      }

    })
  }
}
