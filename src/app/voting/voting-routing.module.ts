import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotingComponent } from './voting.component';

const routes: Routes = [{ path: '', component: VotingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotingRoutingModule { }
