import { Component, OnInit } from '@angular/core';
import { Selection, Match, Entry, BracketState } from '../types';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, combineLatest, tap, filter, take, withLatestFrom } from 'rxjs/operators';

class BracketStore {
  
  matches$: Observable<Match[]>;
  selection$ = new BehaviorSubject<Selection>(null);

  /**
  
    Firestore
      / entries
        + id
      / votes
        + higher_lower
          - $higher
          - $lower
      
   */

  constructor(
    private entries$: Observable<Entry[]>,
    private votes$: Observable<{ id: string; higher: number; lower: number; }[]>,
  ) {
    // Make sure they are sorted
    this.entries$ = this.entries$.pipe(
      map(entries => entries.sort((a,b) => a.seed - b.seed))
    );

    this.matches$ = this.entries$
      .pipe(
        map(entries => this.seedMatches(entries)),
        combineLatest(this.votes$),
        map(([matches, votes]) => {
          return matches.map(match => {
            const vote = votes.find(m => m.id === match.id);
            if(vote == undefined) { 
              return match;
            }
            const voteId = vote.id;
            const higherPer = (vote.higher /  (vote.higher + vote.lower)) * 100;
            const lowerPer = (vote.lower / (vote.higher + vote.lower)) * 100;
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
            }
          });
        })
      );
    
  }

  seedMatches(entries: Entry[]): Match[] {
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

  select(selection: Selection) {
    // add to selections
    // Find a better way to shift the top match
    this.selection$.next(selection);

    // emit a new match
  }

}


@Component({
  selector: 'cp-voting-view',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  store: BracketStore;

  match$: BehaviorSubject<Match> = new BehaviorSubject({
    higher: {
      name: 'JavaScript',
      seed: 1,
      votePercentage: '93',
      active: false
    },
    lower: {
      name: 'Elm',
      seed: 8,
      votePercentage: '7',
      active: false
    }
  });

  ngOnInit() {

    this.store = new BracketStore(
      of([
        { name: 'JavaScript', seed: 1 },
        { name: 'TypeScript', seed: 2 },
        { name: 'CSS', seed: 3 },
        { name: 'Swift', seed: 4 },
        { name: 'Koitlin', seed: 5 },
        { name: 'Obj-C', seed: 6 },
        { name: 'Dart', seed: 7 },
        { name: 'Elm', seed: 8 },
      ]),
      of([
        { id: 'JavaScript_Elm', higher: 90, lower: 10 },
        { id: 'TypeScript_Dart', higher: 124, lower: 6 },
        { id: 'CSS_Obj-C', higher: 134, lower: 2 },
        { id: 'Swift_Koitlin', higher: 34, lower: 95 },
      ])
    );


  }

  vote(selections: Selection[]) {
    console.log(selections);
  }

}
