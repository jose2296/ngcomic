import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-comic',
    templateUrl: './comic.component.html',
    styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit{

    @Input() comic: any;

    id;
    name;
    price;
    rate;
    image;

    constructor() {
    }

    ngOnInit(){

        this.name = this.comic.issueName;
        this.price = this.comic.price;
        this.rate = this.comic.rate;
        this.image = this.comic.issueImage.small_url;
        this.id = this.comic.issueId;
    }
}
