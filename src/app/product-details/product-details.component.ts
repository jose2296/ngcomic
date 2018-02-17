import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {AngularFireDatabase} from 'angularfire2/database';

import {DataservicesService} from '../_services/dataservices.service';
import {NotificationService} from '../_services/notification.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  comics: any = [];
  comic: any = [];

  volume: any = [];
  volumeComics = [];

  currentVComicImage;
  currentVComic;

  defaultPage = 1;
  complete: boolean = false;


  constructor(private route: ActivatedRoute, private af: AngularFireDatabase, private _ds: DataservicesService, private notificationService: NotificationService) {

    //coger el comic dependiendo del parametro de la ruta (/shop/id)
    route.params.subscribe(parametros => {
      _ds.issuesId.valueChanges().subscribe(data => {
        //guardar los datos del comic deseado (id)
        this.comics = data;
        this.comic = this.comics[parametros.id];

        this.currentVComic = this.comic;
        //almacenar los comics del volumen
        _ds.volumes.valueChanges().subscribe(volumes => {

          this.volume = volumes[this.comic.volumeId];

          this.volumeComics = [];
          for (let i = 0; i < this.volume.volumeIssues.length; i++) {
            this.volumeComics.push(this.comics[this.volume.volumeIssues[i]]);
          }

          this.complete = true;
        });
      });
    });

  }

  ngOnInit() {
  }

  //Funcion que cambia la imagen que se ve en el visor segun el id que se pase
  changeCurrentVComicImage(id) {
    this.currentVComic = this.comics[id];
    this.currentVComicImage = this.currentVComic.issueImage.small_url;
  }

  //Funcion que añade el comics segun el id que se le pase al carro (localStorage)
  addCart(id) {
    if (localStorage.getItem('cart') === '' || localStorage.getItem('cart') === null) {
      localStorage.setItem('cart', id);
      this._ds.setComicQuantity(0,1);
    } else {
      if(localStorage.getItem("cart").split(",").indexOf(id.toString()) === -1){
        localStorage.setItem('cart', localStorage.getItem('cart') + ',' + id);
        this._ds.setComicQuantity(localStorage.getItem("cart").split(",").indexOf(id.toString()),1);
      }else{
        this._ds.setComicQuantity(localStorage.getItem("cart").split(",").indexOf(id.toString()),1);
      }
    }
}

  //Funcion que añade todos los comics de un volmen al carro (localStorage)
  addVolume(idVol){
    // let comicsVol = [];
    // for (let i = 0; i < idVol.length; i++) {
    //   comicsVol.push(idVol[i]);
    // }

    // let a = comicsVol.concat(localStorage.getItem("cart") !== "" && localStorage.getItem("cart") !== null ? localStorage.getItem("cart").split(",") : []);


    // localStorage.setItem("cart",a.join(","))

    // this._ds.setCountCart(localStorage.getItem('cart').split(',').length > 0 ? localStorage.getItem('cart').split(',').length : 0);

  }


  // Funcion que se ejecuta al clicar en el boton de añadir al carro, lanza una notificacion avisando de que se ha añadido
  // satisfactoriamente.
  alertCart() {
    this.notificationService.triggerNotification({
      'config': {
        position: 'top-end',
        type: 'success',
        title: 'Product added to the cart',
        showConfirmButton: false,
        timer: 1500
      }
    });
  }

  // Funcion que se ejecuta al clicar en el boton de añadir a WishList, lanza una notificacion avisando de que la funcion no esta
  // implementada aun.
  alertNotImplemented() {
    this.notificationService.triggerNotification({
      'config': {
        type: 'info',
        title: 'This feature is not implemented yet, sorry 🙁',
        confirmButtonText: 'Okey'
      }
    });
  }

  alertVolume(){
    this.notificationService.triggerNotification({
      'config': {
        type: 'info',
        title: 'Volume added',
        confirmButtonText: 'Okey'
      }
    });
  }


}
