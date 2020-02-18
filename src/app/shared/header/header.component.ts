import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../types';

@Component({
  selector: 'cp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() user: User;
  @Output('on-logout') onLogout = new EventEmitter<void>();

  logout() {
    this.onLogout.emit();
  }

}
