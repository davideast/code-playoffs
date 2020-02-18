import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Selection, Match } from '../../types';

@Component({
  selector: 'cp-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css']
})
export class SelectionListComponent {

  @Input() match: Match;
  @Output('on-selection') onSelection = new EventEmitter<Selection>();

  toggleActiveSelection(selection: Selection) {
    // set the clicked selection to an active state
    selection.active = !selection.active;
    selection.match = this.match;

    // find the other selection and make sure it is inactive
    const { lower, higher } = this.match;
    const seedList = [lower, higher];
    const other = seedList
      .filter(value => value != undefined)
      .filter(value => value.name !== selection.name)[0];
    if(other) { 
      other.active = false; 
      let isHigher = higher.name === selection.name;
      let voteFor = isHigher ? 'higher' : 'lower';
      selection.voteId = `${higher.name}_${lower.name}`;
      selection.voteFor = voteFor;
    }
  }

  getVote(selection: Selection) {
    this.toggleActiveSelection(selection);
    this.onSelection.emit(selection);
  }

}
