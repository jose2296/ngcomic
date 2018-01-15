import {Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartComics = [{
      issueName: "Strange Visitor",
      volumeName: "Kingdom Come",
      img: "https://comicvine.gamespot.com/api/image/scale_small/3446484-01.jpg",
      price: 5
    },
    {
      issueName: "Strange Visitor",
      volumeName: "Kingdom Come",
      img: "https://comicvine.gamespot.com/api/image/scale_small/3446484-01.jpg",
      price: 5
    }
  ];

  constructor() {}

  ngOnInit() {}

}
