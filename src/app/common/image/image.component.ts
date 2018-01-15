import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image: any;

    loading: boolean = true;
    onLoad() {
        this.loading = false;
    }

  constructor() { }

  ngOnInit() {
  }

}
