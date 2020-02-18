import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../environments/environment';

import { SharedModule } from '../shared/shared.module';
import { VotingRoutingModule } from './voting-routing.module';
import { VotingComponent } from './voting.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { RealtimeVotingStore } from './voting.store';

@NgModule({
  declarations: [VotingComponent],
  imports: [
    CommonModule,
    VotingRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    RealtimeVotingStore,
  ]
})
export class VotingModule { }
