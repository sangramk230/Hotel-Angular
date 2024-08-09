import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    {path:'cart',component:CartComponent},
    {path:'home',component:HomeComponent},
    {path:'menu' ,component:MenuComponent},
    {path:'order', component:OrderComponent},
    {path:'**' , redirectTo:'home'}
];
