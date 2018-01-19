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


    route.params.subscribe(parametros => {
      _ds.issuesId.valueChanges().subscribe(data => {

        this.comics = data;
        this.comic = this.comics[parametros.id];

        this.currentVComic = this.comic;

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


  changeCurrentVComicImage(id) {
    this.currentVComic = this.comics[id];
    this.currentVComicImage = this.currentVComic.issueImage.small_url;
  }


  addCart(id) {
    if (localStorage.getItem('cart') == '' || localStorage.getItem('cart') == null) {
      localStorage.setItem('cart', id);
    } else {
      localStorage.setItem('cart', localStorage.getItem('cart') + ',' + id);
    }


    this._ds.setCountCart(localStorage.getItem('cart').split(',').length > 0 ? localStorage.getItem('cart').split(',').length : 0);
  }

  alertCart() {
    this.notificationService.triggerNotification({
      'type': 'info',
      'message': 'Article added to the cart',
      'duration': 500
    });
  }

  alertNotImplemented() {
    this.notificationService.triggerNotification({
      'type': 'warning',
      'message': 'Sorry, this feature is not implemented yet...',
      'duration': 2000
    });
  }


}
