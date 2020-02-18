import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreState, Match, Entry, Vote, Selection, Tournament, VoteUpdate } from '../types';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

export class VotingStore {

  private _entries$: BehaviorSubject<Entry[]>;
  private _votes$: BehaviorSubject<Vote[]>;
  private _selections$: BehaviorSubject<Selection[]>;

  matches$: Observable<Match[]>;
  selections$: Observable<Selection[]>;

  constructor(initialState: StoreState = {
    entries: [],
    votes: [],
    selections: []
  }) { 

    this._entries$ = new BehaviorSubject<Entry[]>(initialState.entries);
    this._votes$ = new BehaviorSubject<Vote[]>(initialState.votes);
    this._selections$ = new BehaviorSubject<Selection[]>(initialState.selections);
    
    this.selections$ = this._selections$.asObservable();

    // create a selector for the matches$ state
    this.matches$ = combineLatest(
      this._entries$,
      this._votes$,
      this._selections$,
    )
    .pipe(
      map(([entries, votes, selections]) => {
        if(entries.length == 0) {
          votes = [];
          selections = [];
        }
        // Merge active state for selections
        entries = this.mergeActiveSelections(entries, selections);
        // Create matches
        const matches = this.seedMatches(entries);
        // Calculate percentages 
        return this.calculateMatches(matches, votes);
      })
    );
  }

  dispatch({ entries, votes, selections }: Partial<StoreState>) {
    if(entries != undefined) {
      this._entries$.next(entries);
    }
    if(votes != undefined) {
      this._votes$.next(votes);
    }
    if(selections != undefined) {
      this._selections$.next(selections);
    }
  }

  private mergeActiveSelections(entries: Entry[], selections: Selection[]) {
    return entries.map(entry => {
      const selection = selections.find(s => s.name === entry.name);
      if(selection) {
        return selection;
      }
      return entry;
    });
  }

  private seedMatches(entries: Entry[]): Match[] {
    if(entries.length === 1) { 
      return [{ id: 'winner', higher: entries[0], lower: null }]; 
    }
    const copy = entries.slice();
    let matches: Match[] = [];
    while(copy.length) {
      const higher = copy.shift();
      const lower = copy.pop();
      const id = `${higher.name}_${lower.name}`;
      matches = [...matches, { id, higher, lower }];
    }
    return matches;
  }

  private calculateMatches(matches: Match[], votes: Vote[]) {
    return matches.map(match => {
      const vote = votes.find(m => m.id === match.id);
      if(vote == undefined) {  return match; }
      const voteId = vote.id;
      const higherCount = vote.higher || 0;
      const lowerCount = vote.lower || 0;
      const higherPer = (higherCount /  (higherCount + lowerCount)) * 100;
      const lowerPer = (lowerCount / (higherCount + lowerCount)) * 100;
      return {
        id: voteId,
        higher: {
          ...match.higher,
          votePercentage: Math.round(higherPer).toString()
        },
        lower: {
          ...match.lower,
          votePercentage: Math.round(lowerPer).toString()
        }
      };
    });
  }
  
}

function entries$(tournament$: Observable<Tournament>): Observable<Entry[]> {
  return tournament$.pipe(
    map(tourney => {
      const seeds = tourney.seeds || [];
      return seeds.map((name, index) => ({ name, seed: index + 1 }))
    })
  );
}

@Injectable()
export class RealtimeVotingStore {
  
  private store = new VotingStore();
  matches$: Observable<Match[]>;
  selections$: Observable<Selection[]>;
  tournamentDoc: AngularFirestoreDocument<Tournament>;
  votesCol: AngularFirestoreCollection<Vote[]>;

  constructor(private afs: AngularFirestore) {
    const routeId = '/tournaments/angularNYC';
    this.tournamentDoc = this.afs.doc<Tournament>(routeId);
    const tournament$ = this.tournamentDoc.valueChanges();
    this.votesCol = this.tournamentDoc.collection<Vote[]>('votes');
    const votes$: Observable<Vote[]> = this.votesCol.valueChanges({ idField: 'id' }) as Observable<any[]>;
   
    entries$(tournament$).subscribe(entries  => {
      this.store.dispatch({ entries });
    });

    votes$.subscribe(votes => {
      this.store.dispatch({ votes });
    });

    this.matches$ = this.store.matches$;
    this.selections$ = this.store.selections$;
  }

  dispatch(state: Partial<StoreState>, persist = false) {
    const { selections } = state;

    if(persist) {
      const voteUpdates: VoteUpdate[] = selections.map(selection => {
        return {
          id: selection.voteId,
          uid: '',
          higherName: selection.match.higher.name,
          lowerName: selection.match.lower.name,
          voteFor: selection.voteFor,
        }
      });
      voteUpdates.forEach(update => {
        this.votesCol.doc(update.id).set({
          ...update,
          [`${update.voteFor}`]: firebase.firestore.FieldValue.increment(1)
        }, { merge: true });
      })
    }

    this.store.dispatch(state);

  }

}