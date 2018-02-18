import {Injectable,EventEmitter} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class DataservicesService {

  issuesId: any = [];
  issues: any = [];
  volumes: any = [];
  news: any = [];

  event = new EventEmitter();
  countCart: number = 0;

  //guardar en las variables los datos de la base de datos
  constructor(af: AngularFireDatabase) {
    this.issues = af.list("/issues");
    this.issuesId = af.object("/issues");
    this.volumes = af.object("/volumes");
    this.news = af.list("/news");

    this.setCountCart();
  }


  //actualizar el contador del carro
  setCountCart() {

    let comicQuantity = (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "") ? JSON.parse(localStorage.getItem("cart")) : [];

    this.countCart = 0;

    for (let i = 0; i < comicQuantity.length; i++) {
      this.countCart += parseInt(comicQuantity[i].quantity);
    }
    this.event.emit(this.countCart)
  }
}
