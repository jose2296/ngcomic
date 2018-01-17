import { Component, OnInit } from '@angular/core';

import {DataservicesService} from '../../_services/dataservices.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:any = [];

  constructor(private _ds:DataservicesService) {
    _ds.news.valueChanges().subscribe(news =>{
      this.news = news;
      console.log(this.news);
      
    })
   }

  ngOnInit() {
  }

}
