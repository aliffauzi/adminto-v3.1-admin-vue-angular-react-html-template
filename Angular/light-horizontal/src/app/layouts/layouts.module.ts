import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { UIModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';


@NgModule({
  declarations: [LayoutComponent, TopbarComponent, NavbarComponent, FooterComponent, RightsidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbCollapseModule,
    ClickOutsideModule,
    UIModule
  ]
})
export class LayoutsModule { }
