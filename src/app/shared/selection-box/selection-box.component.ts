import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Selection } from '../../types';

@Component({
  selector: 'cp-selection-box',
  templateUrl: './selection-box.component.html',
  styleUrls: ['./selection-box.component.css'],
  host: {
    'class': 'w-full cursor-pointer border-black border-solid border-6 h-30 my-4 flex flex-col my-4 items-center justify-center'
  },
})
export class SelectionBoxComponent implements OnInit {

  @Input() selection: Selection;

  @Input('is-active')
  @HostBinding('class.border-orange-dark')
  active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
