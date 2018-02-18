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

  comics:Array<any>;
  total: number;
  complete: boolean;
  cartComicsIds:Array<any>;

ngOnInit() {

}

constructor(private _ds: DataservicesService, private notificationService: NotificationService) {

  this.cartComicsIds = (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "") ? JSON.parse(localStorage.getItem("cart")) : [];
  
  this._ds.setCountCart();

  this.comics = [];
  this.total = 0;

  //almenzar los comics y la cantidad total del carro
  this._ds.issuesId.valueChanges().subscribe(comics => {
    for (let i = 0; i < this.cartComicsIds.length; i++) {
      this.comics.push(comics[this.cartComicsIds[i].id.toString()]);
      this.total += comics[this.cartComicsIds[i].id.toString()].price * this.cartComicsIds[i].quantity

    }
    this.complete = true;

  })

}



modifyQuantity(index, value) {

  this.cartComicsIds = (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "") ? JSON.parse(localStorage.getItem("cart")) : [];
  
  this.cartComicsIds[index].quantity += value;

  localStorage.setItem('cart', JSON.stringify(this.cartComicsIds));

  this.total += this.comics[index].price * value;

  this._ds.setCountCart();
  
}

onChange($event, i) {

  if($event < 0 || $event === null){
    this.cartComicsIds[i].quantity = 1;
  }
  
  localStorage.setItem('cart', JSON.stringify(this.cartComicsIds));
  
  this.total = 0;

  //almenzar los comics y la cantidad total del carro
  this._ds.issuesId.valueChanges().subscribe(comics => {
    for (let i = 0; i < this.cartComicsIds.length; i++) {
      this.total += comics[this.cartComicsIds[i].id.toString()].price * this.cartComicsIds[i].quantity

    }
    this.complete = true;

  })

  this._ds.setCountCart();
  

}



alertNotImplemented() {
  this.notificationService.triggerNotification({
    'type': 'warning',
    'message': 'Sorry, this feature is not implemented yet...',
    'duration': 2000
  });
}


}
