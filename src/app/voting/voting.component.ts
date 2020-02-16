import { Component } from '@angular/core';
import { Selection, Match } from '../types';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cp-voting-view',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent {

  activeVote: Selection;

  match$: Observable<Match> = of({
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

  getVote(selection: Selection) {
    this.activeVote = selection;
  }

  vote() {
    
  }

}
