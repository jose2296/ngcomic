import {
    Component,
    OnInit
} from '@angular/core';

import {
    ActivatedRoute
} from '@angular/router';

import {
    AngularFireDatabase
} from 'angularfire2/database';

import {
    DataservicesService
} from '../_services/dataservices.service';
import {
    NotificationService
} from '../_services/notification.service';
import swal from 'sweetalert2';


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
    comesFrom;


    defaultPage = 1;
    complete: boolean = false;


    constructor(private route: ActivatedRoute, private af: AngularFireDatabase, private _ds: DataservicesService, private notificationService: NotificationService) {

        //coger el comic dependiendo del parametro de la ruta (/shop/id)
        route.params.subscribe(parametros => {
            localStorage.setItem('defaultPage', parametros.id.substr(-1, 1));
            _ds.issuesId.valueChanges().subscribe(data => {
                //guardar los datos del comic deseado (id)
                this.comics = data;
                this.comic = this.comics[parametros.id.substr(0, parametros.id.length - 1)];

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
        this.comesFrom = localStorage.getItem('currentComponent');
    }

    //Funcion que cambia la imagen que se ve en el visor segun el id que se pase
    changeCurrentVComicImage(id) {
        this.currentVComic = this.comics[id];
        this.currentVComicImage = this.currentVComic.issueImage.small_url;
    }

    //Funcion que añade el comics segun el id que se le pase al carro (localStorage)
    addCart(id) {
        if (localStorage.getItem('cart') === '' || localStorage.getItem('cart') === null) {
            let cartComicObject = [{
                'id': id,
                'quantity': 1
            }];
            localStorage.setItem('cart', JSON.stringify(cartComicObject));
            // this._ds.setComicQuantity(0,1);
        } else {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let equal = false;
            cart.map((el) => {
                if (el.id === id) {
                    el.quantity++;
                    equal = true;
                }
            });

            if (!equal) {
                cart.push({
                    id: id,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        }

        this._ds.setCountCart();

    }

    //Funcion que añade todos los comics de un volmen al carro (localStorage)
    addVolume(idVol) {
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
        swal({
            position: 'bottom-end',
            type: 'success',
            title: this.comic.issueName + ' added to the cart',
            showConfirmButton: false,
            toast: true,
            showCloseButton: true,
        });
    }

    // Funcion que se ejecuta al clicar en el boton de añadir a WishList, lanza una notificacion avisando de que la funcion no esta
    // implementada aun.
    alertNotImplemented() {
        swal({
            type: 'info',
            title: 'This feature is not implemented yet, sorry 🙁',
            buttonsStyling: false,
            confirmButtonText: 'Okey',
            confirmButtonClass: 'btn btn-primary'
        });
    }

    alertVolume() {
        swal({
            position: 'bottom-end',
            type: 'success',
            title: 'Volume: ' + this.volume.volumeName + ' added to the cart',
            showConfirmButton: false,
            toast: true,
            showCloseButton: true,
        });
    }


}
