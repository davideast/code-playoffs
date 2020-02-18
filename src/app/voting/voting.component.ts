import { Component, OnInit } from '@angular/core';
import { Selection, Vote, User } from '../types';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RealtimeVotingStore } from './voting.store';

@Component({
  selector: 'cp-voting-view',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  selections: Selection[] = [];
  user$: Observable<User>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public store: RealtimeVotingStore,
  ) {
    this.user$ = this.afAuth.user;
  }

  ngOnInit() { }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

  updateSelections(selections: Selection[]) {
    this.selections = selections;
    this.store.dispatch({ selections });
  }

  vote() {
    this.store.dispatch({ selections: this.selections }, true);
  }

  startNewRound() {
    const newEntries = this.selections.map(s => ({ ...s, active: false }));
    this.store.dispatch({ 
      entries: newEntries, 
      selections: [],
      votes: [],
    });
  }

}
