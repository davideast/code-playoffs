import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'cp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input('img-src') imgSrc: string;
  @Input() type: 'primary' | 'login' | 'secondary';
  themeClass: string;

  classMap = {
    'primary': 'bg-orange-dark',
    'secondary': 'bg-orange',
    'login': 'bg-blue-light',
  };

  ngOnInit() {
    this.themeClass = this.classMap[this.type];
  }

}
