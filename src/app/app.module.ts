import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

// Routes
import {app_routing} from './app.routes';
import {HomeComponent} from './mainComponents/home/home.component';
import {ShopComponent} from './mainComponents/shop/shop.component';
import {CartComponent} from './mainComponents/cart/cart.component';
import {LoginComponent} from './mainComponents/login/login.component';
import {AboutComponent} from './mainComponents/about/about.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    CartComponent,
    LoginComponent,
    AboutComponent,
    ProductFilterComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
