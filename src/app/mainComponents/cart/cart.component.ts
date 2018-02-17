import {
  Component,
  OnInit
} from '@angular/core';

import {
  DataservicesService
} from '../../_services/dataservices.service'

import {
  NotificationService
} from '../../_services/notification.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  comics = [];


  total: number;
  complete: boolean;
  comicsQuantity;

  ngOnInit() {

  }

  constructor(private _ds: DataservicesService, private notificationService: NotificationService) {
    
    let cartComicsIds = (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "") ? localStorage.getItem("cart").split(",") : [];


    this.comicsQuantity = this._ds.comicQuantity;

    this.comics = [];
    this.total = 0;

    //almenzar los comics y la cantidad total del carro
    this._ds.issuesId.valueChanges().subscribe(comics=>{
      for (let i = 0; i < cartComicsIds.length; i++) {
        this.comics.push(comics[cartComicsIds[i]]);
        this.total += comics[cartComicsIds[i]].price * this.comicsQuantity[i]
        
      }
      this.complete = true;

    })

  }

  


  buttonQuantity(index,value){

    let deteteComic = false;

    let cartComicsIds = (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "") ? localStorage.getItem("cart").split(",") : [];
    
    
    let cartComicsQuantity = (localStorage.getItem("quantity") !== null && localStorage.getItem("quantity") !== "") ? localStorage.getItem("quantity").split(",") : [];


    this._ds.setComicQuantity(index,value);
    // cartComicsQuantity[index] = parseInt(cartComicsQuantity[index]) + value;
    cartComicsQuantity = this._ds.comicQuantity;

    if(parseInt(cartComicsQuantity[index]) <= 0){
      cartComicsIds.splice(index,1);
      cartComicsQuantity.splice(index,1);
      localStorage.setItem("cart",cartComicsIds.join(","));
      deteteComic = true;
      this.comics = [];
    }

    localStorage.setItem("quantity",cartComicsQuantity.join(","));


    this.comicsQuantity = cartComicsQuantity;
    

    this.total = 0;

    //almenzar los comics y la cantidad total del carro
    this._ds.issuesId.valueChanges().subscribe(comics=>{
      for (let i = 0; i < cartComicsIds.length; i++) {
        if(deteteComic){
          this.comics.push(comics[cartComicsIds[i]]);
        }
        this.total += comics[cartComicsIds[i]].price * this.comicsQuantity[i]
      }
      this.complete = true;

    })


  }


  onChange($event,i){

    let cartComicsIds = (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "") ? localStorage.getItem("cart").split(",") : [];
    
    
    let cartComicsQuantity = (localStorage.getItem("quantity") !== null && localStorage.getItem("quantity") !== "") ? localStorage.getItem("quantity").split(",") : [];

    this._ds.setComicQuantity(i,$event,true);
    cartComicsQuantity[i] = $event;

    localStorage.setItem("quantity",cartComicsQuantity.join(","));


    this.comicsQuantity = cartComicsQuantity;
    

    this.total = 0;

    //almenzar los comics y la cantidad total del carro
    this._ds.issuesId.valueChanges().subscribe(comics=>{
      for (let i = 0; i < cartComicsIds.length; i++) {
        this.total += comics[cartComicsIds[i]].price * this.comicsQuantity[i]
      }
      this.complete = true;

    })
    
  }



  alertNotImplemented() {
    this.notificationService.triggerNotification({
      'type': 'warning',
      'message': 'Sorry, this feature is not implemented yet...',
      'duration': 2000
    });
  }


}
