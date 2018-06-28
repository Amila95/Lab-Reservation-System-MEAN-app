import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserhomeComponent, canActivate: [AuthGuard] },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'resavation_checkbydate/:id', component: ReservationComponent },
  { path: 'admin', component: AdminpanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
