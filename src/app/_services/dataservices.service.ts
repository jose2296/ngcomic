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

  comicQuantity = [];

  //guardar en las variables los datos de la base de datos
  constructor(af: AngularFireDatabase) {
    this.issues = af.list("/issues");
    this.issuesId = af.object("/issues");
    this.volumes = af.object("/volumes");
    this.news = af.list("/news");

    this.comicQuantity = (localStorage.getItem("quantity") !== null && localStorage.getItem("quantity") !== "") ? localStorage.getItem("quantity").split(",") : [];
  
    let total = 0;

    for (let i = 0; i < this.comicQuantity.length; i++) {
      total += parseInt(this.comicQuantity[i]);
    }
    this.setCountCart(total);
  }

  setComicQuantity(index,value,bool = false){
    if(this.comicQuantity[index] === undefined){
      this.comicQuantity[index] = 1;
    }else{
      if(bool){
        this.comicQuantity[index] = value;
      }else{
        this.comicQuantity[index] = parseInt(this.comicQuantity[index]) +  value;
      }
    }

    console.log(this.comicQuantity);
    

    localStorage.setItem("quantity",this.comicQuantity.join(","));

    let total = 0;

    for (let i = 0; i < this.comicQuantity.length; i++) {
      total += parseInt(this.comicQuantity[i]);
    }
    this.setCountCart(total);
  }

  //actualizar el contador del carro
  setCountCart(count) {
    this.countCart = count;
    this.event.emit(this.countCart)
  }
}
