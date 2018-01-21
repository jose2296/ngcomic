import {Component,OnInit} from '@angular/core';

import {DataservicesService} from '../../_services/dataservices.service'

import {NotificationService} from '../../_services/notification.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartComics = [];

  cartComicsId: any;

  quantity: any = [];

  total:number;

  complete:boolean;

  constructor(private _ds:DataservicesService, private notificationService: NotificationService) {

    this.total = 0;
    this.complete = false;

    //Coger los id de los comics del localstorage
    let cCartIds = localStorage.getItem("cart") ? localStorage.getItem("cart").split(",") : [];
    //inicializar cantidades de los comics 
    for (let i = 0; i < cCartIds.length; i++) {
      this.quantity[cCartIds[i]] = 1;
    }

    cCartIds =  this.deleteDupArray(cCartIds);

    this.cartComicsId = cCartIds;
    
    //almenzar los comics y la cantidad total del carro
    _ds.issuesId.valueChanges().subscribe(comics=>{
      for (let i = 0; i < this.cartComicsId.length; i++) {
        this.cartComics.push(comics[this.cartComicsId[i]]);
        this.total += comics[this.cartComicsId[i]].price * this.quantity[comics[this.cartComicsId[i]].issueId]
      }

      this.complete = true;

    })

  }

  ngOnInit() {}


  //Eliminar un comic del localStorage dependiendo del id
  deleteQuantity(id){
    
    let cCartIds = localStorage.getItem("cart") ? localStorage.getItem("cart").split(",") : [];

    cCartIds.splice(cCartIds.indexOf(id.toString()),1);

    localStorage.setItem("cart",cCartIds.join(","));
    
    
    for (let i = 0; i < cCartIds.length; i++) {
      this.quantity[cCartIds[i]] = 1;
    }

    this.deleteDupArray(cCartIds);


    this.updateData(cCartIds);
  }


  
  //Elimina todos los comics con el mismo id del LocalStorage
  deleteAllQuantity(id){

    let comicsId = localStorage.getItem("cart").split(",");
    
    comicsId = comicsId.filter(function(el){
      if(el !== id.toString()){
        return el
      }
    })

    localStorage.setItem("cart",comicsId.join(","));

    for (let i = 0; i < comicsId.length; i++) {
      this.quantity[comicsId[i]] = 1;
    }

    comicsId = this.deleteDupArray(comicsId);

    this.updateData(comicsId);
  }

  //Reinicia el array de comics que se visualizan en el carro || parametro => array de indices (id comics) no duplicados
  updateData(comicsId){

    this.cartComicsId = comicsId;
    
    this.total = 0;

    this.cartComics = []

    this._ds.issuesId.valueChanges().subscribe(comics=>{
      
      for (let i = 0; i < this.cartComicsId.length; i++) {
        this.cartComics.push(comics[this.cartComicsId[i]]);
        this.total += comics[this.cartComicsId[i]].price * this.quantity[comics[this.cartComicsId[i]].issueId]
      }
      this._ds.setCountCart(localStorage.getItem("cart") !== "" ?  localStorage.getItem("cart").split(",").length : 0);
    })
  }

  //Eliminar valores duplicados de un array dado y aumentar el array de cantidades dependiendo de los datos duplicados || parametro => array que almazena la cantidad de comics dependiendo del indice (id)
  deleteDupArray(array,quantity=this.quantity):any{
    for (let i = 0; i < array.length; i++) {
      for (let j = i+1; j < array.length; j++) {
        if (array[i] == array[j]) {
          quantity[array[i]]++;
          array.splice(i,1);
          i--;
          j--;
        } 
      }     
    }
    return array;
  }

  //Eliminar la variable del localstorage
  removeCart(){
    localStorage.setItem("cart","");
    this.updateData([]);
  }


  alertNotImplemented() {
    this.notificationService.triggerNotification({
      'type': 'warning',
      'message': 'Sorry, this feature is not implemented yet...',
      'duration': 2000
    });
  }

}
