import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './landing/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'vote', loadChildren: () => import('./voting/voting.module').then(m => m.VotingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
