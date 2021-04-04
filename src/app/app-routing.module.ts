import { LoginService } from './core/services/login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './core/guards/guard.service';

const routes: Routes = [
  {
    path: "login",
    component: LoginService
  },
  {
    path: 'home',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./features/friends/friends.module').then(
        (m) => m.FriendsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
