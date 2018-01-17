import {Component,OnInit} from '@angular/core';

import {DataservicesService} from '../../_services/dataservices.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // cartComics = [{
  //     issueName: "Strange Visitor",
  //     volumeName: "Kingdom Come",
  //     img: "https://comicvine.gamespot.com/api/image/scale_small/3446484-01.jpg",
  //     price: 5
  //   },
  //   {
  //     issueName: "Strange Visitor",
  //     volumeName: "Kingdom Come",
  //     img: "https://comicvine.gamespot.com/api/image/scale_small/3446484-01.jpg",
  //     price: 5
  //   }
  // ];

  cartComics = [];

  cartComicsId: any;

  total:number = 0;

  constructor(private _ds:DataservicesService) {

    this.total = 0;

    this.cartComicsId = localStorage.getItem("cart") ? localStorage.getItem("cart").split(",") : "";

    console.log(this.cartComicsId);
    
    _ds.issuesId.valueChanges().subscribe(comics=>{

      for (let i = 0; i < this.cartComicsId.length; i++) {
        this.cartComics.push(comics[this.cartComicsId[i]]);
        this.total += comics[this.cartComicsId[i]].price
      }


      console.log(this.cartComics,this.total);

    })

  }

  ngOnInit() {}

}
