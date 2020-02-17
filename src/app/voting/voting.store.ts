import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreState, Match, Entry, Vote, Selection } from '../types';

export class VotingStore {

  private Θentries$: BehaviorSubject<Entry[]>;
  private Θvotes$: BehaviorSubject<Vote[]>;
  private Θselections$: BehaviorSubject<Selection[]>;

  matches$: Observable<Match[]>;
  selections$: Observable<Selection[]>;

  constructor(initialState: StoreState = {
    entries: [],
    votes: [],
    selections: []
  }) { 

    this.Θentries$ = new BehaviorSubject<Entry[]>(initialState.entries);
    this.Θvotes$ = new BehaviorSubject<Vote[]>(initialState.votes);
    this.Θselections$ = new BehaviorSubject<Selection[]>(initialState.selections);
    
    this.selections$ = this.Θselections$.asObservable();

    // create a selector for the matches$ state
    this.matches$ = combineLatest(
      this.Θentries$,
      this.Θvotes$,
      this.Θselections$,
    )
    .pipe(
      map(([entries, votes, selections]) => {
        // Create matches
        // Merge active state for selections
        // Calculate percentages 
        entries = this.ΘmergeActiveSelections(entries, selections);
        return this.ΘcalculateMatches(
          this.ΘseedMatches(entries),
          votes
        );
      })
    );
  }

  dispatch({ entries, votes, selections }: Partial<StoreState>) {
    if(entries != undefined) {
      this.Θentries$.next(entries);
    }
    if(votes != undefined) {
      this.Θvotes$.next(votes);
    }
    if(selections != undefined) {
      this.Θselections$.next(selections);
    }
  }

  private ΘmergeActiveSelections(entries: Entry[], selections: Selection[]) {
    return entries.map(entry => {
      const selection = selections.find(s => s.name === entry.name);
      if(selection) {
        return selection;
      }
      return entry;
    });
  }

  private ΘseedMatches(entries: Entry[]): Match[] {
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

  private ΘcalculateMatches(matches: Match[], votes: Vote[]) {
    return matches.map(match => {
      const vote = votes.find(m => m.id === match.id);
      if(vote == undefined) {  return match; }
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
  }
  
}
