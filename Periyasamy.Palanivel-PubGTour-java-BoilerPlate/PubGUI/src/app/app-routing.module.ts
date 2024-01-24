import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import {AuthGuardService} from './services/auth-guard.service'
import { FavouritepageComponent } from 'src/app/favouritepage/favouritepage.component';

const routes: Routes = [{path:'login',component: LoginComponent},
{path:'register',component: RegisterComponent},
{path:'',component: HomepageComponent,canActivate: [AuthGuardService]},
{path:'favourite',component: FavouritepageComponent,canActivate: [AuthGuardService]},
{path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
