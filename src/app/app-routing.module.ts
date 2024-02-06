import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyPasswordComponent } from './verify-password/verify-password.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'forgot-password', component: VerifyPasswordComponent},
  {path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
