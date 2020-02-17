import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Match, Selection } from '../../types';

@Component({
  selector: 'cp-selection-round',
  templateUrl: './selection-round.component.html',
  styleUrls: ['./selection-round.component.css']
})
export class SelectionRoundComponent {

  @Input() matches: Match[];
  @Output('on-selection') onSelection = new EventEmitter<Selection[]>();

  get votes() {
    return this.matches.map(match => {
      if(match.lower && match.lower.active) {
        return match.lower;
      } else if(match.higher && match.higher.active) {
        return match.higher;
      }
    }).filter(v => v != undefined);
  }

  vote() {
    this.onSelection.emit(this.votes);
  }

}
