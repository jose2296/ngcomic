import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    
    route.params.subscribe(parametros =>{

      console.log(parametros.id);
      

      // af.object('/issues/'+parametros.id).valueChanges().subscribe((a)=>{
      //   this.comic = a
      //   this.cargado = true;
      // })

    });

   }
  ngOnInit() {
  }

}
