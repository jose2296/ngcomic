import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

//Routes
import {app_routing} from './app.routes';
import { HomeComponent } from './mainComponents/home/home.component';
import { ShopComponent } from './mainComponents/shop/shop.component';
import { CartComponent } from './mainComponents/cart/cart.component';
import { LoginComponent } from './mainComponents/login/login.component';
import { AboutComponent } from './mainComponents/about/about.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ShopComponent,
        CartComponent,
        LoginComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        app_routing
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
