import {Component,OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {AngularFireDatabase} from "angularfire2/database";

import { DataservicesService }  from '../_services/dataservices.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  comics:any = [];
  comic: any = [];

  volume:any = [];
  volumeComics = [];

  currentVComicImage;
  currentVComic;


  defaultPage = 1;


  constructor(private route: ActivatedRoute, private af: AngularFireDatabase,private _ds:DataservicesService) {



    route.params.subscribe(parametros => {
      _ds.issuesId.valueChanges().subscribe(data =>{

        this.comics = data;
        this.comic = this.comics[parametros.id];

        this.currentVComic = this.comic;

        _ds.volumes.valueChanges().subscribe(volumes =>{

          this.volume = volumes[this.comic.volumeId];

          // console.log(this.volume);
          this.volumeComics = [];        
          for (let i = 0; i < this.volume.volumeIssues.length; i++) {
            this.volumeComics.push(this.comics[this.volume.volumeIssues[i]])
          }
          
        });
      });
    });

  }


  changeCurrentVComicImage(id){
    console.log(id);
    this.currentVComic = this.comics[id];
    this.currentVComicImage = this.currentVComic.issueImage.small_url;
  }

  ngOnInit() {}

}
