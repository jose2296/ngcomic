import {RouterModule, Routes} from '@angular/router';


import { InicioComponent, ProductosComponent, ProductoComponent,CarroComponent } from './mainComponents/pages';

const app_routes: Routes = [
    {path: 'home', component: InicioComponent },
    {path: 'shop', component: ProductosComponent},
    {path: 'cart', component: CarroComponent},
    {path: 'login', component: ProductoComponent},
    {path: 'about', component: ProductoComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

export const app_routing = RouterModule.forRoot(app_routes);