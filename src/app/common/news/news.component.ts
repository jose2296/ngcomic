import { Component, OnInit } from '@angular/core';

import {DataservicesService} from '../../_services/dataservices.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:any = [];

  complete:boolean;

  constructor(private _ds:DataservicesService) {
    this.complete = false;
    _ds.news.valueChanges().subscribe(news =>{
      this.news = news;
      this.complete = true;
    })
   }

  ngOnInit() {
  }

}
