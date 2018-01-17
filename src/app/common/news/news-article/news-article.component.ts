import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {

  @Input() article;

  constructor() {
  }

  ngOnInit() {
  }

}
