import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../_services/search.service';

import {DataservicesService} from '../_services/dataservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  stringSearch: string;


  countCart: number;


  constructor(private searchService: SearchService, private router: Router, private _ds: DataservicesService) {

    this.countCart = (localStorage.getItem('cart') !== '' && localStorage.getItem('cart') != null  ? localStorage.getItem('cart').split(',').length : 0);


    _ds.event.subscribe(() => {
      this.countCart = _ds.countCart;
    });

  }


  updateString(): void {
    /*Modifica el valor de strignSearch del servicio*/
    this.searchService.setStringSearch(this.stringSearch);
    /*Enruta  al componente shop*/
    this.router.navigate(['shop']);

  }

  ngOnInit() {


  }

}
