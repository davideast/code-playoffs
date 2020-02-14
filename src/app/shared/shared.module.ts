import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SectionSpacerComponent } from './button/section-spacer/section-spacer.component';
import { LargeHeadingComponent } from './large-heading/large-heading.component';
import { ButtonComponent } from './button/button.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    SectionSpacerComponent, 
    LargeHeadingComponent, 
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, 
    SectionSpacerComponent, 
    LargeHeadingComponent, 
    ButtonComponent
  ]
})
export class SharedModule { }
