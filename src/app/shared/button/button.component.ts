import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

type ButtonType = 'primary' | 'login' | 'secondary';

@Component({
  selector: 'cp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input('img-src') imgSrc: string;

  @Input() disabled: boolean;
  @Input() type: ButtonType;
  themeClass: string;

  classMap = {
    primary: 'bg-orange-dark',
    secondary: 'bg-orange',
    login: 'bg-blue-light',
    disabled: 'bg-disabled'
  };

  setBackground(isDisabled: boolean, type: ButtonType) {
    if(!isDisabled) {
      this.themeClass = this.classMap[type];
    } else {
      this.themeClass = this.classMap.disabled;
    }
  }

  ngOnInit() {
    this.setBackground(this.disabled, this.type);
  }

  ngOnChanges(changes: SimpleChanges) {
    const isDisabled = changes.disabled && changes.disabled.currentValue;
    let type = this.type;
    if(changes.type) {
      type = changes.type.currentValue;
    }
    this.setBackground(isDisabled, type);
  }

}
