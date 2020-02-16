import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SectionSpacerComponent } from './section-spacer/section-spacer.component';
import { LargeHeadingComponent } from './large-heading/large-heading.component';
import { ButtonComponent } from './button/button.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { SelectionBoxComponent } from './selection-box/selection-box.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionRoundComponent } from './selection-round/selection-round.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    SectionSpacerComponent, 
    LargeHeadingComponent, 
    ButtonComponent, ContainerComponent, FooterComponent, SelectionBoxComponent, SelectionListComponent, SelectionRoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, 
    SectionSpacerComponent, 
    LargeHeadingComponent, 
    ButtonComponent, ContainerComponent, FooterComponent, SelectionBoxComponent, SelectionListComponent, SelectionRoundComponent
  ]
})
export class SharedModule { }
