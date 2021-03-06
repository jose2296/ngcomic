import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

//Firebase
import * as firebase from 'firebase';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';


// Routes
import {app_routing} from './app.routes';
import {HomeComponent} from './mainComponents/home/home.component';
import {ShopComponent} from './mainComponents/shop/shop.component';
import {CartComponent} from './mainComponents/cart/cart.component';
import {LoginComponent} from './mainComponents/login/login.component';
import {AboutComponent} from './mainComponents/about/about.component';
import {ProductFilterComponent} from './product-filter/product-filter.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';


// Services
import {DataservicesService} from './_services/dataservices.service';
import {SearchService} from './_services/search.service';
import {NotificationService} from './_services/notification.service';

//pipe
import {StarsPipe} from './common/stars.pipe';

//components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ComicComponent} from './comic/comic.component';
import {ImageComponent} from './common/image/image.component';
import {NewsComponent} from './common/news/news.component';
import {NewsArticleComponent} from './common/news/news-article/news-article.component';
import {AdComponent} from './common/news/ad/ad.component';
import {CookieAlertComponent} from './common/cookie-alert/cookie-alert.component';
import {MapComponent} from './mainComponents/map/map.component';
import {NotificationComponent} from './common/notification/notification.component';
import { LoadingComponent } from './common/loading/loading.component';


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
    ProductsComponent,
    ProductDetailsComponent,
    ComicComponent,
    ImageComponent,
    NewsComponent,
    NewsArticleComponent,
    AdComponent,
    CookieAlertComponent,
    StarsPipe,
    MapComponent,
    NotificationComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCf9QMsCXaFSoMOcVcGDL9wVU5OVZgu_EA',
      authDomain: 'ngcomics-a06af.firebaseapp.com',
      databaseURL: 'https://ngcomics-a06af.firebaseio.com',
      projectId: 'ngcomics-a06af',
      storageBucket: 'ngcomics-a06af.appspot.com',
      messagingSenderId: '918041929952'
    }),
    NgxPaginationModule
  ],
  providers: [DataservicesService, SearchService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
