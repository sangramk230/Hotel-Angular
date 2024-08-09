import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'menu',component:MenuComponent},
    {path:'reservation' ,component:ReservationComponent},
    {path:'profile',component:ProfileComponent},
    {path:'**',redirectTo:'login'}
];
