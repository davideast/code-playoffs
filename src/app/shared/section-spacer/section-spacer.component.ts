import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cp-section',
  templateUrl: './section-spacer.component.html',
  host: {
    class: 'pt-22 block'
  }
})
export class SectionSpacerComponent { 

  @Input() 
  @HostBinding('class.centered') 
  centered: boolean;

  @Input() 
  @HostBinding('class.flex-col')
  column: boolean;

}
