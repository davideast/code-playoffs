import { Component, OnInit } from '@angular/core';
import { Selection, Vote } from '../types';
import { VotingStore } from './voting.store';


@Component({
  selector: 'cp-voting-view',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  store: VotingStore;
  selections: Selection[] = [];
  
  ngOnInit() {
    this.store = new VotingStore({
      entries: [
        { name: 'JavaScript', seed: 1 },
        { name: 'TypeScript', seed: 2 },
        { name: 'CSS', seed: 3 },
        { name: 'Swift', seed: 4 },
        { name: 'Koitlin', seed: 5 },
        { name: 'Obj-C', seed: 6 },
        { name: 'Dart', seed: 7 },
        { name: 'Elm', seed: 8 },
      ],
      votes: [
        { id: 'JavaScript_Elm', higher: 90, lower: 10 },
        { id: 'TypeScript_Dart', higher: 124, lower: 6 },
        { id: 'CSS_Obj-C', higher: 134, lower: 2 },
        { id: 'Swift_Koitlin', higher: 34, lower: 2 },
      ],
      selections: []
    });

    setInterval(() => {
      this.triggerVotes();
    }, 2000);

  }

  updateSelections(selections: Selection[]) {
    this.selections = selections;
    this.store.dispatch({ selections });
  }

  vote() {
    const newEntries = this.selections.map(s => ({ ...s, active: false }));
    this.store.dispatch({ 
      entries: newEntries, 
      selections: [],
      votes: [],
    });
  }

  triggerVotes() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomVote(id: string): Vote {
      const total = getRandomInt(0, 1000);
      const split = getRandomInt(1, total-1);
      const lowerPercentage = split / total;
      const higherPercentage = Math.abs(lowerPercentage - 1);
      return {
        id,
        higher: Math.round(total * higherPercentage),
        lower: Math.round(total * lowerPercentage)
      };
    }

    this.store.dispatch({
      votes:[
        randomVote('JavaScript_Elm'),
        randomVote('TypeScript_Dart'),
        randomVote('CSS_Obj-C'),
        randomVote('Swift_Koitlin')
      ]
    });
  }

}
