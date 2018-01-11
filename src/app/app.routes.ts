import {RouterModule, Routes} from '@angular/router';


import { HomeComponent, ShopComponent, CartComponent, LoginComponent, AboutComponent, ProductDetailsComponent } from './mainComponents/pages';

const app_routes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: 'shop', component: ShopComponent},
    {path: 'shop/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'login', component: LoginComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes);
