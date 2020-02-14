import { Component, OnInit } from '@angular/core';
import { Selection } from '../types';

@Component({
  selector: 'cp-voting-view',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  jsSelection: Selection = {
    name: 'JavaScript',
    seed: 1,
    votePercentage: '93'
  };
  elmSelection: Selection = {
    name: 'Elm',
    seed: 8,
    votePercentage: '7'
  };
  
  constructor() { }

  ngOnInit() {
  }

}
