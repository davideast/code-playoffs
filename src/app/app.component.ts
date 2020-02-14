import { Component } from '@angular/core';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  loginUser() {
    console.log('lets log in');
  }

}
