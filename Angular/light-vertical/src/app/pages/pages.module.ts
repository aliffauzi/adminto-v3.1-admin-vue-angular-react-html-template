import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../shared/ui/ui.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    UIModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
